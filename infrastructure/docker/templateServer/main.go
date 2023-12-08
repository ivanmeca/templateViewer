package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
)

const TemplatesFile = "./assets/templates.json"

var ServerData string

func LoadData() {
	dat, _ := os.ReadFile(TemplatesFile)
	ServerData = string(dat)
}

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got / request\n")
	io.WriteString(w, "OK")
}
func getTemplates(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got /templates request\n")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	io.WriteString(w, ServerData)
}

func main() {
	LoadData()

	http.HandleFunc("/", getRoot)
	http.HandleFunc("/templates", getTemplates)
	err := http.ListenAndServe(":3030", nil)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}
}
