package main

type Director struct {
  director_id int       `json:"director_id"`
  director_name string  `json:"director_name"`
}

type Directors []Director
