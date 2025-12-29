package siteservice

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"gorm.io/gorm"
	"log/slog"
)

type GormService struct {
	DB *gorm.DB
}

// NewGormService initializes and returns a new GormService struct using the given DB.
func NewGormService(db *gorm.DB) Service {
	return &GormService{db}
}

// Get fetches the site configurations or creates a new record if one does not exist.
func (g *GormService) Get() (models.SiteSettingsDTO, error) {
	var siteSettings models.SiteSettings
	result := g.DB.First(&siteSettings)
	if result.Error != nil {
		// If no settings exist, create some according to the default.
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			slog.Info("no site settings found; creating default site settings record...")
			siteSettings = models.DefaultSiteSettings()
			result = g.DB.Create(&siteSettings)
			if result.Error != nil {
				slog.Error("error arose when creating default site settings", "error", result.Error.Error())
				return models.SiteSettingsDTO{}, result.Error
			}
			return models.ToSiteSettingsDTO(&siteSettings), nil
		}
		slog.Error("unknown error occurred when attempting to fetch site settings", "error", result.Error)
		return models.SiteSettingsDTO{}, result.Error
	}
	// Site settings fetched successfully.
	return models.ToSiteSettingsDTO(&siteSettings), nil
}

// Update modifies the site configuration with the data provided in the DTO.
func (g *GormService) Update(siteSettingsDTO models.SiteSettingsDTO) error {
	var siteSettings models.SiteSettings
	result := g.DB.First(&siteSettings)
	if result.Error != nil {
		slog.Error("error fetching site settings from the database", "error", result.Error.Error())
		return result.Error
	}

	// Update settings if they are provided.
	if siteSettingsDTO.TitleText != "" {
		siteSettings.TitleText = siteSettingsDTO.TitleText
	}
	if siteSettingsDTO.AccentText != "" {
		siteSettings.AccentText = siteSettingsDTO.AccentText
	}
	if siteSettingsDTO.TagLine != "" {
		siteSettings.TagLine = siteSettingsDTO.TagLine
	}
	if siteSettingsDTO.HeroImageURL != "" {
		siteSettings.HeroImageURL = siteSettingsDTO.HeroImageURL
	}
	if siteSettingsDTO.AboutDescription != "" {
		siteSettings.AboutDescription = siteSettingsDTO.AboutDescription
	}
	if siteSettingsDTO.AboutImageURL != "" {
		siteSettings.AboutImageURL = siteSettingsDTO.AboutImageURL
	}

	// Save the model in the database.
	result = g.DB.Save(&siteSettings)
	if result.Error != nil {
		slog.Error("error occurred while saving site settings; settings unsaved!", "error", result.Error.Error())
		return result.Error
	}

	// Successfully updated settings.
	return nil
}
