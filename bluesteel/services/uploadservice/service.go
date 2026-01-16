package uploadservice

import "context"

type Service interface {
	GetUploadURL(ctx context.Context, objectKey string, contentType string) (string, error)
}
