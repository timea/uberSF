package main

import "net/http"

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"GetAllMovies",
		"GET",
		"/movies",
		GetAllMovies,
	},
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
	Route{
		"GetAllMarkers",
		"GET",
		"/markers",
		GetAllMarkers,
	},
	Route{
		"GetAllGenreMarkers",
		"GET",
		"/genre-markers/{genre}",
		GetAllGenreMarkers,
	},
	Route{
		"GetSelectedMovies",
		"GET",
		"/movies/{selected}",
		GetSelectedMovies,
	},
}
