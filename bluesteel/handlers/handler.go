package handlers

import (
	"github.com/RRickyH/HernandezReno/bluesteel/services/personservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/projectservice"
	"github.com/RRickyH/HernandezReno/bluesteel/services/siteservice"
)

type Handler struct {
	ProjectService projectservice.Service
	PersonService  personservice.Service
	SiteService    siteservice.Service
}

func New(projectService projectservice.Service, personService personservice.Service, siteService siteservice.Service) Handler {
	return Handler{projectService, personService, siteService}
}
