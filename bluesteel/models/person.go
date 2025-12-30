package models

import "gorm.io/gorm"

type PersonID uint

type Person struct {
	gorm.Model
	ID          PersonID `gorm:"primaryKey"`
	Name        string   `gorm:"not null" json:"name"`
	Role        string   `gorm:"not null" json:"role"`
	PhotoURL    string   `json:"photoURL"`
	Description string   `json:"description"`
}

func ToPersonDTO(person *Person) PersonDTO {
	return PersonDTO{
		Name:        person.Name,
		Role:        person.Role,
		PhotoURL:    person.PhotoURL,
		Description: person.Description,
	}
}
