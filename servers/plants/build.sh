GOOS=linux go build
docker build -t annaqzhou/plants .
go clean

docker push annaqzhou/plants

ssh annaz4@verdancy.capstone.ischool.uw.edu < deploy.sh