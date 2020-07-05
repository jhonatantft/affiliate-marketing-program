
[![Build Status](https://travis-ci.org/jhonatantft/affiliate-marketing-program.svg?branch=master)](https://travis-ci.org/jhonatantft/affiliate-marketing-program)
[![Dependencies](https://img.shields.io/david/jhonatantft/affiliate-marketing-program.svg?style=flat)](https://david-dm.org/jhonatantft/affiliate-marketing-program)


# Affiliate Marketing Program

This is a initial application of an Affiliate Marketing Program to help content creators, publishers and bloggers monetize their traffic.
You can signup, create an product, delete it and add comments.

Table of contents:

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Install](#install)
- [Tests](#tests)
- [Docker](#docker)
- [License](#license)

<!-- /TOC -->

## Install

```sh
git clone git://github.com/jhonatantft/affiliate-marketing-program.git
npm install
cp .env.example .env
npm start
```

Then visit [http://localhost:3000/](http://localhost:3000/)

**NOTE:** Do not forget to set the twitter, google, linkedin and github `CLIENT_ID`s and `SECRET`s. In `development` env, you can set the env variables in `.env` and replace the values there. In `production` env, it is not safe to keep the ids and secrets in a file, so you need to set it up via commandline. If you are using heroku checkout how environment variables are set [here](https://devcenter.heroku.com/articles/config-vars).

## Tests

```sh
npm test
```

## Docker

You can also use docker for development. Make sure you run npm install on your host machine so that code linting and everything works fine.

```sh
npm i
cp .env.example .env
```

Start the services

```sh
docker-compose up -d
```

View the logs

```sh
docker-compose logs -f
```

In case you install a npm module while developing, it should also be installed within docker container, to do this first install the module you want with simple `npm i module name`, then run it within docker container

```sh
docker-compose exec node npm i
```

If you make any changes to the file, nodemon should automatically pick up and restart within docker (you can see this in the logs)

To run tests

```sh
docker-compose exec -e MONGODB_URL=mongodb://mongo:27017/noobjs_test node npm test
```

Note that we are overriding the environment variable set in `.env` file because we don't want our data erased by the tests.

Note: The difference between exec and run is that, exec executes the command within the running container and run will spin up a new container to run that command. So if you want to run only the tests without docker-compose up, you may do so by running `docker-compose run -e MONGODB_URL=mongodb://mongo:27017/noobjs_test node npm test`

## License

MIT
