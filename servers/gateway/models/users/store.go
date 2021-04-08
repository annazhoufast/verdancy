package users

import (
	"errors"
	"time"
)

var ErrUserNotFound = errors.New("User not found")

type Store interface {
	GetByID(id int64) (*User, error)

	GetByEmail(email string) (*User, error)

	// GetByUserName(us)

	Insert(user *User) (*User, error)

	Update(id int64, updates *Updates) (*User, error)

	Delete(id int64) error

	InsertSignIn(user *User, signinTime time.Time, ipAdd string) (*User, error)
}
