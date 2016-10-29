package datalayer

type Marker struct {
  Location_id int             `json:"location_id"`
  Movie_id int                `json:"movie_id"`
  Location_description *string `json:"location_description"`
  Latitude float32            `json:"latitude"`
  Longitude float32           `json:"longitude"`
  Fun_fact *string             `json:"fun_fact"`
}
type Markers []Marker
