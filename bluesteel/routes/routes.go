package routes

import (
	"github.com/RRickyH/HernandezReno/bluesteel/handlers"
	"github.com/RRickyH/HernandezReno/bluesteel/services/projectservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/siteservice"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	handler := handlers.New(projectservice.NewGormService(db), siteservice.NewGormService(db))
	api := r.Group("/api")

	// Project Endpoints
	api.GET("/projects", handler.ListProjects)
	api.POST("/projects", handler.AddProject)
	api.DELETE("/projects/:id", handler.DeleteProject)
	api.PUT("/projects/:id", handler.UpdateProject)
	api.GET("/projects/:id/images", handler.GetProjectImages)

	// Site Setting Endpoints
	api.GET("/settings", handler.GetSiteSettings)
	api.PUT("/settings", handler.UpdateSiteSettings)

	// TODO Person Endpoints
}
