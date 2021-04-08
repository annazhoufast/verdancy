docker rm -f helloservertest

docker pull annaqzhou/gateway

docker run \
    -d \
    -e ADDR=:4000 \
    -p 4000:4000 \
    --name helloservertest \
    annaqzhou/gateway

exit