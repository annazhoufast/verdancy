package users

import (
	"crypto/md5"
	"fmt"
	"log"
	"net/mail"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

//gravatarBasePhotoURL is the base URL for Gravatar image requests.
//See https://id.gravatar.com/site/implement/images/ for details
const gravatarBasePhotoURL = "https://www.gravatar.com/avatar/"

//bcryptCost is the default bcrypt cost to use when hashing passwords
var bcryptCost = 13

type User struct {
	ID        int64  `json:"id"`
	Email     string `json:"-"`
	PassHash  []byte `json:"-"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type NewUser struct {
	Email        string `json:"email"`
	Password     string `json:"password"`
	PasswordConf string `json:"passwordConf"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
}

type Updates struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

// Validate checks to see if the NewUser has the proper fields entered correctly
func (nu *NewUser) Validate() error {
	email, emailErr := mail.ParseAddress(nu.Email)
	if emailErr != nil {
		return fmt.Errorf("Invalid Email: got %s", email)
	}
	if len(nu.Password) < 6 {
		return fmt.Errorf("Invalid Password: Password is not long enough")
	}
	if nu.Password != nu.PasswordConf {
		return fmt.Errorf("Invalid Confirmation Password: Confirmation password does not match password")
	}
	return nil
}

// ToUser creates a new user from the new user account info
func (nu *NewUser) ToUser() (*User, error) {
	valErr := nu.Validate()
	if valErr != nil {
		return nil, valErr
	}
	email := nu.Email
	email = strings.TrimSpace(email)
	email = strings.ToLower(email)
	hash := md5.New()
	hash.Write([]byte(email))
	// hashEmail := hex.EncodeToString(hash.Sum(nil))

	usr := &User{
		Email:     nu.Email,
		FirstName: nu.FirstName,
		LastName:  nu.LastName,
	}
	usr.SetPassword(nu.Password)
	return usr, nil
}

// FullName returns the Users full name as one string
func (u *User) FullName() string {
	fName := u.FirstName
	lName := u.LastName
	if fName == "" && lName == "" {
		return ""
	} else if lName == "" {
		return fName
	} else if fName == "" {
		return lName
	} else {
		return fName + " " + lName
	}
}

// SetPassword sets the user's password to a hash
func (u *User) SetPassword(password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return err
	}
	u.PassHash = hash
	return nil
}

// Authenticate compares the login password to the stored hash password
// return error if they do not match; nil if they do
func (u *User) Authenticate(password string) error {
	if password == "" {
		return fmt.Errorf("Error: Please Enter a Password")
	}
	p := []byte(password)
	err := bcrypt.CompareHashAndPassword(u.PassHash, p)
	if err != nil {
		log.Println(err)
		return fmt.Errorf("Passwords do not match")
	}
	return nil
}

// ApplyUpdates applies updates to the user
// error returned if the update is not valid
func (u *User) ApplyUpdates(updates *Updates) error {
	upF := updates.FirstName
	upL := updates.LastName
	if len(upF) == 0 && len(upL) == 0 {
		return fmt.Errorf("Updates cannot be of length 0")
	}
	if len(upF) > 0 && u.FirstName != upF {
		u.FirstName = upF
	}
	if len(upL) > 0 && u.LastName != upL {
		u.LastName = upL
	}

	return nil
}
