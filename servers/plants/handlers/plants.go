package plants

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"plantastic/servers/gateway/models/users"
	"strconv"
	"strings"
)

// Plants Handler I believe this is done
// plants db
//   - GET: "/plants" get all plants
// 		SELECT PlantID, PlantName, PlantScientificName, Difficulty, ImageLink FROM Plants
//	   Returns the basic plant info
//
// filtered
//   - GET: "/plants/{filter}" get plants by filter
// idk about this yet
func (c *Context) PlantsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method must be GET", http.StatusMethodNotAllowed)
		return
	}
	rows, getErr := c.PlantStore.Query("SELECT PlantID, PlantName, PlantScientificName, Difficulty, ImageLink FROM Plants")
	if getErr != nil {
		http.Error(w, "Could not get plants", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	plants := []Plant{}
	for rows.Next() {
		curPlant := Plant{}
		if err := rows.Scan(&curPlant.PlantID, &curPlant.PlantName, &curPlant.PlantScientificName,
			&curPlant.Difficulty, &curPlant.ImageLink); err != nil {
			http.Error(w, "Error getting plants", http.StatusBadRequest)
			return
		}
		plants = append(plants, curPlant)
	}
	plantsJSON, jsonErr := json.Marshal(plants)
	if jsonErr != nil {
		http.Error(w, "Data could not be returned", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(plantsJSON)
}

// Specific Plants Handler
// Individual Plant Display
// Plants in Garden
//   - GET: "/plants/{plantID}" get specific plant info
//		SELECT * FROM Plants WHERE PlantID = ?
//	   Returns all info for one plant
//
//   - POST: /plants/{plantID} adding new plant to garden
//		INSERT INTO UserPlants(UserID, PlantID, Quantity) VALUES(?,?,0);
func (c *Context) SpecificPlantsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" && r.Method != "POST" {
		http.Error(w, "Method is not GET or POST", http.StatusMethodNotAllowed)
		return
	}
	plantID := r.URL.Path // idk where it actually is
	plantID = strings.TrimPrefix(plantID, "/v1/AddPlants/")
	// plantID = strings.TrimPrefix(plantID, "/v1/plants/")
	pID, _ := strconv.Atoi(plantID)
	log.Print(pID)
	// if r.Method == "GET" {
	// 	row := c.PlantStore.QueryRow("SELECT * FROM Plants WHERE PlantID = ?", plantID)
	// 	curPlant := EntirePlant{}
	// 	scanErr := row.Scan(&curPlant.PlantID, &curPlant.PlantName, &curPlant.PlantScientificName,
	// 		&curPlant.Difficulty, &curPlant.Height, &curPlant.ZoneStart, &curPlant.ZoneEnd,
	// 		&curPlant.CO2PerUnit, &curPlant.UnitWeight, &curPlant.UnitDescr, &curPlant.Descr,
	// 		&curPlant.ImageLink, &curPlant.Soil, &curPlant.Sun, &curPlant.Considerations,
	// 		&curPlant.WhenToPlant, &curPlant.GrowFromSeeds, &curPlant.Transplanting, &curPlant.Spacing,
	// 		&curPlant.Watering, &curPlant.Feeding, &curPlant.Other, &curPlant.Harvesting, &curPlant.Storage)
	// 	if scanErr != nil {
	// 		http.Error(w, "Error finding plant", http.StatusInternalServerError)
	// 		return
	// 	}
	// 	plantJSON, jsonErr := json.Marshal(curPlant)
	// 	if jsonErr != nil {
	// 		http.Error(w, "Data could not be returned", http.StatusInternalServerError)
	// 		return
	// 	}
	// 	w.Header().Set("Content-Type", "application/json")
	// 	w.WriteHeader(http.StatusOK)
	// 	w.Write(plantJSON)
	// } else

	if r.Method == "POST" {
		err := CheckAuth(w, r, c)
		if err != nil {
			http.Error(w, "User is not authenticated", http.StatusUnauthorized)
			return
		}
		insertQ := "INSERT INTO UserPlants(UserID, PlantID, Quantity) VALUES(?,?,0)"
		_, insertErr := c.PlantStore.Exec(insertQ, c.UserID, pID)
		if insertErr != nil {
			http.Error(w, "Error inserting into database", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Plant successfully added to user account"))
	}
}

// Specific User Handler
// Plants in Garden
//   - POST: "/user/{plantID}" harvesting specific plants in garden
// 		INSERT INTO UserPlants(UserID, PlantID, Quantity) VALUES(?,?,?);

//   - PATCH : /user/{plantID} : edit harvested plants
// 		INSERT INTO UserPlants(UserID, PlantID, Quantity) VALUES(?,?,?);
//		QUANTITY SHOULD BE NEGATIVE

//	 - DELETE: /user/{plantID} remove plant from garden
//		DELETE FROM UserPlants WHERE UserID = ? AND PlantID = ?;
func (c *Context) SpecificUserHandler(w http.ResponseWriter, r *http.Request) {
	authErr := CheckAuth(w, r, c)
	if authErr != nil {
		http.Error(w, "User not authenticated", http.StatusUnauthorized)
		return
	}
	plantID := r.URL.Path // again idk what this plantID is
	plantID = strings.TrimPrefix(plantID, "/v1/UserPlants/")
	pID, _ := strconv.Atoi(plantID)
	log.Printf("plant url: %v", plantID)

	if r.Method == "POST" {
		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Wrong content type, must be application/json", http.StatusUnsupportedMediaType)
			return
		}
		data, readErr := ioutil.ReadAll(r.Body)
		if readErr != nil {
			http.Error(w, "Request body could not be read", http.StatusBadRequest)
			return
		}
		r.Body.Close()
		// quantity := json.Unmarshal(data, &quantity{quantity int,})
		qToAdd := Quantity{}
		json.Unmarshal(data, &qToAdd)

		insertQ := "INSERT INTO UserPlants(UserID, PlantID, Quantity) VALUES(?,?,?)"
		_, insertErr := c.PlantStore.Exec(insertQ, c.UserID, pID, qToAdd.Quantity)
		if insertErr != nil {
			http.Error(w, "Error harvesting plant", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Plant harvested successfully"))
	} else if r.Method == "DELETE" {
		deleteQ := "DELETE FROM UserPlants WHERE UserID = ? AND PlantID = ?"
		_, delErr := c.PlantStore.Exec(deleteQ, c.UserID, pID)
		if delErr != nil {
			http.Error(w, "Error deleting plant from garden", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Plant successfully deleted from garden"))
	} else if r.Method == "PATCH" {
		// DEAL W/ LATER
		// updateQ := INSERT INTO UserPlants(UserID, PlantID, Quantity) VALUES(?,?,?)
		w.Header().Set("Content-Type", "text/html")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Plant quantity editted successfully"))
	}
}

// UserHandler DONE
//   - GET: /user/ get plants in garden
// 		SELECT UP.UserID, UP.PlantID, P.PlantName, SUM(UP.Quantity) as total, (SUM(UP.Quanity) * P.CO2PerUnit)
// 			as totCO2
// 		FROM UserPlants UP JOIN Plants P on UP.PlantID = P.PlantID
// 		WHERE UP.UserID = ?
// 		GROUP BY P.PlantID, UP.UserID, P.PlantName, P.CO2PerUnit
//     Returns:	All the plants in garden with the total, and total CO2 for each plant
func (c *Context) UserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method is not Get", http.StatusMethodNotAllowed)
		return
	}
	authErr := CheckAuth(w, r, c)
	if authErr != nil {
		http.Error(w, "User is not authenticated", http.StatusUnauthorized)
		return
	}
	ups := []UserPlants{}
	query := "SELECT UP.UserID, UP.PlantID, P.PlantName, SUM(UP.Quantity) as total, (SUM(UP.Quantity) * P.CO2PerUnit) as totCO2, ImageLink, P.CO2PerUnit FROM UserPlants UP JOIN Plants P on UP.PlantID = P.PlantID WHERE UP.UserID = ? GROUP BY P.PlantID, UP.UserID, P.PlantName, P.CO2PerUnit, P.ImageLink"
	rows, qErr := c.PlantStore.Query(query, c.UserID)
	if qErr != nil {
		http.Error(w, "Error retrieving user data", http.StatusInternalServerError)
		return
	}
	for rows.Next() {
		curRow := UserPlants{}
		if err := rows.Scan(&curRow.UserID, &curRow.PlantID, &curRow.PlantName, &curRow.Total, &curRow.TotalCO2, &curRow.ImageLink, &curRow.CO2PerUnit); err != nil {
			http.Error(w, "Error getting User Plants", http.StatusInternalServerError)
			return
		}
		ups = append(ups, curRow)
	}
	upsJSON, jErr := json.Marshal(ups)
	if jErr != nil {
		http.Error(w, "Data could not be returned", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(upsJSON)
}

// Total Emissions
//   - GET: /emissions/ get sum of total emissions for specific user
//		SELECT UP.UserID, SUM(UP.Quantity * P.CO2PerUnit) as tot
//  	FROM UserPlants UP JOIN Plants P on UP.PlantID = P.PlantID
//		WHERE UP.UserID = ?
//	   Returns: User ID and total CO2 emissions for all plants
func (c *Context) EmissionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method is not GET", http.StatusMethodNotAllowed)
		return
	}
	authErr := CheckAuth(w, r, c)
	if authErr != nil {
		http.Error(w, "User is not authenticated", http.StatusUnauthorized)
		return
	}
	query := "SELECT UP.UserID, SUM(UP.Quantity * P.CO2PerUnit) as Emissions FROM UserPlants UP JOIN Plants P on UP.PlantID = P.PlantID WHERE UP.UserID = ? GROUP BY UP.UserID"
	em := Emissions{}
	result := c.PlantStore.QueryRow(query, c.UserID)
	scanErr := result.Scan(&em.UserID, &em.Emissions)
	log.Printf("scan err: %v", scanErr)
	if scanErr != nil {
		http.Error(w, "Error retrieiving emissions data", http.StatusInternalServerError)
		return
	}
	emJSON, jsonErr := json.Marshal(em)
	if jsonErr != nil {
		http.Error(w, "Data could not be return", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(emJSON)
}

func CheckAuth(w http.ResponseWriter, r *http.Request, c *Context) error {
	if r.Header.Get("X-User") == "" {
		http.Error(w, "User is not authenticated", http.StatusUnauthorized)
		return errors.New("unauthenticated user")
	}
	userInfo := &users.User{}
	json.Unmarshal([]byte(r.Header.Get("X-User")), userInfo)
	c.UserID = userInfo.ID
	return nil
}
