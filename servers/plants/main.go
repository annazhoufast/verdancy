package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	plants "plantastic/servers/plants/handlers"

	"github.com/gorilla/mux"
)

func main() {
	mux := mux.NewRouter()
	addr := os.Getenv("ADDR")
	dsn := os.Getenv("DSN")

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}

	server := plants.Context{PlantStore: db}

	mux.HandleFunc("/v1/plants", server.PlantsHandler)
	mux.HandleFunc("/v1/plants/{plantID}", server.SpecificPlantsHandler)
	mux.HandleFunc("/v1/UserPlants/{plantID}", server.SpecificUserHandler)
	mux.HandleFunc("/v1/UserPlants/", server.UserHandler)
	mux.HandleFunc("/v1/emissions/", server.EmissionsHandler)

	http.ListenAndServe(addr, mux)
}
