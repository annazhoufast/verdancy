FROM alpine
RUN apk add --no-cache ca-certificates
COPY hellosrv /hellosrv
EXPOSE 5100
ENTRYPOINT ["/hellosrv"]