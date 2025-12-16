package projectservice

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
)

type Service interface {
	GetAll() ([]models.ProjectDTO, error)
	Add(projectDTO *models.ProjectDTO) (models.ProjectID, error)
	Delete(models.ProjectID) error
	Update(id models.ProjectID, projectDTO *models.ProjectDTO) error
}

var (
	ErrProjectNotFound = errors.New("project not found")
	ErrProjectExists   = errors.New("project already exists")
)
