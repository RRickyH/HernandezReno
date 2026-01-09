package services

import (
	"log/slog"
	"os"
	"strings"

	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/joho/godotenv"
)

var Config Configurations

type Configurations struct {
	JWTSecretKey     string
	DBHost           string
	DBUser           string
	DBPassword       string
	DBName           string
	DBPort           string
	DBSSLMode        string
	S3Bucket         string
	AWSRegion        string
	BaseURL          string
	BaseURLSubdomain string
	LocalURL         string
	TrustedProxies   []string
	SiteSettings     *models.SiteSettingsDTO
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
	config.DBHost = LoadFromEnv("DATABASE_HOST")
	config.DBUser = LoadFromEnv("DATABASE_USER")
	config.DBPassword = LoadFromEnv("DATABASE_PASSWORD")
	config.DBName = LoadFromEnv("DATABASE_NAME")
	config.DBPort = LoadFromEnv("DATABASE_PORT")
	config.DBSSLMode = LoadFromEnv("DATABASE_SSLMODE")

	// Load AWS Bucket
	config.S3Bucket = LoadFromEnv("S3_BUCKET_NAME")
	config.AWSRegion = LoadFromEnv("AWS_REGION")

	// Load URLs
	config.BaseURL = LoadFromEnv("BASE_URL")
	config.BaseURLSubdomain = LoadFromEnv("BASE_URL_SUBDOMAIN")
	config.LocalURL = os.Getenv("LOCAL_URL") // Using Getenv so that this can be optional.

	// Load trusted proxies
	config.TrustedProxies = strings.Split(os.Getenv("TRUSTED_PROXIES"), ",")
}

func LoadFromEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		slog.Error("missing environment variable", "key", key)
		os.Exit(1)
	}
	return val
}
