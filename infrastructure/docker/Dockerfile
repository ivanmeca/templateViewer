FROM golang:latest as builder
RUN apt -y update && apt -y upgrade && apt -y install ca-certificates openssl
# Create appuser.
ENV USER=appuser
ENV UID=10001
# See https://stackoverflow.com/a/55757473/12429735RUN
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"
ARG cert_location=/usr/local/share/ca-certificates
# Get certificate from "github.com"
RUN openssl s_client -showcerts -connect github.com:443 </dev/null 2>/dev/null|openssl x509 -outform PEM > ${cert_location}/github.crt
# Get certificate from "proxy.golang.org"
RUN openssl s_client -showcerts -connect proxy.golang.org:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >  ${cert_location}/proxy.golang.crt
# Update certificates
RUN update-ca-certificates
ARG VERSION
COPY ./infrastructure/docker/templateServer /service
WORKDIR /service

FROM builder as linux_builder
RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s -X main.build=${VERSION}" -o /service/server ./...

FROM ubuntu
# Import the user and group files from the builder.
COPY --from=linux_builder /etc/passwd /etc/passwd
COPY --from=linux_builder /etc/group /etc/group
# Copy our static executable.
COPY --from=linux_builder /service/server /service/server
# Use an unprivileged user.
USER appuser:appuser
WORKDIR /service
ENTRYPOINT ["/service/server"]
EXPOSE 3030
