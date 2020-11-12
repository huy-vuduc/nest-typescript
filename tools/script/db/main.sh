#!/bin/bash
set -e

echo "=> Hello, how can I help you?"
echo "1. Create local database container."
echo "2. Start local database container."
echo "3. Stop local database container."
echo "4. Delete local database container."
echo "5. Exit."
echo "=> Choose your command please..."

read command

case $command in
  "1")
    bash ./bin/create-db.sh
    ;;
  "2")
    bash ./bin/start-db.sh
    ;;
  "3")
    bash ./bin/stop-db.sh
    ;;
  "4")
    bash ./bin/delete-db.sh
    ;;
  "5")
    exit
    ;;
  *)
    echo "=> Sorry, command is invalid!"
    ;;
esac