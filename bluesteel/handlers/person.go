package handlers

import (
	"errors"
	"fmt"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/services/personservice"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
	"strconv"
)

// TODO
func (h *Handler) GetAllPeople(c *gin.Context) {
	peopleDTO, err := h.PersonService.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, peopleDTO)
}

// TODO
func (h *Handler) GetPerson(c *gin.Context) {
	personIDStr := c.Param("id")
	personIDInt, err := strconv.Atoi(personIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Invalid ProjectID provided"})
		return
	}
	personDTO, err := h.PersonService.Get(models.PersonID(personIDInt))
	if err != nil {
		if errors.Is(err, personservice.ErrPersonNotFound) {
			c.Status(http.StatusNotFound)
			return
		}
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, personDTO)
}

// TODO
func (h *Handler) AddPerson(c *gin.Context) {
	// Bind the person to a DTO struct.
	var person models.PersonDTO
	if err := c.ShouldBindJSON(&person); err != nil {
		slog.Error("Failed to bind JSON Body", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, err := h.PersonService.Add(&person)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "an unknown error occurred"})
		return
	}

	personURL := fmt.Sprintf("/api/projects/%d", id)
	c.Header("Location", personURL)
	c.JSON(http.StatusCreated, gin.H{"status": "Added Person", "id": id})
}

// TODO
func (h *Handler) UpdatePerson(c *gin.Context) {
	var person models.PersonDTO
	if err := c.ShouldBindJSON(&person); err != nil {
		slog.Error("Failed to bind JSON Body", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Get and convert the project id.
	personIDstr := c.Param("id")
	personIDint, err := strconv.Atoi(personIDstr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Invalid PersonID provided"})
		return
	}
	personID := models.PersonID(personIDint)

	err = h.PersonService.Update(personID, &person)
	if err != nil {
		if errors.Is(err, personservice.ErrPersonNotFound) {
			c.Status(http.StatusNotFound)
			return
		}
		c.Status(http.StatusBadRequest)
		return
	}

	c.Status(http.StatusNoContent)
}

// TODO
func (h *Handler) DeletePerson(c *gin.Context) {
	// Get and convert the project id.
	personIDstr := c.Param("id")
	personIDint, err := strconv.Atoi(personIDstr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Invalid PersonID provided"})
		return
	}
	personID := models.PersonID(personIDint)

	// Delete the project from the service.
	err = h.PersonService.Delete(personID)
	if err != nil {
		if errors.Is(err, personservice.ErrPersonNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "person not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error deleting person": err.Error()})
		}
		return
	}

	// Deleted Successfully
	c.Status(http.StatusNoContent)
}
