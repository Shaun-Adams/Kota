package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"api/handler"
	"api/database"
)

func main() {
	database, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer database.Close()

	db.InitDB(database)

	router := mux.NewRouter()

	router.HandleFunc("/api/go/foodItems", handler.GetFoodItems(database)).Methods("GET")
	router.HandleFunc("/api/go/foodItems", handler.CreateFoodItem(database)).Methods("POST")
	router.HandleFunc("/api/go/foodItems/{id}", handler.GetFoodItem(database)).Methods("GET")
	router.HandleFunc("/api/go/foodItems/{id}", handler.UpdateFoodItem(database)).Methods("PUT")
	router.HandleFunc("/api/go/foodItems/{id}", handler.DeleteFoodItem(database)).Methods("DELETE")

	enhancedRouter := handler.EnableCORS(handler.JsonContentTypeMiddleware(router))

	log.Fatal(http.ListenAndServe(":8000", enhancedRouter))
}
