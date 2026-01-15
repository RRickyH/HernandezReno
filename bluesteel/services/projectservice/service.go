package projectservice

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
)

type Service interface {
	GetAll() ([]models.ProjectDTO, error)
	Add(projectDTO *models.ProjectDTO) (models.ProjectID, error)
	Delete(id models.ProjectID) error
	Update(id models.ProjectID, projectDTO *models.ProjectDTO) error
	GetImages(id models.ProjectID) ([]string, error)
	GetTags() ([]string, error)
	DeleteTag(tag string) error
}

var (
	ErrProjectNotFound = errors.New("project not found")
	ErrEmptyTag        = errors.New("empty tag provided")
)
