package models

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	Key       string    `gorm:"size:500;unique;not null" json:"key"`
	ProjectID ProjectID `json:"project_id"`
}
