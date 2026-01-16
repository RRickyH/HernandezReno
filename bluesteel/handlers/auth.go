package handlers

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/middleware"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/services/siteservice"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
)

func (h *Handler) Login(c *gin.Context) {
	// Get credentials from headers
	var credentials models.CredentialsDTO
	err := c.ShouldBindJSON(&credentials)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.SiteService.ValidateCredentials(&credentials); err != nil {
		if errors.Is(err, siteservice.ErrInvalidCredentials) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
			return
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unknown error occured while authenticating"})
			return
		}
	}

	// Successfully authenticated.
	token, err := middleware.CreateJWT(&credentials)
	if err != nil {
		slog.Error("unable to make JWT", "error", err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to create JWT"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
}


func (h *Handler) CheckToken(c *gin.Context) {
    c.Status(http.StatusOK) // This must be set up as a protected route using auth middleware.
}