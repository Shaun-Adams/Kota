package db

import (
	"database/sql"
	"log"
)

func InitDB(db *sql.DB) {
	createFoodItemsTable := `CREATE TABLE IF NOT EXISTS foodItems (
		id SERIAL PRIMARY KEY, 
		item TEXT, 
		description TEXT, 
		quantity INT
	)`
	_, err := db.Exec(createFoodItemsTable)
	if err != nil {
		log.Fatal(err)
	}

	createUsersTable := `CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY, 
		username TEXT UNIQUE NOT NULL, 
		password TEXT NOT NULL
	)`
	_, err = db.Exec(createUsersTable)
	if err != nil {
		log.Fatal(err)
	}
}
