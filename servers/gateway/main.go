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
	"plantastic/servers/gateway/handlers/plants_main"
	"plantastic/servers/gateway/models/users"
	"plantastic/servers/gateway/sessions"
	"strings"
	"sync/atomic"
	"time"

	_ "github.com/go-sql-driver/mysql"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
)

type Director func(r *http.Request)

func CustomDirector(target []*url.URL, signingKey string, sessionStore sessions.Store) Director {
	var counter int32 = 0
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

func CustomDirector2(target *url.URL) Director {
	return func(r *http.Request) {
		r.Header.Add("X-Forwarded-Host", r.Host)
		r.Host = target.Host
		r.URL.Host = target.Host
		r.URL.Scheme = target.Scheme
	}
}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, world!")
}

func main() {
	addr := os.Getenv("ADDR")
	TLSCERT := os.Getenv("TLSCERT")
	TLSKEY := os.Getenv("TLSKEY")
	SESSIONKEY := os.Getenv("SESSIONKEY")
	REDISADDR := os.Getenv("REDISADDR")
	DSN := os.Getenv("DSN")
	PLANTADDR := os.Getenv("PLANTADDR")
	// HELLOADDR := os.Getenv("HELLOADDR")
	SUMMARYADDR := os.Getenv("SUMMARYADDR")

	client := redis.NewClient(
		&redis.Options{
			Addr: REDISADDR,
		},
	)
	ping, err := client.Ping().Result()
	if err != nil {
		fmt.Printf("pong: %v", ping)
		log.Printf("pong: %v", ping)
		fmt.Printf("error getting redis: %v", err)
		log.Printf("error getting redis: %v", err)
	}
	redisStore := sessions.NewRedisStore(client, time.Hour)
	db, dbErr := sql.Open("mysql", DSN)
	if dbErr != nil {
		log.Printf("Error opening db: %v", dbErr)
		fmt.Printf("Error opening database: %v", dbErr)
	}
	defer db.Close()
	dbOpenErr := db.Ping()
	if dbOpenErr != nil {
		log.Printf("error pinging db: %v", dbOpenErr)
		fmt.Printf("Error pinging db: %v", dbOpenErr)
	}
	userStore := users.SQLStore{Db: db}
	context := handlers.NewHandlerContext(SESSIONKEY, redisStore, userStore)
	plantCtx := plants_main.Context{PlantStore: db}
	// verify tls exists
	if len(TLSCERT) == 0 {
		log.Fatalln(errors.New("TLSCERT Not Found"))
	}

	if len(TLSKEY) == 0 {
		log.Fatalln(errors.New("TLSKEY Not Found"))
	}

	if len(addr) == 0 {
		addr = ":443"
		// addr = ":80"
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

	// helloURL := &url.URL{Scheme: "http", Host: HELLOADDR}

	// helloProxy := &httputil.ReverseProxy{Director: CustomDirector2(helloURL)}
	summaryURL := &url.URL{Scheme: "http", Host: SUMMARYADDR}
	summaryProxy := &httputil.ReverseProxy{Director: CustomDirector2(summaryURL)}

	plantProxy := &httputil.ReverseProxy{Director: CustomDirector(pUrls, context.SigningKey, context.SessionStore)}

	mux := mux.NewRouter()
	mux.HandleFunc("/hello", RootHandler)
	mux.HandleFunc("/v1/users", context.UsersHandler)
	mux.HandleFunc("/v1/users/{id}", context.SpecificUserHandler)
	mux.HandleFunc("/v1/sessions", context.SessionsHandler)
	mux.HandleFunc("/v1/sessions/{id}", context.SpecificSessionHandler)
	mux.HandleFunc("/v1/plants", plantCtx.PlantsHandler)
	mux.HandleFunc("/v1/plants/{plantID}", plantCtx.SpecificPlantsHandler)

	// mux.Handle("/v1/plants", plantProxy)
	// mux.Handle("/v1/plants/{plantID}", plantProxy)

	// mux.Handle("/v1/hello", helloProxy)
	// mux.Handle("/v1/root", helloProxy)
	// mux.Handle("/v1/summary", helloProxy)
	mux.Handle("/v1/summary", summaryProxy)
	mux.Handle("/v1/AddPlants/{plantID}", plantProxy)
	mux.Handle("/v1/UserPlants/{plantID}", plantProxy)
	mux.Handle("/v1/UserPlants/", plantProxy)
	mux.Handle("/v1/emissions/", plantProxy)

	wrappedMux := handlers.NewCorsMW(mux)

	log.Printf("server is listening at http://%s", addr)
	log.Println("Hello, World!")
	// log.Fatal(http.ListenAndServe(addr, mux))
	log.Fatal(http.ListenAndServeTLS(addr, TLSCERT, TLSKEY, wrappedMux))
	// log.Fatal(http.ListenAndServe(addr, wrappedMux))
}
