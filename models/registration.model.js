const { db, DataTypes } = require('../utils/database.util')

const Registrations = db.define('registrations', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    entranceTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    exitTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'working'
    }
});

module.exports = { Registrations };