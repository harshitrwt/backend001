package main

import (
	"log"
	"net/http"
	"time"
)

func main() {
	limiter := NewRateLimiter(5, time.Second) // 5 requests/sec

	mux := http.NewServeMux()

	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/ready", readinessHandler)

	mux.Handle("/api/hello", limiter.Middleware(http.HandlerFunc(helloHandler)))

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("Server starting on :8080")
	log.Fatal(server.ListenAndServe())
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func readinessHandler(w http.ResponseWriter, r *http.Request) {
	// In real systems, check DB, cache, dependencies
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ready"))
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, world!"))
}
