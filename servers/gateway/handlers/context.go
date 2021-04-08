package handlers

import (
	"plantastic/servers/gateway/models/users"
	"plantastic/servers/gateway/sessions"
)

type HandlerContext struct {
	SigningKey   string
	SessionStore sessions.Store
	UserStore    users.Store
}

func NewHandlerContext(signingKey string, sessStore sessions.Store, userStore users.Store) *HandlerContext {
	return &HandlerContext{
		signingKey,
		sessStore,
		userStore,
	}
}
