package models

import (
	"errors"
	"gorm.io/gorm"
	"log/slog"
	"os"
)

type Admin struct {
	gorm.Model
	UserName string `gorm:"size:64;index"`
	Password string `gorm:"size:72"`
}

// EnsureAdmin checks the database and adds a new admin user if one does not exist.
func EnsureAdmin(db *gorm.DB) {
	var admin Admin
	result := db.First(&admin)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			slog.Info("admin user not found; creating an admin...")
			userName, nameExists := os.LookupEnv("ADMIN_USERNAME")
			if !nameExists {
				slog.Error("no username provided for the default admin!")
				return
			}
			password, passwordExists := os.LookupEnv("ADMIN_PASSWORD")
			if !passwordExists {
				slog.Error("no password provided for the default admin!")
				return
			}
			admin = Admin{UserName: userName, Password: password}
			result := db.Save(&admin)
			if result.Error != nil {
				slog.Error("unable to save a default admin!", "error", result.Error.Error())
				return
			}
			slog.Info("successfully created a new admin user", "username", userName)
			return
		}
		slog.Error("an unknown error occurred while fetching the admin user", "error", result.Error.Error())
	} else {
		slog.Info("admin user already exists", "username", admin.UserName)
	}
}
