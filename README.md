# API REST TDD

I have created this repo to studie and pratice how to apply TDD metodology (test driven development), it was my fist time that I do something with TDD also my first time with ORM and sequelize so if I made some mistake forget me.

## Tech

To create this api was used:

* [Express](https://github.com/expressjs/express)
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [Sequelize](https://github.com/sequelize/sequelize)
* [Sqlite3](https://github.com/mapbox/node-sqlite3)
* [Dotenv](https://github.com/motdotla/dotenv)
* [Jest](https://github.com/facebook/jest)
* [Supertest](https://github.com/visionmedia/supertest)
* [Faker](https://github.com/marak/Faker.js/)
* [Factory-girl](https://github.com/stalniy/factory-girl)

## How to install

Clone this repo and enter it:

``` sh
$ git clone https://github.com/xdigu/api-rest-tdd
$ cd api-rest-tdd
```

Install dependencies to run api and tests:

``` sh
$ npm install
```

Or if you prefer yarn:

``` sh
$ yarn install
```

## How to run tests

Tests was created with [Jest](https://github.com/facebook/jest), every test is insite folder `__tests__` so if you want to see tests go to this folder.

All tests run with a sqlite database, it's configured in `.env.test` file if you want to run in another environment you can set there.

To run test first is executed a pre script that create database in sqlite with the migrations that is insite `src/dabase/migrations` and after all tests is run a post script that undo all migrations.

To run all tests just run:

``` sh
$ npm run test
```

or

``` sh
$ yarn test
```

If you are using windows I sugest to install [win-node-env](https://github.com/laggingreflex/win-node-env) to load dotEnv archives.

## Runing API

Fist you need to configure `.env` file with you database config.

To run api:

``` sh
$ npm run start
```

or

``` sh
$ yarn start
```
