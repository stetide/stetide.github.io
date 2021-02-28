package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Server started")
	if err := http.ListenAndServe(":8080", http.FileServer(http.Dir("."))); err != nil {
		fmt.Println("Failed starting server")
	}
}
