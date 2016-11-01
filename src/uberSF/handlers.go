package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
	"os"
	"github.com/gorilla/mux"
)



func Index(w http.ResponseWriter, r *http.Request) {
	pwd, _ := os.Getwd()
	body, err := ioutil.ReadFile(pwd+"/../public/index.html")
	if err != nil {
        panic(err)
    }
    fmt.Fprint(w, string(body))
}

func GetAllMovies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(DBGetMovies()); err != nil {
		panic(err)
	}
}

func GetAllMarkers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(DBGetMarkers()); err != nil {
		panic(err)
	}
}

func GetAllGenreMarkers(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	genre := vars["genre"]
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(DBGetGenreMovieMarkers(genre)); err != nil {
		panic(err)
	}
}

func GetSelectedMovies(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	movies := vars["selected"]
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(DBGetSelectedMovies(movies)); err != nil {
		panic(err)
	}
}
