package models

import "gorm.io/gorm"

type PersonID uint

type Person struct {
	gorm.Model
	ID          PersonID `gorm:"primaryKey"`
	Name        string   `gorm:"size:50;not null" json:"name,omitempty"`
	Role        string   `gorm:"size:50;not null" json:"role,omitempty"`
	PhotoURL    *string  `gorm:"size:500" json:"photoURL,omitempty"`
	Description *string  `gorm:"type:text" json:"description,omitempty"`
}

func ToPersonDTO(person *Person) *PersonDTO {
	return &PersonDTO{
		Name:        &person.Name,
		Role:        &person.Role,
		PhotoURL:    person.PhotoURL,
		Description: person.Description,
	}
}
