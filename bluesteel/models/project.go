package models

import (
	"gorm.io/gorm"
	"time"
)

type ProjectID uint

type Project struct {
	gorm.Model
	ID          ProjectID  `gorm:"primaryKey"`
	Title       *string    `gorm:"size:150;not null" json:"title,omitempty"`
	Images      []Image    `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE;dependent:delete" json:"images,omitempty"`
	Date        *time.Time `gorm:"type:date" json:"date,omitempty"`
	Tags        []Tag      `gorm:"many2many:project_tags;constraint:OnDelete:CASCADE" json:"tags,omitempty"`
	Description *string    `gorm:"type:text" json:"description,omitempty"`
}
