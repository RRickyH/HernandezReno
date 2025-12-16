package projectservice

import (
	"errors"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/jackc/pgx/v5/pgconn"
	"gorm.io/gorm"
	"log/slog"
)

const UniqueViolation = "23505"

type GormService struct {
	DB *gorm.DB
}

func NewGormService(db *gorm.DB) Service {
	return &GormService{db}
}

func (g *GormService) GetAll() ([]models.ProjectDTO, error) {
	var projects []models.Project
	result := g.DB.Find(&projects)
	if result.Error != nil {
		slog.Error("Failed to get all projects from the database", "error", result.Error.Error())
		return nil, result.Error
	}
	var projectsDTO []models.ProjectDTO
	result = g.DB.Preload("Images").Preload("Tags").Find(&projects)
	if result.Error != nil {
		slog.Error("Failed to load all projects and associations from the database", "error", result.Error.Error())
		return nil, result.Error
	}
	for _, project := range projects {
		// Get the image URLs
		var images []string
		if project.Images != nil {
			for _, image := range project.Images {
				images = append(images, image.URL)
			}
		}

		// Get the tag descriptions
		var tags []string
		if project.Tags != nil {
			for _, tag := range project.Tags {
				tags = append(tags, tag.Name)
			}
		}

		projectDTO := models.ProjectDTO{
			Title:       project.Title,
			Description: project.Description,
			Date:        project.Date,
			Images:      images,
			Tags:        tags,
		}
		projectsDTO = append(projectsDTO, projectDTO)
	}
	return projectsDTO, nil
}

func (g *GormService) Add(projectDTO *models.ProjectDTO) (models.ProjectID, error) {
	// Map the projectDTO to a gorm model and save this to the database.
	project := models.Project{
		Title:       projectDTO.Title,
		Date:        projectDTO.Date,
		Description: projectDTO.Description,
	}
	result := g.DB.Create(&project)
	if result.Error != nil {
		slog.Error("Failed to create project", "error", result.Error)
		return 0, result.Error
	}
	slog.Info("Created project", "ProjectID", project.ID)

	// Upload images and link them to the new project.
	err := g.linkImages(&project, projectDTO.Images)
	if err != nil {
		slog.Error("Unable to link images to the project")
	}
	// Upload tags and link them to the new project.
	err = g.linkTags(&project, projectDTO.Tags)
	if err != nil {
		slog.Error("Unable to link tags to the project")
	}
	return project.ID, nil
}

func (g *GormService) Delete(id models.ProjectID) error {
	var project models.Project
	result := g.DB.First(&project, id)
	if result.Error != nil {
		slog.Info("Unable to find project", "ProjectID", id)
		// Not found
		return ErrProjectNotFound
	}
	result = g.DB.Delete(&project)
	if result.Error != nil {
		slog.Error("Unable to delete project", "ProjectID", id, "error", result.Error.Error())
		return result.Error
	}
	// Project deleted successfully.
	return nil
}

func (g *GormService) Update(id models.ProjectID, projectDTO *models.ProjectDTO) error {
	// Get the project.
	var project models.Project
	result := g.DB.First(&project, id)
	if result.Error != nil {
		slog.Error("error fetching the project from the database", "error", result.Error.Error())
		if errors.As(result.Error, &gorm.ErrRecordNotFound) {
			return ErrProjectNotFound
		}
		return result.Error
	}

	// Update project fields.
	if projectDTO.Title != "" {
		project.Title = projectDTO.Title
	}
	if projectDTO.Description != nil {
		project.Description = projectDTO.Description
	}
	if projectDTO.Date != nil {
		project.Date = projectDTO.Date
	}

	result = g.DB.Save(&project)
	if result.Error != nil {
		slog.Error("error saving the project to the database", "error", result.Error.Error())
		return result.Error
	}

	// Create new image links if new images are provided.
	if len(projectDTO.Images) != 0 {
		err := g.DB.Model(&project).Association("Images").Clear()
		if err != nil {
			slog.Error("failed to clear original image links", "error", err.Error())
			return err
		}
		err = g.linkImages(&project, projectDTO.Images)
		if err != nil {
			slog.Error("Failed to link new images", "error", err)
			return err
		}
	}

	// Create new tag links if new tags are provided.
	if len(projectDTO.Tags) != 0 {
		err := g.DB.Model(&project).Association("Tags").Clear()
		if err != nil {
			slog.Error("failed to clear original tag links", "error", err.Error())
			return err
		}
		err = g.linkTags(&project, projectDTO.Tags)
		if err != nil {
			slog.Error("Failed to link new tag", "error", err)
			return err
		}
	}

	// Project updated successfully
	return nil
}

func (g *GormService) linkImages(project *models.Project, images []string) error {
	// Upload images and link them to the new project.
	for _, url := range images {
		image := models.Image{
			URL: url,
		}
		result := g.DB.Create(&image)
		if result.Error != nil {
			// If a duplicate image is uploaded, link the project to the original image.
			var pgErr *pgconn.PgError
			if errors.As(result.Error, &pgErr) && pgErr.Code == UniqueViolation {
				if result := g.DB.Where("url = ?", image.URL).First(&image); result.Error != nil {
					slog.Error("Failed to find duplicated image", "error", result.Error.Error())
				} else {
					slog.Info("Found duplicated image", "ImageID", image.ID)
					err := g.DB.Model(&project).Association("Images").Append(&image)
					if err != nil {
						slog.Error("Failed to link image", "error", err)
					}
				}
			} else {
				slog.Error("Failed to link image", "error", result.Error)
			}
		} else {
			err := g.DB.Model(&project).Association("Images").Append(&image)
			if err != nil {
				slog.Error("Failed to link image to project", "error", err)
			}
		}
	}
	return nil
}

func (g *GormService) linkTags(project *models.Project, tags []string) error {
	for _, newTag := range tags {
		tag := models.Tag{
			Name: newTag,
		}
		result := g.DB.Create(&tag)
		if result.Error != nil {
			// If a duplicate tag is uploaded, link the existing tag.
			var pgErr *pgconn.PgError
			if errors.As(result.Error, &pgErr) && pgErr.Code == UniqueViolation {
				if result := g.DB.Where("name = ?", tag.Name).First(&tag); result.Error != nil {
					slog.Error("Failed to find existing tag", "tag", tag.Name, "error", result.Error.Error())
				} else {
					slog.Info("Found duplicate tag", "tagID", tag.ID)
					err := g.DB.Model(&project).Association("Tags").Append(&tag)
					if err != nil {
						slog.Error("Failed to link tag to project", "error", err)
					}
				}
			} else {
				slog.Error("Failed to link tag to project", "error", result.Error)
			}
		} else {
			err := g.DB.Model(&project).Association("Tags").Append(&tag)
			if err != nil {
				slog.Error("Failed to link tag to project", "error", err)
			}
		}
	}
	return nil
}
