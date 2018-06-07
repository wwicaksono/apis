const dotenv = require('dotenv').config();
const path = require('path');

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "migrationStorage": "json",
        "seederStorage": "json",
        "migrationStoragePath": path.resolve("server/migrations", "sequelize-meta.json"),
        "seederStoragePath": path.resolve("server/seeders", "sequelize-data.json")
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "postgres"
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "postgres"
    }
};