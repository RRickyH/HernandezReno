package uploadservice

import (
	"context"
	"fmt"
	"github.com/RRickyH/HernandezReno/bluesteel/services"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"log/slog"
	"os"
	"time"
)

var PresignExpiryMinutes int64 = 15

func NewS3Service() Service {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		slog.Error("Unable to load S3 configs", "error", err)
		os.Exit(1)
	}
	client := s3.NewFromConfig(cfg)
	presignClient := s3.NewPresignClient(client)
	return S3Service{Client: client, PresignClient: presignClient}
}

type S3Service struct {
	Client        *s3.Client
	PresignClient *s3.PresignClient
}

func (s S3Service) GetUploadURL(ctx context.Context, objectKey string, contentType string) (string, error) {
	request, err := s.PresignClient.PresignPutObject(
		ctx,
		&s3.PutObjectInput{
			Bucket:      aws.String(services.Config.S3Bucket),
			Key:         aws.String(objectKey),
			ContentType: aws.String(contentType),
		}, func(options *s3.PresignOptions) {
			options.Expires = time.Duration(PresignExpiryMinutes) * time.Minute
		})
	if err != nil {
		slog.Error("couldn't get a presigned request to upload the image", "error", err.Error())
		return "", err
	}
	return request.URL, nil
}

func GetFullURL(objectKey string) string {
	return fmt.Sprintf("https://%v.s3.%v.amazonaws.com/%v", services.Config.S3Bucket, services.Config.AWSRegion, objectKey)
}
