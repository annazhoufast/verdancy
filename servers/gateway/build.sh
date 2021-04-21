GOOS=linux go build
docker build -t annaqzhou/gateway .
go clean

# docker push annaqzhou/gateway < deploy.sh
docker push annaqzhou/gateway

ssh annaz4@verdancy.capstone.ischool.uw.edu < deploy.sh