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
	"github.com/gorilla/handlers"
)

func main() {
	database, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer database.Close()

	db.InitDB(database)

	router := mux.NewRouter()

	// Public routes
	router.HandleFunc("/api/go/register", handler.Register(database)).Methods("POST")
	router.HandleFunc("/api/go/login", handler.Login(database)).Methods("POST")

	// Secured routes
	securedRouter := router.PathPrefix("/api/go").Subrouter()
	securedRouter.Use(handler.JWTMiddleware)
	securedRouter.HandleFunc("/foodItems", handler.GetFoodItems(database)).Methods("GET")
	securedRouter.HandleFunc("/foodItems/{id}", handler.GetFoodItem(database)).Methods("GET")
	securedRouter.HandleFunc("/foodItems", handler.CreateFoodItem(database)).Methods("POST")
	securedRouter.HandleFunc("/foodItems/{id}", handler.UpdateFoodItem(database)).Methods("PUT")
	securedRouter.HandleFunc("/foodItems/{id}", handler.DeleteFoodItem(database)).Methods("DELETE")

	corsObj := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}), 
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowCredentials(),
	)

	http.Handle("/", corsObj(router))

	log.Println("Server is running on port 8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
