package db

import (
	"database/sql"
	"log"
)

func InitDB(db *sql.DB) {
	_, err := db.Exec("CREATE TABLE IF NOT EXISTS foodItems (id SERIAL PRIMARY KEY, item TEXT, description TEXT, quantity INT)")
	if err != nil {
		log.Fatal(err)
	}
}