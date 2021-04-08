package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"path"
	"plantastic/servers/gateway/models/users"
	"plantastic/servers/gateway/sessions"
	"strconv"
	"strings"
	"time"
)

// UsersHandler handles requests for users to create a new user account (POST)
func (context HandlerContext) UsersHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Incorrect Status Method", http.StatusMethodNotAllowed)
		return
	}
	header := r.Header.Get("Content-Type")

	if !strings.HasPrefix(header, "application/json") {
		http.Error(w, "Header request body must be in JSON", http.StatusUnsupportedMediaType)
		return
	}
	dec := json.NewDecoder(r.Body)
	curUser := &users.NewUser{}
	dec.Decode(curUser)
	if valErr := curUser.Validate(); valErr != nil {
		http.Error(w, "Error mesesage: "+valErr.Error(), 400)
		return
	}
	toValUser, toUserErr := curUser.ToUser()
	if toUserErr != nil {
		fmt.Printf("Error creating a User: %v", toUserErr)
	}
	// insert new user into database
	cur, insertErr := context.UserStore.Insert(toValUser)
	if cur != toValUser || insertErr != nil {
		fmt.Printf("Error inserting new user into database: %v", insertErr)
		http.Error(w, "Error inserting user into database: "+insertErr.Error(), 400)
	}

	// begin session
	sessState := &SessionState{BeginTime: time.Now(), CurrentUser: toValUser}
	_, begErr := sessions.BeginSession(context.SigningKey, context.SessionStore, sessState, w)
	if begErr != nil {
		http.Error(w, "Error beginning session: "+begErr.Error(), http.StatusInternalServerError)
	}
	// writing response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if toValUser.ID != cur.ID {
		fmt.Printf("Error incorrect primary keys")
	}

	response, encErr := json.Marshal(toValUser)
	if encErr != nil {
		fmt.Printf("Error encoding user to JSON: %v", encErr)
	}
	w.Write(response)
}

// SpecificUserHandler gets or updates a specific user's information
// if request is GET then return the user's information
// if request is PATCH then update the user's information
func (context HandlerContext) SpecificUserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" && r.Method != "PATCH" {
		http.Error(w, "Status Method Not Get or Patch", http.StatusMethodNotAllowed)
		return
	}
	idURL := path.Base(r.URL.Path)
	state := &SessionState{}
	var userID int64
	_, err := sessions.GetState(r, context.SigningKey, context.SessionStore, state)
	if err != nil {
		http.Error(w, "Error getting state: "+err.Error(), http.StatusUnauthorized)
		return
	}
	if idURL == "me" {
		userID = state.CurrentUser.ID
	} else {
		userID, err = strconv.ParseInt(idURL, 10, 64)
		if err != nil {
			http.Error(w, "Error parsing id: "+err.Error(), http.StatusBadRequest)
			return
		}
	}
	curUser, getErr := context.UserStore.GetByID(userID)
	if getErr != nil {
		http.Error(w, "Error getting user: "+err.Error(), http.StatusInternalServerError)
	}

	if r.Method == "GET" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		response, _ := json.Marshal(curUser)
		w.Write(response)
	} else if r.Method == "PATCH" {
		if idURL != "me" && userID != state.CurrentUser.ID {
			http.Error(w, "Users do not match", http.StatusForbidden)
		}
		reqBody := r.Header.Get("Content-Type")
		if !strings.HasPrefix(reqBody, "application/json") {
			http.Error(w, "Request Body must be in JSON", http.StatusUnsupportedMediaType)
			return
		}
		dec := json.NewDecoder(r.Body)
		updates := &users.Updates{}
		decErr := dec.Decode(updates)
		if decErr != nil {
			fmt.Printf("Error decoding json: %v", decErr)
		}
		upUser, upErr := context.UserStore.Update(userID, updates)
		if upErr != nil {
			http.Error(w, "Error updating user: "+upErr.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		response, encErr := json.Marshal(upUser)
		if encErr != nil {
			fmt.Printf("Error encoding: %v", encErr)
		}
		w.Write(response)
	}
}

// SessionsHandler logs in the user and tracks their login time
func (context HandlerContext) SessionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Status Method is not POST", http.StatusMethodNotAllowed)
		return
	}
	reqBody := r.Header.Get("Content-Type")
	if !strings.HasPrefix(reqBody, "application/json") {
		http.Error(w, "Request Body must be in JSON", http.StatusUnsupportedMediaType)
		return
	}
	creds := &users.Credentials{}
	dec := json.NewDecoder(r.Body)
	decErr := dec.Decode(creds)
	if decErr != nil {
		fmt.Printf("Error decoding json: %v", decErr)
	}
	curUser, getErr := context.UserStore.GetByEmail(creds.Email)
	if getErr != nil {
		time.Sleep(time.Second)
		http.Error(w, "Invalid Credentials", http.StatusUnauthorized)
		return
	}
	log.Printf("User %s attempted to sign in", curUser.Email)
	signInTime := time.Now()
	ipAdd := ""
	if len(r.Header.Get("X-Forwarded-For")) != 0 {
		ipAdd = r.Header.Get("X-Forwarded-For")
	} else {
		ipAdd = r.RemoteAddr
	}
	context.UserStore.InsertSignIn(curUser, signInTime, ipAdd)
	authErr := curUser.Authenticate(creds.Password)
	if authErr != nil {
		http.Error(w, "Invalid Credentials", http.StatusUnauthorized)
		return
	}
	state := &SessionState{signInTime, curUser}
	sessions.BeginSession(context.SigningKey, context.SessionStore, state, w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	resp, encErr := json.Marshal(curUser)
	if encErr != nil {
		fmt.Printf("Error encoding: %v", encErr)
	}
	w.Write(resp)
}

// SpecificSessionHandler logs the user out of the sessions
func (context HandlerContext) SpecificSessionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "DELETE" {
		http.Error(w, "Status Method is not DELETE", http.StatusMethodNotAllowed)
		return
	}
	path := r.URL.Path
	if !strings.HasSuffix(path, "mine") {
		http.Error(w, "Incorrect path to user", http.StatusForbidden)
		return
	}
	_, endErr := sessions.EndSession(r, context.SigningKey, context.SessionStore)
	if endErr != nil {
		http.Error(w, "Error ending session: "+endErr.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("signed out"))
}
