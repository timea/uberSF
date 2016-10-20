package main

import (
	"log"
	"net/http"
)

func main() {

	router := NewRouter()
	port := "8080"

	log.Fatal(http.ListenAndServe(":"+ port, router))
	log.Println("Server started: http://localhost:" + port)
}
