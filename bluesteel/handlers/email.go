package handlers

import (
	"fmt"
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/RRickyH/HernandezReno/bluesteel/services"
	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
	"log/slog"
	"net/http"
)

func (h *Handler) SendEmail(c *gin.Context) {
	var contactDTO models.ContactDTO
	if err := c.ShouldBindJSON(&contactDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Status": "Email was missing fields"})
		return
	}
	slog.Info("received email request", "request", contactDTO)
	message := fmt.Sprintf("<b>Name: </b> %v<br><b>Email: </b> %v<br><b>Phone: </b> %v<br><br><b>Message: </b> %v", contactDTO.Name, contactDTO.Email, contactDTO.Phone, contactDTO.Message)

	m := gomail.NewMessage()
	m.SetHeader("From", services.Config.SenderEmail)
	m.SetHeader("To", services.Config.DestinationEmail)
	m.SetHeader("Subject", contactDTO.Subject)
	m.SetBody("text/html", message)

	d := gomail.NewDialer(services.Config.SMTP_Host, services.Config.SMTP_Port, services.Config.SenderEmail, services.Config.EmailPassword)

	if err := d.DialAndSend(m); err != nil {
		slog.Error("failed to send email!", "error", err)
		c.JSON(http.StatusInternalServerError, "Unable to send email")
	}

	// Email send success.
	slog.Info("successfully sent email", "message", contactDTO)
	c.Status(http.StatusOK)
}
