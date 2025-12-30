package routes

import (
	"github.com/RRickyH/HernandezReno/bluesteel/handlers"
	"github.com/RRickyH/HernandezReno/bluesteel/services/personservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/projectservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/siteservice"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	handler := handlers.New(projectservice.NewGormService(db), personservice.NewGormService(db), siteservice.NewGormService(db))
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

	// Person Endpoints
	api.GET("/person", handler.GetAllPeople)
	api.GET("/person/:id", handler.GetPerson)
	api.POST("/person", handler.AddPerson)
	api.PUT("/person/:id", handler.UpdatePerson)
	api.DELETE("/person/:id", handler.DeletePerson)
}
