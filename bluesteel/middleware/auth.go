package middleware

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/services"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"log/slog"
	"net/http"
	"strings"
	"time"
)

// AuthRequired is a middleware function that ensures checks the request header for a valid JWT ensuring the user is signed in.
func AuthRequired(c *gin.Context) {
	// Get and process the JWT.
	tokenStr := c.GetHeader("Authorization")
	if tokenStr == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "no authorization provided with request"})
		return
	}
	parts := strings.Split(tokenStr, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization format"})
		return
	}
	tokenStr = parts[1]

	// Validate the JWT
	err := ValidateJWT(tokenStr)
	if err != nil {
		switch {
		case errors.Is(err, ErrExpiredJWT):
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "expired session; please log in again"})
		case errors.Is(err, ErrInvalidJWT):
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization provided"})
		default:
			slog.Error("unable to validate JWT", "error", err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "an unknown error occurred"})
		}
		return
	}

	c.Next()
}

// CreateJWT uses the environment secret key to create a JWT.
func CreateJWT(credentials *models.CredentialsDTO) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": credentials.UserName,
		"exp":      expirationTime,
	})
	tokenStr, err := token.SignedString([]byte(services.Config.JWTSecretKey))
	if err != nil {
		slog.Error("unable to sign JWT", "error", err)
		return "", err
	}
	return tokenStr, nil
}

// ValidateJWT checks a given JWT and makes sure it is valid.
func ValidateJWT(tokenStr string) error {
	// Parse the JWT.
	token, err := jwt.Parse(
		tokenStr,
		func(token *jwt.Token) (interface{}, error) {
			return []byte(services.Config.JWTSecretKey), nil
		},
		jwt.WithValidMethods([]string{"HS256"}),
		jwt.WithExpirationRequired(),
	)
	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return ErrExpiredJWT
		}
		return err
	}

	// Final check.
	if !token.Valid {
		return ErrInvalidJWT
	}
	return nil
}

var (
	ErrInvalidJWT = errors.New("invalid jwt")
	ErrExpiredJWT = errors.New("the jwt is expired")
)
