# Secure ExpressJS ES6 APIs

[![Known Vulnerabilities](https://snyk.io/test/github/wwicaksono/apis/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wwicaksono/apis?targetFile=package.json)

<!-- omit in toc -->

# Requirement:
- Nodejs v8.11.2
- npm v5.6.0
- Postgresql v10.4
- sequlize-cli v4.0.0

# How to run:
```shell
$ npm install

$ npm install sequlize-cli --g

$ sequelize db:migrate

$ sequelize db:seed:all

$ npm start
```

# Available routes
This project will run on localhost:7000 (server/server.js).

So, available routes are:
- **GET** localhost:7000/v1/apis/users/ (GET list of users) (JWT authenticated)
- **PUT** localhost:7000/v1/apis/users/ (PUT new user)
- **POST** localhost:7000/v1/apis/users/ (Validate registered user)
