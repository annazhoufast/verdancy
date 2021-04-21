export MYSQL_ROOT_PASSWORD="password"
export MYSQL_DATABASE=verdancydb
export ADDR="plants:5000"


docker rm -f plants

docker pull annaqzhou/plants

docker run -d --network verdancynet \
-e ADDR=$ADDR \
-e DSN=root:$MYSQL_ROOT_PASSWORD@tcp\(verdancy_db:3306\)/$MYSQL_DATABASE \
--name plants annaqzhou/plants;

exit