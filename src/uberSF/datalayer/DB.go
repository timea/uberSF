package datalayer

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

// var lastId int
var movies Movies
var markers Markers

func DBGetMovies() Movies {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/uber")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	var (
		movie_id int
		movie_title *string
		release_year int
		production_company *string
		director_id int
		movie_writers *string
		movie_distributor *string
		imdb_id *string
		imdb_url *string
		image_url *string
		genre *string
		plot *string
	)
	rows, err := db.Query("select * from movies;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	movies = nil

	for rows.Next() {
		err := rows.Scan(
			&movie_id,
			&movie_title,
			&release_year,
			&production_company,
			&director_id,
			&movie_writers,
			&movie_distributor,
			&imdb_id,
			&imdb_url,
			&image_url,
			&genre,
			&plot)

		if err != nil {
			log.Fatal(err)
		}

		m := Movie{
			Movie_id:movie_id,
			Movie_title:movie_title,
			Release_year:release_year,
			Production_company:production_company,
			Director_id:director_id,
			Movie_writers:movie_writers,
			Movie_distributor:movie_distributor,
			Imdb_id:imdb_id,
			Imdb_url:imdb_url,
			Image_url:image_url,
			Genre:genre,
			Plot:plot}

		movies = append(movies, m)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	return movies
}

func DBGetMarkers() Markers {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/uber")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	var (
		location_id int
	  movie_id int
	  location_description *string
	  latitude float32
	  longitude float32
	  fun_fact *string
	)

	rows, err := db.Query("select * from movie_locations;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	markers = nil

	for rows.Next() {
		err := rows.Scan(
			&location_id,
			&movie_id,
			&location_description,
			&latitude,
			&longitude,
			&fun_fact)

		if err != nil {
			log.Fatal(err)
		}
		ma := Marker{
			Location_id:location_id,
		  Movie_id:movie_id,
		  Location_description:location_description,
		  Latitude:latitude,
		  Longitude:longitude,
		  Fun_fact:fun_fact}

		markers = append(markers, ma)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	return markers
}

func DBGetGenreMovieMarkers(genre string) Markers {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/uber")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	var (
		location_id int
		movie_id int
		location_description *string
		latitude float32
		longitude float32
		fun_fact *string
	)

	rows, err := db.Query("select * from movie_locations where movie_id in (select movie_id from movies where genre like '%" + genre +"%');")

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	markers = nil

	for rows.Next() {
		err := rows.Scan(
			&location_id,
			&movie_id,
			&location_description,
			&latitude,
			&longitude,
			&fun_fact)

		if err != nil {
			log.Fatal(err)
		}
		ma := Marker{
			Location_id:location_id,
			Movie_id:movie_id,
			Location_description:location_description,
			Latitude:latitude,
			Longitude:longitude,
			Fun_fact:fun_fact}

		markers = append(markers, ma)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	return markers
}
