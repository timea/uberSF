package datalayer

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

// var lastId int
var movies Movies

func GetMovies() Movies {
	return movies
}

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

	return GetMovies()
}
