package main

import (
	"api/database"
	"api/handler"
	"database/sql"
	"log"
	"math"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

func main() {
	database, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}
	defer database.Close()


	maxRetries := 5
	for i := 0; i < maxRetries; i++ {
		err = database.Ping()
		if err == nil {
			break
		}
		log.Printf("Could not connect to database: %v", err)
		time.Sleep(time.Second * time.Duration(math.Pow(2, float64(i)))) 
	}

	if err != nil {
		log.Fatalf("Failed to connect to database after %d retries: %v", maxRetries, err)
	}

	db.InitDB(database) 

	router := mux.NewRouter()

	router.HandleFunc("/api/go/register", handler.Register(database)).Methods("POST")
	router.HandleFunc("/api/go/login", handler.Login(database)).Methods("POST")

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
