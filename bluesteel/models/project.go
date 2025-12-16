package models

import (
	"gorm.io/gorm"
	"time"
)

type ProjectID uint

type Project struct {
	gorm.Model
	ID          ProjectID  `gorm:"primaryKey"`
	Title       string     `gorm:"not null" json:"title"`
	Images      []Image    `gorm:"many2many:project_images" json:"images,omitempty"`
	Date        *time.Time `gorm:"type:date" json:"date,omitempty"`
	Tags        []Tag      `gorm:"many2many:project_tags" json:"tags,omitempty"`
	Description *string    `gorm:"type:text" json:"description,omitempty"`
}
