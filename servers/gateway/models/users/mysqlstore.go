package users

import (
	"database/sql"
	"errors"
	"fmt"
	"time"
)

var InvalidUser = &User{}

type MySQLStore interface {
	// GetByID returns the User associated with the given ID
	GetByID(ID int64) (*User, error)

	// GetByEmail returns the User associated with the given email
	GetByEmail(email string) (*User, error)

	// GetByUserName
	// Insert inserts a new nuser into the database and returns
	// a copy of the user information
	Insert(user *User) (*User, error)

	// Update updates the information of the given user w/ the ID
	Update(ID int64, updates *Updates) (*User, error)

	// Delete removes the user with the given ID and returns an error
	Delete(ID int64) error
}

type SQLStore struct {
	Db *sql.DB
}

// GetByID gets the User by the given ID
func (database SQLStore) GetByID(ID int64) (*User, error) {
	info, err := database.Db.Query("SELECT ID, Email, PassHash, FirstName, LastName FROM Users WHERE UserID = ?", ID)
	if err != nil {
		return nil, ErrUserNotFound
	}
	curUser := User{}
	for info.Next() {
		scanErr := info.Scan(&curUser.ID, &curUser.Email, &curUser.PassHash, &curUser.FirstName, &curUser.LastName)
		if scanErr != nil {
			return nil, scanErr
		}
	}
	return &curUser, nil
}

// GetByEmail returns the User associated with the given email
func (database SQLStore) GetByEmail(email string) (*User, error) {
	info, err := database.Db.Query("SELECT ID, Email, PassHash, FirstName, LastName FROM Users WHERE Email = ?", email)
	if err != nil {
		return nil, fmt.Errorf("Unexpected error querying database: %v", err)
	}
	usr := User{}
	for info.Next() {
		scanErr := info.Scan(&usr.ID, &usr.Email, &usr.PassHash, &usr.FirstName, &usr.LastName)
		if scanErr != nil {
			return nil, scanErr
		}
	}
	usr.Email = email
	return &usr, nil
}

// GetByUserName

// Insert inserts a new user into the database
func (database SQLStore) Insert(user *User) (*User, error) {
	trx, errTR := database.Db.Begin()
	if errTR != nil {
		return nil, fmt.Errorf("Error beginning transaction: %v", errTR)
	}
	insertQ := "INSERT INTO Users(Email, PassHash, FirstName, LastName) VALUES (?,?,?,?)"
	q, errQ := trx.Prepare(insertQ)
	if errQ != nil {
		return InvalidUser, fmt.Errorf("Error preparing insert user transaction")
	}
	defer q.Close()
	result, err := q.Exec(user.Email, user.PassHash, user.FirstName, user.LastName)
	if err != nil {
		trx.Rollback()
		return InvalidUser, fmt.Errorf("Error inserting new user: %v", err)
	}
	newID, idErr := result.LastInsertId()
	if idErr != nil {
		return InvalidUser, fmt.Errorf("Error getting new ID: %v", idErr)
	}
	user.ID = newID
	trx.Commit()
	return user, nil
}

// InsertSignin inserts a new row into the SignIn table
func (database SQLStore) InsertSignIn(user *User, signinTime time.Time, ipAdd string) (*User, error) {
	trx, errTR := database.Db.Begin()
	if errTR != nil {
		return nil, fmt.Errorf("Error beginning transaction: %v", errTR)
	}
	insertQ := "INSERT INTO SignIns(UserID, SignInDate, IPAddress) VALUES (?,?,?)"
	q, errQ := trx.Prepare(insertQ)
	if errQ != nil {
		return InvalidUser, fmt.Errorf("Error preparing insert signin transaction")
	}
	defer q.Close()
	result, err := q.Exec(user.ID, signinTime, ipAdd)
	if err != nil {
		trx.Rollback()
		return InvalidUser, fmt.Errorf("Error inserting new row into SignIns: %v", err)
	}
	_, idErr := result.LastInsertId()
	if idErr != nil {
		return InvalidUser, fmt.Errorf("Error getting new ID: %v", idErr)
	}
	trx.Commit()
	return user, nil
}

// Update applies updates to the given user
func (database SQLStore) Update(ID int64, updates *Updates) (*User, error) {
	trx, errTR := database.Db.Begin()
	if errTR != nil {
		return nil, fmt.Errorf("Error beginning transaction: %v", errTR)
	}
	curUser, err := database.GetByID(ID)
	if err != nil {
		return nil, err
	}
	updateErr := curUser.ApplyUpdates(updates)
	if updateErr != nil {
		return nil, updateErr
	}
	updateQ := "UPDATE Users SET FirstName = ?, LastName = ? WHERE ID = ?"
	q, errQ := trx.Prepare(updateQ)
	if errQ != nil {
		return InvalidUser, fmt.Errorf("Error preparing update")
	}
	defer q.Close()
	_, sqlErr := q.Exec(updates.FirstName, updates.LastName, ID)
	if sqlErr != nil {
		trx.Rollback()
		return nil, fmt.Errorf("error applying update to user: %v", sqlErr)
	}
	trx.Commit()
	return curUser, nil
}

// Delete deletes the user from the database
func (database SQLStore) Delete(ID int64) error {
	deleteQ := "DELETE FROM Users WHERE ID =?"
	_, err := database.Db.Exec(deleteQ, ID)
	if err != nil {
		return errors.New("Error Deleting User")
	}
	return nil
}
