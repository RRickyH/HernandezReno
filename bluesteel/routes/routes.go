package routes

import (
	"github.com/RRickyH/HernandezReno/bluesteel/handlers"
	"github.com/RRickyH/HernandezReno/bluesteel/middleware"
	"github.com/RRickyH/HernandezReno/bluesteel/services/personservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/projectservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/siteservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/uploadservice"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	handler := handlers.New(projectservice.NewGormService(db), personservice.NewGormService(db), siteservice.NewGormService(db), uploadservice.NewS3Service())
	api := r.Group("/")

	// Project Endpoints.
	api.GET("/projects", handler.ListProjects)
	api.GET("/projects/:id/images", handler.GetProjectImages)
	api.GET("/tags", handler.GetTags)

	// Site Setting Endpoints.
	api.GET("/settings", handler.GetSiteSettings)

	// Person Endpoints.
	api.GET("/person", handler.GetAllPeople)
	api.GET("/person/:id", handler.GetPerson)

	// Login Endpoints.
	api.POST("/login", handler.Login)

	api.POST("/uploader", handler.GetPresignedURL)

	// Protected Endpoints.
	protected := api.Group("/")
	protected.Use(middleware.AuthRequired)
	{
		protected.POST("/projects", handler.AddProject)
		protected.DELETE("/projects/:id", handler.DeleteProject)
		protected.PATCH("/projects/:id", handler.UpdateProject)

		protected.PUT("/settings", handler.UpdateSiteSettings)

		protected.POST("/person", handler.AddPerson)
		protected.PATCH("/person/:id", handler.UpdatePerson)
		protected.DELETE("/person/:id", handler.DeletePerson)

		protected.GET("/check", handler.CheckToken)
	}
}
