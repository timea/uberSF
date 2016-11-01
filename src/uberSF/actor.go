package main

type Actor struct {
  movie_actor_id int  `json:"movie_actor_id"`
  movie_id int        `json:"movie_id"`
  actor_id int        `json:"actor_id"`
}

type Actors []Actor
