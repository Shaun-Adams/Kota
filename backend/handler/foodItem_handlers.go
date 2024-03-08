package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"
    "strconv"
	"github.com/gorilla/mux"
	"api/model"
)

func GetFoodItems(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var foodItems []model.FoodItem
		rows, err := db.Query("SELECT id, item, description, quantity FROM foodItems")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		for rows.Next() {
			var u model.FoodItem
			if err := rows.Scan(&u.Id, &u.Item, &u.Description, &u.Quantity); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			foodItems = append(foodItems, u)
		}

		json.NewEncoder(w).Encode(foodItems)
	}
}

func GetFoodItem(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		var u model.FoodItem

		err := db.QueryRow("SELECT id, item, description, quantity FROM foodItems WHERE id = $1", id).Scan(&u.Id, &u.Item, &u.Description, &u.Quantity)
		if err != nil {
			http.Error(w, "FoodItem not found", http.StatusNotFound)
			return
		}

		json.NewEncoder(w).Encode(u)
	}
}

func CreateFoodItem(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var u model.FoodItem
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err := db.QueryRow("INSERT INTO foodItems (item, description, quantity) VALUES ($1, $2, $3) RETURNING id", u.Item, u.Description, u.Quantity).Scan(&u.Id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(u)
	}
}

func UpdateFoodItem(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]
		var u model.FoodItem
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err := db.Exec("UPDATE foodItems SET item = $1, description = $2, quantity = $3 WHERE id = $4", u.Item, u.Description, u.Quantity, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		u.Id, _ = strconv.Atoi(id)
		json.NewEncoder(w).Encode(u)
	}
}

func DeleteFoodItem(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		_, err := db.Exec("DELETE FROM foodItems WHERE id = $1", id)
		if err != nil {
			http.Error(w, "FoodItem not found", http.StatusNotFound)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode("FoodItem deleted")
	}
}
