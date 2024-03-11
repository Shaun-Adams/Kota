FROM golang:1.16.3-alpine3.13

# Create appuser.
RUN adduser -D -g '' appuser

WORKDIR /app

COPY . .

# Download and install the dependencies:
RUN go get -d -v ./...

# Build the go app
RUN go build -o api .

# Use an unprivileged user.
USER appuser

EXPOSE 8000


HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:8000/health" ]

CMD ["./api"]
