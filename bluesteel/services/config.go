package services

import (
	"fmt"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/joho/godotenv"
	"log/slog"
	"os"
)

var Config Configurations

type Configurations struct {
	JWTSecretKey string
	DBHost       string
	DBUser       string
	DBPassword   string
	DBName       string
	DBPort       string
	DBSSLMode    string
	SiteSettings *models.SiteSettingsDTO
}

func LoadConfig(config *Configurations) {
	// Load environment variables
	err := godotenv.Load(".env")
	if err != nil {
		slog.Info("env file not found, using system environment variables")
	}

	// Load JWT secret key.
	config.JWTSecretKey = LoadFromEnv("JWT_SECRET_KEY")

	// Get database connection variables
	config.DBHost = LoadFromEnv("DB_HOST")
	config.DBUser = LoadFromEnv("DB_USER")
	config.DBPassword = LoadFromEnv("DB_PASSWORD")
	config.DBName = LoadFromEnv("DB_NAME")
	config.DBPort = LoadFromEnv("DB_PORT")
	config.DBSSLMode = LoadFromEnv("DB_SSLMODE")
}

func LoadFromEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		slog.Error("missing environment variable", "key", key)
		panic(fmt.Sprintf("missing environment variable: %v", key))
	}
	return val
}
