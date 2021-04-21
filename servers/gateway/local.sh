GOOS=linux go build;
docker build -t annaqzhou/gateway .;

docker push annaqzhou/gateway;

docker pull annaqzhou/gateway;

docker rm -f gateway;

docker run -d -p 80:80 \
-e TLSCERT=$TLSCERT \
-e TLSKEY=$TLSKEY \
-e SESSIONKEY=$SESSIONKEY \
-e REDISADDR=$REDISADDR \
-e DSN=root:$MYSQL_ROOT_PASSWORD@tcp\(verdancydb:3306\)/$MYSQL_DATABASE \
-e PLANTADDR=$PLANTADDR \
--network test \
--name gateway annaqzhou/gateway;