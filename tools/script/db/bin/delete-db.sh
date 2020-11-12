#!/bin/bash
set -e

source ./config.conf

bash ./bin/stop-db.sh

echo "=> Delete container $CONTAINER_NAME"
docker rm $CONTAINER_NAME
echo "=> Done"