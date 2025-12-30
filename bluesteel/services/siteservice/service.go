package siteservice

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
)

type Service interface {
	Get() (*models.SiteSettingsDTO, error)
	Update(siteSettingsDTO *models.SiteSettingsDTO) error
	ValidateCredentials(credentials *models.CredentialsDTO) error
}

var (
	ErrInvalidCredentials = errors.New("invalid credentials provided")
)
