package projectservice

import (
	"errors"
	"fmt"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"gorm.io/gorm"
	"log/slog"
)

const UniqueViolation = "23505"

type GormService struct {
	DB *gorm.DB
}

// NewGormService initializes and returns a new GormService struct using the given DB.
func NewGormService(db *gorm.DB) Service {
	return &GormService{db}
}

// GetAll fetches all projects from the database and returns them in a projectDTO slice.
func (g *GormService) GetAll() ([]models.ProjectDTO, error) {
	var projects []models.Project
	var projectsDTO []models.ProjectDTO
	result := g.DB.Preload("Images").Preload("Tags").Find(&projects)
	if result.Error != nil {
		slog.Error("Failed to load all projects and associations from the database", "error", result.Error.Error())
		return nil, result.Error
	}
	for _, project := range projects {
		// Get the image object keys.
		var imageKeys []string
		if project.Images != nil {
			for _, image := range project.Images {
				imageKeys = append(imageKeys, image.Key)
			}
		}

		// Get the tag descriptions
		var tags []string
		if project.Tags != nil {
			for _, tag := range project.Tags {
				tags = append(tags, tag.Name)
			}
		}
		projectID := fmt.Sprintf("%d", project.ID)
		projectDTO := models.ProjectDTO{
			ID:          &projectID,
			Title:       project.Title,
			Description: project.Description,
			Date:        project.Date,
			ImageKeys:   imageKeys,
			Tags:        tags,
		}
		projectsDTO = append(projectsDTO, projectDTO)
	}
	return projectsDTO, nil
}

// Add saves the given projectDTO as a new project in the database.
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
	err := linkImages(g.DB, &project, projectDTO.ImageKeys)
	if err != nil {
		slog.Error("Unable to link images to the project")
	}
	// Upload tags and link them to the new project.
	err = linkTags(g.DB, &project, projectDTO.Tags)
	if err != nil {
		slog.Error("Unable to link tags to the project")
	}
	return project.ID, nil
}

// Delete removes the project corresponding to the given ID.
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

// Update modifies project details to match the projectDTO for the project with the corresponding ID.
func (g *GormService) Update(id models.ProjectID, projectDTO *models.ProjectDTO) error {
	return g.DB.Transaction(func(tx *gorm.DB) error {
		// Get the project.
		var project models.Project
		result := tx.First(&project, id)
		if result.Error != nil {
			slog.Error("error fetching the project from the database", "error", result.Error.Error())
			if errors.As(result.Error, &gorm.ErrRecordNotFound) {
				return ErrProjectNotFound
			}
			return result.Error
		}

		// Update project fields.
		if projectDTO.Title != nil {
			project.Title = projectDTO.Title
		}
		if projectDTO.Description != nil {
			project.Description = projectDTO.Description
		}
		if projectDTO.Date != nil {
			project.Date = projectDTO.Date
		}

		// Create new image links if new images are provided.
		if projectDTO.ImageKeys != nil {
			// Clear the original images.
			err := tx.Model(&project).Association("Images").Unscoped().Clear()
			if err != nil {
				slog.Error("failed to clear original image links", "error", err.Error())
				return err
			}
			// Link new images
			err = linkImages(tx, &project, projectDTO.ImageKeys)
			if err != nil {
				slog.Error("Failed to link new images", "error", err)
				return err
			}
		}

		// Create new tag links if new tags are provided.
		if projectDTO.Tags != nil {
			// Clear original tags.
			err := tx.Model(&project).Association("Tags").Clear()
			if err != nil {
				slog.Error("failed to clear original tag links", "error", err.Error())
				return err
			}
			// Link new tags
			err = linkTags(tx, &project, projectDTO.Tags)
			if err != nil {
				slog.Error("Failed to link new tag", "error", err)
				return err
			}
		}

		// Save the project.
		result = tx.Save(&project)
		if result.Error != nil {
			slog.Error("error saving the project to the database", "error", result.Error.Error())
			return result.Error
		}
		// Project updated successfully
		return nil
	})
}

// GetImages returns a slice of the image models associated with a given project.
func (g *GormService) GetImages(id models.ProjectID) ([]string, error) {
	// Fetch the project from the database.
	var project models.Project
	result := g.DB.Preload("Images").First(&project, id)
	if result.Error != nil {
		if errors.As(result.Error, &gorm.ErrRecordNotFound) {
			slog.Error("invalid project id; project does not exist")
			return nil, ErrProjectNotFound
		} else {
			slog.Error("error fetching the project from the database", result.Error.Error())
			return nil, result.Error
		}
	}

	var urls []string
	for _, image := range project.Images {
		urls = append(urls, image.Key)
	}

	return urls, nil
}

// GetTags fetches all the tags from the database and returns them.
func (g *GormService) GetTags() ([]string, error) {
	var tagModels []models.Tag
	result := g.DB.Find(&tagModels)
	if result.Error != nil {
		slog.Error("failed to fetch tags from the GormService", "error", result.Error.Error())
		return nil, result.Error
	}

	// Make a string slice of the tags.
	var tags []string
	for _, tag := range tagModels {
		tags = append(tags, tag.Name)
	}

	return tags, nil
}

// DeleteTag removes a tag from the database and associated projects.
func (g *GormService) DeleteTag(tag string) error {
	if tag == "" {
		return ErrEmptyTag
	}
	result := g.DB.Where("name = ?", tag).Delete(&models.Tag{})
	return result.Error
}

// linkImages is a helper function that saves given images in the database and links them to the given project.
func linkImages(db *gorm.DB, project *models.Project, imageKeys []string) error {
	slog.Info("linking images to project", "ProjectID", project.ID, "imageKeys", imageKeys)
	if imageKeys == nil {
		slog.Info("no images to link with project", "ProjectID", project.ID)
		return nil
	}
	// Upload images and link them to the new project.
	for _, key := range imageKeys {
		// Create a new image or use one if it already exists.
		var image models.Image
		result := db.FirstOrCreate(&image, models.Image{Key: key, ProjectID: project.ID})
		if result.Error != nil {
			slog.Error("Failed to link image to project", "imageKey", key, "error", result.Error)
			continue
		}
	}
	return nil
}

// linkTags is a helper function that saves given tags in the database and links them to the given project.
func linkTags(db *gorm.DB, project *models.Project, tags []string) error {
	if tags == nil {
		slog.Info("no tags provided to link with project", "ProjectID", project.ID)
		return nil
	}

	// Create or get pre-existing tags.
	var tagModels []models.Tag
	for _, newTag := range tags {
		// Create a new tag or use one if it already exists.
		var tag models.Tag
		result := db.FirstOrCreate(&tag, models.Tag{Name: newTag})
		if result.Error != nil {
			slog.Error("Failed to create tag", "error", result.Error, "tag", newTag)
			continue
		}
		tagModels = append(tagModels, tag)
	}

	// Link these tags to the project.
	err := db.Model(project).Association("Tags").Append(tagModels)
	if err != nil {
		slog.Error("Failed to append tags to project association", "error", err)
		return err
	}

	return nil
}
