package models

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	URL      string    `gorm:"size:500;unique;not null" json:"url"`
	Projects []Project `gorm:"many2many:project_images" json:"projects"`
}
