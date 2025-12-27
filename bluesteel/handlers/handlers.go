package handlers

import (
	"errors"
	"fmt"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/services/projectservice"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
	"strconv"
)

type Handler struct {
	ProjectService projectservice.Service
}

func NewHandler(service projectservice.Service) Handler {
	return Handler{service}
}

func (h *Handler) ListProjects(c *gin.Context) {
	slog.Info("Listing projects")
	projects, err := h.ProjectService.GetAll()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, projects)
}

func (h *Handler) AddProject(c *gin.Context) {
	// Bind the project to a DTO struct.
	var project models.ProjectDTO
	if err := c.ShouldBindJSON(&project); err != nil {
		slog.Error("Failed to bind JSON Body", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, err := h.ProjectService.Add(&project)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "an unknown error occurred"})
		return
	}

	projectURL := fmt.Sprintf("/api/projects/%d", id)
	c.Header("Location", projectURL)
	c.JSON(http.StatusCreated, gin.H{"status": "Added Project", "id": id})
}

func (h *Handler) DeleteProject(c *gin.Context) {
	// Get and convert the project id.
	projectIDstr := c.Param("id")
	projectIDint, err := strconv.Atoi(projectIDstr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Invalid ProjectID provided"})
		return
	}
	projectID := models.ProjectID(projectIDint)

	// Delete the project from the service.
	err = h.ProjectService.Delete(projectID)
	if err != nil {
		if errors.Is(err, projectservice.ErrProjectNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "project not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error deleting project": err.Error()})
		}
		return
	}

	// Deleted Successfully
	c.Status(http.StatusNoContent)
}

func (h *Handler) UpdateProject(c *gin.Context) {
	var project models.ProjectDTO
	if err := c.ShouldBindJSON(&project); err != nil {
		slog.Error("Failed to bind JSON Body", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Get and convert the project id.
	projectIDstr := c.Param("id")
	projectIDint, err := strconv.Atoi(projectIDstr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Invalid ProjectID provided"})
		return
	}
	projectID := models.ProjectID(projectIDint)

	err = h.ProjectService.Update(projectID, &project)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	c.Status(http.StatusNoContent)
}
