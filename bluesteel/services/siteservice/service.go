package siteservice

import (
	"github.com/RRickyH/HernandezReno/bluesteel/models"
)

type Service interface {
	Get() (models.SiteSettingsDTO, error)
	Update(siteSettingsDTO models.SiteSettingsDTO) error
}
