package handlers

import (
	"plantastic/servers/gateway/models/users"
	"time"
)

// SessionState instantiates the time the Current User begins
// their session
type SessionState struct {
	BeginTime   time.Time
	CurrentUser *users.User
}
