package personservice

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"gorm.io/gorm"
	"log/slog"
)

type GormService struct {
	DB *gorm.DB
}

// NewGormService initializes and returns a new GormService struct using the given DB.
func NewGormService(db *gorm.DB) Service { return &GormService{db} }

// GetAll fetches all people from the database and returns them in a DTO slice.
func (g GormService) GetAll() ([]models.PersonDTO, error) {
	var people []models.Person
	result := g.DB.Find(&people)
	if result.Error != nil {
		slog.Error("unable to fetch people from the database!", "error", result.Error.Error())
		return []models.PersonDTO{}, result.Error
	}

	// Map person models to DTOs.
	var peopleDTO []models.PersonDTO
	for _, person := range people {
		personDTO := models.ToPersonDTO(&person)
		peopleDTO = append(peopleDTO, *personDTO)
	}
	return peopleDTO, nil
}

// Get fetches a person from an id and returns it as a DTO.
func (g GormService) Get(id models.PersonID) (models.PersonDTO, error) {
	var person models.Person
	result := g.DB.First(&person, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return models.PersonDTO{}, ErrPersonNotFound
		}
		slog.Error("error getting person from the database", "error", result.Error)
		return models.PersonDTO{}, result.Error
	}
	return *models.ToPersonDTO(&person), nil
}

// Add saves the personDTO into the database and returns the person's ID.
func (g GormService) Add(personDTO *models.PersonDTO) (models.PersonID, error) {
	// Check that the required fields were provided.
	if personDTO.Name == nil {
		slog.Error("no name was provided when adding a person", "person", personDTO)
		return models.PersonID(0), ErrFieldNotProvided
	}
	if personDTO.Role == nil {
		slog.Error("no role was provided when adding a person", "person", personDTO)
		return models.PersonID(0), ErrFieldNotProvided
	}

	// Map the DTO to a gorm model.
	person := models.Person{
		Name:        *personDTO.Name,
		Role:        *personDTO.Role,
		PhotoURL:    personDTO.PhotoURL,
		Description: personDTO.Description,
	}
	result := g.DB.Save(&person)
	if result.Error != nil {
		slog.Error("error saving a new person", "error", result.Error)
		return models.PersonID(0), result.Error
	}
	slog.Info("saved person into database", "PersonID", person.ID)
	return person.ID, nil
}

// Delete removes a person from the database given their ID.
func (g GormService) Delete(id models.PersonID) error {
	var person models.Person
	result := g.DB.First(&person, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			slog.Error("unable to find person", "PersonID", id)
			return ErrPersonNotFound
		}
		slog.Error("unknown error occurred while searching for person", "PersonID", id, "error", result.Error.Error())
		return result.Error
	}

	result = g.DB.Delete(&person)
	if result.Error != nil {
		slog.Error("unable to delete project", "error", result.Error)
		return result.Error
	}
	return nil
}

// Update takes a person DTO and updates their model in the database.
func (g GormService) Update(id models.PersonID, personDTO *models.PersonDTO) error {
	var person models.Person
	result := g.DB.First(&person, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			slog.Error("unable to find person", "PersonID", id)
			return ErrPersonNotFound
		}
		slog.Error("fetching person failed", "PersonID", id, "error", result.Error.Error())
		return result.Error
	}

	// Update fields if they are provided.
	if personDTO.Name != nil {
		person.Name = *personDTO.Name
	}
	if personDTO.Role != nil {
		person.Role = *personDTO.Role
	}
	if personDTO.PhotoURL != nil {
		person.PhotoURL = personDTO.PhotoURL
	}
	if personDTO.Description != nil {
		person.Description = personDTO.Description
	}

	// Save the person model.
	result = g.DB.Save(&person)
	if result.Error != nil {
		slog.Error("saving person failed", "error", result.Error.Error())
		return result.Error
	}
	return nil
}
