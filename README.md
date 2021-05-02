## Description

Auror May is a codename for a simple CRUD RESTful API using [Nest](https://github.com/nestjs/nest) framework

## Documentation (Live)
[Swagger doc](https://auroramay.herokuapp.com/) on Heroku

## Installation

```bash
# clone the repo
$ git clone https://github.com/emmanuelnwankwo/auroramay && cd auroramay

# install dependencies
$ npm install
```

## Running the app

```bash
# create env file, enter PORT and Mongodb connection string
$ touch .env && cp env.example .env

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


