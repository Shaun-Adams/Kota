// model/user.go
package model

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"` // Note: In a real application, passwords should be hashed before storage
}
