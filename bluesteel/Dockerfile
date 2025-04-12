# Use Go built on Alpine.
FROM golang:1.18-alpine

# Make a new working directory and copy files into this directory.
WORKDIR /app
COPY go.mod go.sum ./

# Install dependencies and copy them into the working directory.
RUN go mod download
COPY . .

# Build the project.
RUN go build -o /app/main /app/main.go
EXPOSE 8080

# Set the environment variable to release mode for production.
ENV GIN_MODE=release
CMD ["./main"]