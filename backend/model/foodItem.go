package model

type FoodItem struct {
	Id          int   `json:"id"`
	Item        string `json:"item"`
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
}