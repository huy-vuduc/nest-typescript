# GC
## Setup
> Note: This setup still missing part for website server. We'll update later.
* Requirements
  * Docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
  * NodeJS (v12.18.x)  [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
  * NPM (v6.14.x)

* Run database on Docker for development
  * Run shell script [tools/script/db/main.sh]
  > 
  > If error `dial unix /var/run/docker.sock: connect: permission denied`, please use `sudo` when excute.

* Install dependencies: `npm install`
* Run for development
  * Start API server: `npm run --prefix api start:dev`
  * Start Dashboard: `npm  run --prefix dashboard start:dev`
  * Start API server + Dashboard: `npm run start-all:dev`

* Run for production
  * Start API server: `npm run --prefix api start:prod`
  * Start Dashboard: `npm  run --prefix dashboard start:prod`
  * Start API server + Dashboard: `npm run start-all:prod`

* Lint check: `npm run lint`