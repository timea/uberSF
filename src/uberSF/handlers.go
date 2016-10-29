package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
	"os"
	"github.com/timea/uberSF/src/uberSF/datalayer"
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
	datalayer.DBGetMovies()
	if err := json.NewEncoder(w).Encode(datalayer.GetMovies()); err != nil {
		panic(err)
	}
}

func GetAllMarkers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	datalayer.DBGetMarkers()
	if err := json.NewEncoder(w).Encode(datalayer.GetMarkers()); err != nil {
		panic(err)
	}
}
