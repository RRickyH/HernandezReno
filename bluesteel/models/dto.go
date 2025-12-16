package models

import "time"

type ProjectDTO struct {
	Title       string     `json:"title" binding:"max=100"`
	Images      []string   `json:"images" binding:"dive,url"`
	Date        *time.Time `json:"date"`
	Tags        []string   `json:"tags" binding:"dive,max=30"`
	Description *string    `json:"description" binding:"max=300"`
}
