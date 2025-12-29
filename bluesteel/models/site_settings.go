package models

import (
	"gorm.io/gorm"
)

type SiteSettings struct {
	gorm.Model
	TitleText        string `gorm:"type:text" json:"titleText"`
	AccentText       string `gorm:"type:text" json:"accentText"`
	TagLine          string `gorm:"type:text" json:"tagLine"`
	HeroImageURL     string `gorm:"type:text" json:"heroImageURL"`
	AboutDescription string `gorm:"type:text" json:"aboutDescription"`
	AboutImageURL    string `gorm:"type:text" json:"AboutImageURL"`
}

func DefaultSiteSettings() SiteSettings {
	return SiteSettings{
		TitleText:        "Your Kitchen,",
		AccentText:       "Reimagined.",
		TagLine:          "Breathing new life into your spaces with hand-crafted custom carpentry and decades of expertise. Find out how we can transform your space today.",
		HeroImageURL:     "https://hernandezreno.ca/kitchen_fallback.png",
		AboutDescription: "Company information about the company description text, information. This is supplementary to what we are all about and it’s very essential for perception. It’s all about building trust in our company and showing that we know what we are doing, and are capable of transforming their space, and making them happy. This is also about telling a story about where we came from and where we are going. This really helps build authenticity, brand, and connection.",
		AboutImageURL:    "https://hernandezreno.ca/home_kitchen.jpg",
	}
}

func ToSiteSettingsDTO(siteSettings *SiteSettings) SiteSettingsDTO {
	return SiteSettingsDTO{
		TitleText:        siteSettings.TitleText,
		AccentText:       siteSettings.AccentText,
		TagLine:          siteSettings.TagLine,
		HeroImageURL:     siteSettings.HeroImageURL,
		AboutDescription: siteSettings.AboutDescription,
		AboutImageURL:    siteSettings.AboutImageURL,
	}
}
