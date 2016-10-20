package main


import (
    "fmt"
    "io"
    "io/ioutil"
    "net/http"
    "net/http/httptest"
    "testing"
    "encoding/json"
    "bytes"
    "strconv"
)


var (
    server   *httptest.Server
    reader   io.Reader //Ignore this for now
    moviesUrl string
    id       int
    movie    Movie
)

func init() {

    server = httptest.NewServer(NewRouter()) //Creating new server with the user handlers
    beersUrl = fmt.Sprintf("%s/movies", server.URL) //Grab the address for the API endpoint
}


// Test can be run from the folder the file is with  $ go test -v main_test.go
func TestGetAllMovies(t *testing.T) {
    request, err := http.NewRequest("GET", moviesUrl, reader) //Create request with JSON body

    res, err := http.DefaultClient.Do(request)

    if err != nil {
        t.Error(err) //Something is wrong while sending request
    }

    if res.StatusCode != 200 {
        t.Errorf("Success expected: %d", res.StatusCode) //Uh-oh this means our test failed
    }
}


// Test can be run from the folder the file is with  $ go test -v api_test.go
func TestGetAllMovies2(t *testing.T) {
    request, err := http.NewRequest("GET", moviesUrl, reader) //Create request with JSON body

    res, err := http.DefaultClient.Do(request)

    if err != nil {
        t.Error(err) //Something is wrong while sending request
    }

    if res.StatusCode != 200 {
        t.Errorf("Success expected: %d", res.StatusCode) //Uh-oh this means our test failed
    }
}
