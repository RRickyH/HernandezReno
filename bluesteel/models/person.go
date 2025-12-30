package models

import "gorm.io/gorm"

type PersonID uint

type Person struct {
	gorm.Model
	ID          PersonID `gorm:"primaryKey"`
	Name        string   `gorm:"size:50;not null" json:"name"`
	Role        string   `gorm:"size:50;not null" json:"role"`
	PhotoURL    string   `gorm:"size:500" json:"photoURL"`
	Description string   `gorm:"type:text" json:"description"`
}

func ToPersonDTO(person *Person) PersonDTO {
	return PersonDTO{
		Name:        person.Name,
		Role:        person.Role,
		PhotoURL:    person.PhotoURL,
		Description: person.Description,
	}
}
