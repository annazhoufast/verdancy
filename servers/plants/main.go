package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	plants "plantastic/servers/plants/handlers"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gorilla/mux"
)

func main() {
	mux := mux.NewRouter()
	addr := os.Getenv("ADDR")
	dsn := os.Getenv("DSN")

	db, err := sql.Open("mysql", dsn)
	// sql.Op
	log.Printf("db err: %v", err)
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()
	dbOpenErr := db.Ping()
	if dbOpenErr != nil {
		log.Printf("error pinging db: %v", dbOpenErr)
		fmt.Printf("Error pinging db: %v", dbOpenErr)
	}

	server := plants.Context{PlantStore: db}

	// mux.HandleFunc("/v1/plants", server.PlantsHandler)
	mux.HandleFunc("/v1/AddPlants/{plantID}", server.SpecificPlantsHandler)
	// mux.HandleFunc("/v1/plants/{plantID}", server.SpecificPlantsHandler)
	mux.HandleFunc("/v1/UserPlants/{plantID}", server.SpecificUserHandler)
	mux.HandleFunc("/v1/UserPlants/", server.UserHandler)
	mux.HandleFunc("/v1/emissions/", server.EmissionsHandler)
	log.Printf("hello")
	log.Fatal((http.ListenAndServe(addr, mux)))
}
