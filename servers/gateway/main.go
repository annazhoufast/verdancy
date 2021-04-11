package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"plantastic/servers/gateway/handlers"
	"plantastic/servers/gateway/models/users"
	"plantastic/servers/gateway/sessions"
	"strings"
	"sync/atomic"
	"time"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
)

type Director func(r *http.Request)

func CustomDirector(target []*url.URL, signingKey string, sessionStore sessions.Store) Director {
	var counter int32
	counter = 0
	return func(r *http.Request) {
		targ := target[counter%int32(len(target))]
		atomic.AddInt32(&counter, 1)
		state := &handlers.SessionState{}
		_, err := sessions.GetState(r, signingKey, sessionStore, state)
		if err != nil {
			r.Header.Del("X-User")
			log.Printf("Error getting state: %v", err)
			return
		}
		user, _ := json.Marshal(state.CurrentUser)
		r.Header.Add("X-User", string(user))
		r.Header.Set("X-User", string(user))
		r.Host = targ.Host
		r.URL.Host = targ.Host
		r.URL.Scheme = targ.Scheme
	}
}

func main() {
	addr := os.Getenv("ADDR")
	TLSCERT := os.Getenv("TLSCERT")
	TLSKEY := os.Getenv("TLSKEY")
	SESSIONKEY := os.Getenv("SESSIONKEY")
	REDISADDR := os.Getenv("REDISADDR")
	DSN := os.Getenv("DSN")
	PLANTADDR := os.Getenv("PLANTADDR")

	client := redis.NewClient(
		&redis.Options{
			Addr: REDISADDR,
		},
	)
	redisStore := sessions.NewRedisStore(client, time.Hour)
	db, dbErr := sql.Open("mysql", DSN)
	if dbErr != nil {
		fmt.Printf("Error opening database: %v", dbErr)
	}
	defer db.Close()
	userStore := users.SQLStore{Db: db}
	context := handlers.NewHandlerContext(SESSIONKEY, redisStore, userStore)
	// verify tls exists
	if len(TLSCERT) == 0 {
		log.Fatalln(errors.New("TLSCERT Not Found"))
	}

	if len(TLSKEY) == 0 {
		log.Fatalln(errors.New("TLSKEY Not Found"))
	}

	if len(addr) == 0 {
		addr = ":80"
	}

	plantAddress := strings.Split(PLANTADDR, ",")
	var pUrls []*url.URL
	for _, cur := range plantAddress {
		curURL, err := url.Parse(cur)
		if err != nil {
			fmt.Printf("Error parsing URL addr: %v", err)
		}
		pUrls = append(pUrls, curURL)
	}

	plantProxy := &httputil.ReverseProxy{Director: CustomDirector(pUrls, context.SigningKey, context.SessionStore)}

	mux := mux.NewRouter()
	mux.HandleFunc("/v1/users", context.UsersHandler)
	mux.HandleFunc("/v1/users/{id}", context.SpecificUserHandler)
	mux.HandleFunc("/v1/sessions", context.SessionsHandler)
	mux.HandleFunc("/v1/sessions/{id}", context.SpecificSessionHandler)

	mux.Handle("/v1/plants", plantProxy)
	mux.Handle("/v1/plants/{plantID}", plantProxy)

	wrappedMux := handlers.NewCorsMW(mux)

	log.Printf("server is listening at http://%s", addr)
	log.Println("Hello, World!")
	// log.Fatal(http.ListenAndServe(addr, mux))
	log.Fatal(http.ListenAndServeTLS(addr, TLSCERT, TLSKEY, wrappedMux))
}
