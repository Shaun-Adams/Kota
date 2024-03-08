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

	router.HandleFunc("/api/go/register", handler.Register(database)).Methods("POST")
	router.HandleFunc("/api/go/login", handler.Login(database)).Methods("POST")


	// In your main function, wrap the food item routes with the Authenticate middleware
	router.Handle("/api/go/foodItems", handler.JWTMiddleware(handler.GetFoodItems(database))).Methods("GET")
	router.Handle("/api/go/foodItems", handler.JWTMiddleware(handler.CreateFoodItem(database))).Methods("POST")
	router.Handle("/api/go/foodItems/{id}", handler.JWTMiddleware(handler.GetFoodItem(database))).Methods("GET")
	router.Handle("/api/go/foodItems/{id}", handler.JWTMiddleware(handler.UpdateFoodItem(database))).Methods("PUT")
	router.Handle("/api/go/foodItems/{id}", handler.JWTMiddleware(handler.DeleteFoodItem(database))).Methods("DELETE")


	enhancedRouter := handler.EnableCORS(handler.JsonContentTypeMiddleware(router))

	log.Fatal(http.ListenAndServe(":8000", enhancedRouter))



	// Register your routes here
	// Public routes
	// router.HandleFunc("/api/go/register", handler.Register(database)).Methods("POST")
	// router.HandleFunc("/api/go/login", handler.Login(database)).Methods("POST")

	// // Secured routes
	// securedRouter := router.PathPrefix("/api/go").Subrouter()
	// securedRouter.Use(handler.JWTMiddleware)
	// securedRouter.HandleFunc("/foodItems", handler.GetFoodItems(database)).Methods("GET")
	// securedRouter.HandleFunc("/foodItems/{id}", handler.GetFoodItem(database)).Methods("GET")
	// securedRouter.HandleFunc("/foodItems", handler.CreateFoodItem(database)).Methods("POST")
	// securedRouter.HandleFunc("/foodItems/{id}", handler.UpdateFoodItem(database)).Methods("PUT")
	// securedRouter.HandleFunc("/foodItems/{id}", handler.DeleteFoodItem(database)).Methods("DELETE")

	// // Apply middlewares
	// router.Use(handler.EnableCORS)
	// router.Use(handler.JsonContentTypeMiddleware)

	// log.Fatal(http.ListenAndServe(":8000", router))
}
