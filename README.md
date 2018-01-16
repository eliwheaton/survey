# Survey Code Challenge

This is a survey app built with node, express, and sequelize.

## Requirements

* [NodeJs](https://nodejs.org) >= 8.2.1
* [Redis](https://redis.io/) >= 2.8.5
* [MySQL](https://www.mysql.com/)

## Setup Redis

This app uses Redis to store sessions.

```sh
$ brew install redis
```

Start the redis server

```sh
$ redis-server
```

## Setup MySQL Database

You will need to create a database named 'surveydb' and a user named 'sumouser' with password 'sumopassword'.

**Note:** If you want to use different credentials you will need to edit the .env file in the root folder.


## Install

```sh
$ git clone git://github.com/eliwheaton/survey.git
$ cd survey
$ npm install
```

To run the app:

```sh
$ npm run dev
```

## Create Admin User

Visit [http://localhost:3000/users/signup](http://localhost:3000/users/signup)

Enter any info for username and password.

## Create Survey Questions

Once logged in, click on 'Add Question' to create questions for the survey.

## View Survey Questions

To view survey questions click on 'SumoSurvey' in the nav bar or visit [http://localhost:3000/](http://localhost:3000/)

## Admin Login

If you logout and want to sign back in, visit: [http://localhost:3000/users/signin](http://localhost:3000/users/signin)

## Results Page

The results page is a work in progress...

## DEMO

To view a live demo of this app, visit: [https://sumo-survey.herokuapp.com/users/signin](https://sumo-survey.herokuapp.com/users/signin)

And login with:
username: hireeli
password: hireeli










