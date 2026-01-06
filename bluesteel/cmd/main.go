package main

import (
	"github.com/RRickyH/HernandezReno/bluesteel/database"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/routes"
	"github.com/RRickyH/HernandezReno/bluesteel/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"log/slog"
	"os"
	"time"
)

var MaxRetries = 5

func main() {
	services.LoadConfig(&services.Config)

	// Connect to the database
	var db *gorm.DB
	var err error
	for i := 1; i <= MaxRetries; i++ {
		db, err = database.Init()
		if err == nil {
			slog.Info("successfully connected to the database")
			break
		}
		if i == MaxRetries {
			slog.Error("max tries exceeded for connecting to the database!", err)
			os.Exit(1)
		}
		slog.Error("failed to connect to database, trying again...", "attempt", i)
		time.Sleep(5 * time.Second)
		continue
	}

	slog.Info("applying migrations")
	err = db.AutoMigrate(
		&models.Project{},
		&models.Image{},
		&models.Tag{},
		&models.SiteSettings{},
		&models.Person{},
		&models.Admin{},
	)
	if err != nil {
		slog.Error("error running migrations: ", err)
		os.Exit(1)
	}
	// Add a default admin user if one does not exist.
	models.EnsureAdmin(db)

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	// Set CORS settings.
	{
		// Enable local development if a local URL is provided.
		var AllowOrigins []string
		if services.Config.LocalURL != "" {
			AllowOrigins = []string{
				services.Config.BaseURL,
				services.Config.BaseURLSubdomain,
				services.Config.LocalURL,
			}
		} else {
			AllowOrigins = []string{
				services.Config.BaseURL,
				services.Config.BaseURLSubdomain,
			}
		}
		config := cors.DefaultConfig()
		config.AllowOrigins = AllowOrigins
		config.AllowMethods = []string{"GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"}
		config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
		router.Use(cors.New(config))
	}

	routes.RegisterRoutes(router, db)
	router.SetTrustedProxies(nil)
	err = router.Run()
	if err != nil {
		slog.Error("api crashed", "error", err)
	}
}
