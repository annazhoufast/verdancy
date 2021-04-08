package sessions

import (
	"encoding/json"
	"time"

	"github.com/go-redis/redis"
)

// RedisStore reps a session.Store backed by redi
type RedisStore struct {
	// Redis client used to talk to redis server
	Client *redis.Client
	// Used for key expiry time on redis
	SessionDuration time.Duration
}

// NewRedisStore makes a new RedisStore
func NewRedisStore(client *redis.Client, sessionDuration time.Duration) *RedisStore {
	return &RedisStore{
		Client:          client,
		SessionDuration: sessionDuration,
	}
}

// Store implementation

// Save saves the provided sessionState and associated SessionID to the store
func (rs *RedisStore) Save(sid SessionID, sessionState interface{}) error {
	j, err := json.Marshal(sessionState)
	if err != nil {
		return err
	}
	err = rs.Client.Set(sid.getRedisKey(), j, rs.SessionDuration).Err()
	if err != nil {
		return err
	}
	return nil
}

// Get popluates the sessionState with the data previously saved for the given SessionID
func (rs *RedisStore) Get(sid SessionID, sessionState interface{}) error {
	key := sid.getRedisKey()
	j := rs.Client.Get(key)
	res, jErr := j.Result()
	if jErr != nil {
		return ErrStateNotFound
	}
	rs.Client.Set(key, sessionState, rs.SessionDuration)
	return json.Unmarshal([]byte(res), sessionState)
}

// Delete deletaes all state data assosciated with the given SessionID
func (rs *RedisStore) Delete(sid SessionID) error {
	delErr := rs.Client.Del(sid.getRedisKey()).Err()
	return delErr
}

// getRedisKey() returns the redis key to use for the SessionID
func (sid SessionID) getRedisKey() string {
	return "sid:" + sid.String()
}
