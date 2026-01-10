package models

import "time"

type ProjectDTO struct {
    ID          *string     `json:"id"`
	Title       *string    `json:"title" binding:"omitempty,max=150"`
	ImageKeys   []string   `json:"imageKeys" binding:"omitempty,dive,max=500"`
	Date        *time.Time `json:"date"`
	Tags        []string   `json:"tags" binding:"omitempty,dive,max=30"`
	Description *string    `json:"description" binding:"omitempty,max=300"`
}

type SiteSettingsDTO struct {
	TitleText        *string `json:"titleText" binding:"omitempty,max=50"`
	AccentText       *string `json:"accentText" binding:"omitempty,max=50"`
	TagLine          *string `json:"tagLine" binding:"omitempty,max=300"`
	HeroImageURL     *string `json:"heroImageURL" binding:"omitempty,max=500"`
	AboutDescription *string `json:"aboutDescription"`
	AboutImageURL    *string `json:"aboutImageURL" binding:"omitempty,max=500"`
}

type PersonDTO struct {
    ID          *string `json:"id"`
	Name        *string `json:"name" binding:"omitempty,max=50"`
	Role        *string `json:"role" binding:"omitempty,max=50"`
	PhotoURL    *string `json:"photoURL" binding:"omitempty,max=500"`
	Description *string `json:"description" binding:"omitempty"`
}

type CredentialsDTO struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}
