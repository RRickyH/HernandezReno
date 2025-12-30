package handlers

import (
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/services"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
)

// GetSiteSettings is the handler function for fetching site configuration settings from the site service.
func (h *Handler) GetSiteSettings(c *gin.Context) {
	// Use config version if it's been loaded
	if services.Config.SiteSettings != nil {
		c.JSON(http.StatusOK, services.Config.SiteSettings)
	} else {
		siteService, err := h.SiteService.Get()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "unable to get site settings"})
		}
		services.Config.SiteSettings = siteService
		c.JSON(http.StatusOK, siteService)
	}
}

// UpdateSiteSettings is the handler function for updating site configuration settings.
func (h *Handler) UpdateSiteSettings(c *gin.Context) {
	// Bind the settings as a DTO struct.
	var siteSettingsDTO models.SiteSettingsDTO
	if err := c.ShouldBindJSON(&siteSettingsDTO); err != nil {
		slog.Error("Failed to bind JSON Body", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.SiteService.Update(&siteSettingsDTO)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to update settings"})
	}
	services.Config.SiteSettings = &siteSettingsDTO
	c.Status(http.StatusNoContent)
}
