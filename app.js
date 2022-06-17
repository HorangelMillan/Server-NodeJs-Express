const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const port = 4000;

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'business',
    username: 'postgres',
    password: '93532Dx.',
});

db.authenticate()
    .then(() => console.log('--- database authenticated'))
    .catch(err => console.log(err));

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

db.sync()
    .then(() => console.log('--- datbases model synced'))
    .catch(err => console.log(err));

const app = express();

// middlewares
app.use(express.json());

// get all registrations
app.get('/', async (req, res) => {

    try {

        const registrations = await Registrations.findAll()

        res.status(200).json({
            status: 200,
            registrations
        });

    } catch (err) {

        console.log(err);

    }

});

// get one registration
app.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const registration = await Registrations.findOne({
            where: {
                id
            }
        });

        if (registration) {
            res.status(200).json({
                status: 'success',
                registration
            });
        } else if (registration === null) {
            res.status(404).json({
                status: 'Not found',
                registration
            });
        };

    } catch (err) {

        console.log(err);

    }

});

// create a enter registration
app.post('/', async (req, res) => {

    try {

        const registration = await Registrations.create({
            entranceTime: Date.now(),
            status: 'working'
        });

        res.status(200).json({
            status: 'success',
            registration
        });

    } catch (err) {

        console.log(err)

    }

});

// update to a exit registration
app.patch('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const exit = await Registrations.update({
            exitTime: Date.now(),
            status: 'out'
        }, {
            where: {
                id
            }
        });

        if (exit['0'] === 1) {
            res.status(200).json({
                status: 'success',
                exit
            });
        } else if (exit['0'] === 0) {
            res.status(404).json({
                status: 'Not found',
                exit
            });
        };

    } catch (err) {

        console.log(err);

    }

});

// cancel a exit registration
app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        
        const cancel = await Registrations.update({
            status: 'cancelled'
        }, {
            where: {
                id
            }
        });

        if (cancel['0'] === 1) {
            res.status(200).json({
                status: 'success',
                cancel
            });
        } else if (cancel['0'] === 0) {
            res.status(404).json({
                status: 'Not found',
                cancel
            });
        };

    } catch (err) {
        console.log(err)
    }
});

app.listen(port, () => {
    console.log('--- server running on port: ' + port);
});

