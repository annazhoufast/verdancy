package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	// log.Println(r.URL.Path)
	log.Printf("Call made to file handler to return: " + r.URL.Path)
	log.Printf("Returning a request for %s", r.URL.Path)
	w.Write([]byte("Hello, Web!\n"))
}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, world!")
}

func main() {
	addr := os.Getenv("ADDR")
	log.Println(len(addr))
	if len(addr) == 0 {
		addr = ":80"
	}

	mux := http.NewServeMux()

	// mux.HandleFunc("/v1/hello", HelloHandler)
	// mux.HandleFunc("/v1/root", RootHandler)
	mux.HandleFunc("/v1/summary", SummaryHandler)
	// fmt.Fprintf(w)
	log.Printf("server is listening at %s", addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}
