package datalayer

type Movie_Location struct {
  location_id int             `json:"location_id"`
  movie_id int                `json:"movie_id"`
  location_description string `json:"location_description"`
  latitude float32            `json:"latitude"`
  longitude float32           `json:"longitude"`
  fun_fact string             `json:"fun_fact"`
}
type Movie_Locations []Movie_Location
