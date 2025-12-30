package models

import "time"

type ProjectDTO struct {
	Title       string     `json:"title" binding:"max=100"`
	Images      []string   `json:"images" binding:"dive,url"`
	Date        *time.Time `json:"date"`
	Tags        []string   `json:"tags" binding:"dive,max=30"`
	Description *string    `json:"description" binding:"max=300"`
}

type SiteSettingsDTO struct {
	TitleText        string `json:"titleText"`
	AccentText       string `json:"accentText"`
	TagLine          string `json:"tagLine"`
	HeroImageURL     string `json:"heroImageURL"`
	AboutDescription string `json:"aboutDescription"`
	AboutImageURL    string `json:"AboutImageURL"`
}

type PersonDTO struct {
	Name        string `json:"name"`
	Role        string `json:"role"`
	PhotoURL    string `json:"photoURL"`
	Description string `json:"description"`
}
