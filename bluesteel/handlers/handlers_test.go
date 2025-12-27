package handlers

import (
	"github.com/RRickyH/HernandezReno/bluesteel/models"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"net/http"
	"net/http/httptest"
	"testing"
)

// -----------------------------------------------------------------------
//                                  Mocks
// -----------------------------------------------------------------------

type MockProjectService struct {
	mock.Mock
}

func (m *MockProjectService) GetAll() ([]models.ProjectDTO, error) {
	args := m.Called()
	return args.Get(0).([]models.ProjectDTO), args.Error(1)
}

func (m *MockProjectService) Add(projectDTO *models.ProjectDTO) (models.ProjectID, error) {
	args := m.Called()
	return args.Get(0).(models.ProjectID), args.Error(1)
}

func (m *MockProjectService) Delete(models.ProjectID) error {
	args := m.Called()
	return args.Error(0)
}

func (m *MockProjectService) Update(id models.ProjectID, projectDTO *models.ProjectDTO) error {
	args := m.Called()
	return args.Error(0)
}

// -----------------------------------------------------------------------
//                              List Projects
// -----------------------------------------------------------------------

// Happy Path
func TestListProjects(t *testing.T) {
	gin.SetMode(gin.TestMode)
	testProjectService := new(MockProjectService)
	handler := NewHandler(testProjectService)
	r := gin.New()
	api := r.Group("/api")
	api.GET("/projects", handler.ListProjects)

	testProjectService.On("GetAll").Return([]models.ProjectDTO{
		{Title: "super testing project"},
	}, nil)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/projects", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	testProjectService.AssertExpectations(t)
}

// Empty State

// Database Failure

// -----------------------------------------------------------------------
//                              Add Projects
// -----------------------------------------------------------------------

// Happy Path
//func TestAddProject(t *testing.T) {
//
//}

// Validation Error

// Failing to add project

// -----------------------------------------------------------------------
//                              Delete Projects
// -----------------------------------------------------------------------

// Happy Path

// Invalid ID

// Project not found

// -----------------------------------------------------------------------
//                              Update Projects
// -----------------------------------------------------------------------

// Happy Path

// Bad JSON
