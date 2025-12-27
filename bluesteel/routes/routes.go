package routes

import (
	"github.com/RRickyH/HernandezReno/bluesteel/handlers"
	"github.com/RRickyH/HernandezReno/bluesteel/services/projectservice"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	handler := handlers.NewHandler(projectservice.NewGormService(db))
	api := r.Group("/api")
	api.GET("/projects", handler.ListProjects)
	api.POST("/projects", handler.AddProject)
	api.DELETE("/projects/:id", handler.DeleteProject)
	api.PUT("/projects/:id", handler.UpdateProject)
}
