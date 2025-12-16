package main

import (
	"github.com/RRickyH/HernandezReno/bluesteel/database"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/routes"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
)

func main() {

	db, err := database.Init()
	if err != nil {
		slog.Error("error initializing database: ", err)
		panic(err)
	}
	slog.Info("successfully connected to the database")

	slog.Info("applying migrations")
	err = db.AutoMigrate(
		&models.Project{},
		&models.Image{},
		&models.Tag{},
	)
	if err != nil {
		slog.Error("error running migrations: ", err)
		panic(err)
	}

	router := gin.Default()
	routes.RegisterRoutes(router, db)
	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "poop",
		})
	})
	router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
