package models

import "gorm.io/gorm"

type Tag struct {
	gorm.Model
	Name     string    `gorm:"size:50;unique;not null" json:"name"`
	Projects []Project `gorm:"many2many:project_tags" json:"projects"`
}
