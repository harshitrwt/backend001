package main

import (
	"net/http"
	"sync"
	"time"
)

type RateLimiter struct {
	tokens     int
	maxTokens  int
	refillRate time.Duration
	mutex      sync.Mutex
}

func NewRateLimiter(maxTokens int, refillRate time.Duration) *RateLimiter {
	rl := &RateLimiter{
		tokens:     maxTokens,
		maxTokens:  maxTokens,
		refillRate: refillRate,
	}

	go rl.refillTokens()
	return rl
}

func (rl *RateLimiter) refillTokens() {
	ticker := time.NewTicker(rl.refillRate)
	for range ticker.C {
		rl.mutex.Lock()
		rl.tokens = rl.maxTokens
		rl.mutex.Unlock()
	}
}

func (rl *RateLimiter) allow() bool {
	rl.mutex.Lock()
	defer rl.mutex.Unlock()

	if rl.tokens > 0 {
		rl.tokens--
		return true
	}
	return false
}

func (rl *RateLimiter) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !rl.allow() {
			http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	})
}
