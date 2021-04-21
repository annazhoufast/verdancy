export MYSQL_ROOT_PASSWORD="password"
export MYSQL_DATABASE=verdancydb
export TLSCERT=/etc/letsencrypt/live/verdancy​.capstone.ischool.uw.edu/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/verdancy​.capstone.ischool.uw.edu/privkey.pem
export PLANTADDR="http://plants:5000"
export SUMMARYADDR="summary:5100"
export REDISADDR=myredis:6379
export SESSIONKEY="key"

# docker rm -f helloservertest;


# docker network create verdancynet;

# docker run -d --name myredis --network verdancynet redis;
# docker run --name myredis -d redis;

# docker rm -f verdancy_db;

# docker pull annaqzhou/verdancydb;
# docker run -d \
# -p 3306:3306 \
# --name verdancy_db \
# --network verdancynet \
# -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
# -e MYSQL_DATABASE=$MYSQL_DATABASE \
# annaqzhou/verdancydb;

docker rm -f gateway;
docker pull annaqzhou/gateway;

docker run -d -p 443:443 \
-v /etc/letsencrypt:/etc/letsencrypt:ro \
-e TLSCERT=$TLSCERT \
-e TLSKEY=$TLSKEY \
-e SESSIONKEY=$SESSIONKEY \
-e REDISADDR=$REDISADDR \
-e DSN=root:$MYSQL_ROOT_PASSWORD@tcp\(verdancy_db:3306\)/$MYSQL_DATABASE \
-e PLANTADDR=$PLANTADDR \
-e SUMMARYADDR=$SUMMARYADDR \
--network verdancynet \
--name gateway annaqzhou/gateway;