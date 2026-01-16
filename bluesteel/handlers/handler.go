package handlers

import (
	"github.com/RRickyH/HernandezReno/bluesteel/services/personservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/projectservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/siteservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/uploadservice"
)

type Handler struct {
	ProjectService projectservice.Service
	PersonService  personservice.Service
	SiteService    siteservice.Service
	UploadService  uploadservice.Service
}

func New(projectService projectservice.Service, personService personservice.Service, siteService siteservice.Service, uploadService uploadservice.Service) Handler {
	return Handler{projectService, personService, siteService, uploadService}
}
