package plants_main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

// works
func (c *Context) PlantsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method must be GET", http.StatusMethodNotAllowed)
		return
	}
	rows, getErr := c.PlantStore.Query("SELECT PlantID, PlantName, PlantScientificName, Difficulty, ImageLink2 FROM Plants")
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
	if r.Method != "GET" {
		http.Error(w, "Method is not GET or POST", http.StatusMethodNotAllowed)
		return
	}
	plantID := r.URL.Path // idk where it actually is
	// plantID := r.URL.Path // again idk what this plantID is
	plantID = strings.TrimPrefix(plantID, "/v1/plants/")
	pID, _ := strconv.Atoi(plantID)
	log.Print(pID)
	if r.Method == "GET" {
		row := c.PlantStore.QueryRow("SELECT PlantID, PlantName, PlantScientificName, Difficulty, Height, ZoneStart, ZoneEnd, CO2PerUnit, UnitWeight, UnitDescr, Descr, Soil, Sun, Considerations, WhenToPlant, GrowFromSeeds, Transplanting, Spacing, Watering, Feeding, Other, Harvesting, Storage, ImageLink2 FROM Plants WHERE PlantID = ?", pID)
		// PlantID, PlantName, PlantScientificName, Difficulty, Height, ZoneStart, ZoneEnd, CO2PerUnit, UnitWeight, UnitDescr, Descr, ImageLink, Soil, Sun, Considerations, WhenToPlant, GrowFromSeeds, Transplanting, Spacing, Watering, Feeding, Other, Harvesting, Storage
		curPlant := EntirePlant{}
		scanErr := row.Scan(&curPlant.PlantID, &curPlant.PlantName, &curPlant.PlantScientificName,
			&curPlant.Difficulty, &curPlant.Height, &curPlant.ZoneStart, &curPlant.ZoneEnd,
			&curPlant.CO2PerUnit, &curPlant.UnitWeight, &curPlant.UnitDescr, &curPlant.Descr,
			&curPlant.Soil, &curPlant.Sun, &curPlant.Considerations,
			&curPlant.WhenToPlant, &curPlant.GrowFromSeeds, &curPlant.Transplanting, &curPlant.Spacing,
			&curPlant.Watering, &curPlant.Feeding, &curPlant.Other, &curPlant.Harvesting, &curPlant.Storage, &curPlant.ImageLink2)
		if scanErr != nil {
			log.Printf("scanErr: %v", scanErr)
			http.Error(w, "Error finding plant", http.StatusInternalServerError)
			return
		}
		plantJSON, jsonErr := json.Marshal(curPlant)
		if jsonErr != nil {
			http.Error(w, "Data could not be returned", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(plantJSON)
	}
}
