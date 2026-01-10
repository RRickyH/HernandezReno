package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"regexp"
)

var filenameRegexp = regexp.MustCompile(`[^a-zA-Z0-9.-]`)

func (h *Handler) GetPresignedURL(c *gin.Context) {
	filename := c.Query("filename")
	if filename == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "a filename is required"})
		return
	}
	projectID := c.Query("projectID")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "you must provide a project ID for the corresponding image"})
		return
	}
	contentType := c.Query("contentType")
	if contentType == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "a content type must be provided"})
		return
	}
	objectKey := fmt.Sprintf("projects/%v/%v-%v", projectID, uuid.New(), filenameRegexp.ReplaceAllString(filename, "_"))
	URL, err := h.UploadService.GetUploadURL(c.Request.Context(), objectKey, contentType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to get a presigned url"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"url": URL, "objectKey": objectKey})
}
