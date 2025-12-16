package database

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log/slog"
	"os"
)

func Init() (*gorm.DB, error) {
	err := godotenv.Load(".env")

	if err != nil {
		slog.Info("ENV file not found; defaulting to environment variables")
	} else {
		slog.Info("ENV file found; using development environment")
	}

	// Get database connection variables
	DBHost := os.Getenv("DB_HOST")
	DBUser := os.Getenv("DB_USER")
	DBPassword := os.Getenv("DB_PASSWORD")
	DBName := os.Getenv("DB_NAME")
	DBPort := os.Getenv("DB_PORT")
	DBSSLMode := os.Getenv("DB_SSLMODE")

	if DBHost == "" || DBUser == "" || DBPassword == "" || DBName == "" || DBPort == "" || DBSSLMode == "" {
		var missing []string
		if DBHost == "" {
			missing = append(missing, "DBHost")
		}
		if DBUser == "" {
			missing = append(missing, "DBUser")
		}
		if DBPassword == "" {
			missing = append(missing, "DBPassword")
		}
		if DBName == "" {
			missing = append(missing, "DBName")
		}
		if DBPort == "" {
			missing = append(missing, "DBPort")
		}
		if DBSSLMode == "" {
			missing = append(missing, "DBSSLMode")
		}
		return nil, fmt.Errorf("missing required environment variables: %v", missing)
	}

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=UTC",
		DBHost, DBUser, DBPassword, DBName, DBPort, DBSSLMode,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()

	if err != nil {
		return nil, fmt.Errorf("failed to get sql db: %w", err)
	}

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// db.AutoMigrate()
	return db, nil
}
