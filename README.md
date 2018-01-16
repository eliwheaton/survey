# Survey Code Challenge

This is a survey app built with node, express, and sequelize.

## Requirements

* [NodeJs](https://nodejs.org) >= 8.2.1
* [Redis](https://redis.io/) >= 2.8.5
* [MySQL](https://www.mysql.com/)

## Install Redis

This app uses Redis to store sessions.

```sh
$ brew install redis
```

Start the redis server

```sh
$ redis-server
```

## Install

```sh
$ git clone git://github.com/eliwheaton/survey.git
$ npm install
```

## MySQL Database

You will need to create a database named 'surveydb' and a user named 'sumouser' with password 'sumopassword'.

To run the app:

```sh
$ npm run dev
```

Then visit [http://localhost:3000/](http://localhost:3000/)