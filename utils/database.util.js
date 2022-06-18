const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'business',
    username: 'postgres',
    password: '93532Dx.',
});

module.exports = { db, DataTypes };