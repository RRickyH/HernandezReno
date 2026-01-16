# Build the bluesteel binary.
FROM golang:1.24 AS builder

# Make a new working directory and copy files into this directory.
WORKDIR /app
COPY go.mod go.sum ./

# Install dependencies and copy them into the working directory.
RUN go mod download
COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main ./cmd/main.go

# Copy the binary and run bluesteel.
FROM alpine:latest
ENV GIN_MODE=release

# Add CA certificates to the image.
RUN apk add --no-cache ca-certificates

# Add a user and group for the bluesteel service.
RUN addgroup -g 1001 -S bluesteel && \
adduser -G bluesteel --shell /bin/false --disabled-password -H -u 1001 bluesteel

WORKDIR /app
COPY --from=builder /app/main ./main
RUN chown bluesteel:bluesteel ./main

EXPOSE 8080

USER bluesteel
CMD ["./main"]