package main

type Movie struct {
	Movie_id int 								`json:"movie_id"`
	Movie_title *string					`json:"movie_title"`
	Release_year int						`json:"release_year"`
	Production_company *string	`json:"production_company"`
	Director_id int							`json:"director_id"`
	Movie_writers *string				`json:"movie_writers"`
	Movie_distributor *string		`json:"movie_distributor"`
	Imdb_id *string							`json:"imdb_id"`
	Imdb_url *string						`json:"imdb_url"`
	Image_url *string						`json:"image_url"`
	Genre *string								`json:"genre"`
	Plot *string								`json:"plot"`
}

type Movies []Movie
