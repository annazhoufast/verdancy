package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

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

	// server :=

	mux.HandleFunc("/user/")
	http.ListenAndServe(addr, mux)
}
