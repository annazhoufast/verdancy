EXPORT MYSQL_ROOT_PASSWORD="password"
EXPORT MYSQL_DATABASE=serverdb


docker rm -f helloservertest


docker network create verdancynet

docker run -d --name myredis --network verdancynet redis;
docker run --name myredis -d redis;


docker pull annaqzhou/verdancydb;
docker run -d \
-p 3306:3306 \
--name verdancydb \
--network verdancynet \
-e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
-e MYSQL_DATABASE=$MYSQL_DATABASE \
annaqzhou/mysql;



docker pull annaqzhou/gateway;

# docker run \
#     -d \
#     -e ADDR=:4000 \
#     -p 4000:4000 \
#     --name helloservertest \
#     annaqzhou/gateway

docker run -d -p 443:443 \
-v /etc/letsencrypt:/etc/letsencrypt:ro \
-e TLSCERT=$TLSCERT \ 
-e TLSKEY=$TLSKEY \
-e SESSIONKEY=$SESSIONKEY \
-e REDISADDR=$REDISADDR \
-e DSN=root:$MYSQL_ROOT_PASSWORD@tcp\(mysqldb:3306\)/$MYSQL_DATABASE \
-e PLANTADDR=$PLANTADDR \
--network verdancynet \
--name gateway annaqzhou/gateway;

exit