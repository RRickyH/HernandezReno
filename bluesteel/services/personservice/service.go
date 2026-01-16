package personservice

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
)

type Service interface {
	GetAll() ([]models.PersonDTO, error)
	Get(id models.PersonID) (models.PersonDTO, error)
	Add(personDTO *models.PersonDTO) (models.PersonID, error)
	Delete(id models.PersonID) error
	Update(id models.PersonID, personDTO *models.PersonDTO) error
}

var (
	ErrPersonNotFound   = errors.New("person not found")
	ErrFieldNotProvided = errors.New("field not provided")
)
