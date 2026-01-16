package models

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	Key       string    `gorm:"size:500;not null" json:"key"`
	ProjectID ProjectID `gorm:"not null" json:"project_id"`
}
