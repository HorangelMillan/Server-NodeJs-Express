const { Registrations } = require('../models/registration.model');

// get all registrations
const getAllRegistrations = async (req, res) => {
    try {

        const registrations = await Registrations.findAll()

        res.status(200).json({
            status: 'success',
            registrations
        });

    } catch (err) {

        console.log(err);

    }
};

// get one registration
const getRegistration = async (req, res) => {
    const { id } = req.params;

    const registration = await Registrations.findOne({
        where: {
            id
        }
    });

    if (!registration) {
        return res.status(400).json({
            status: 'error',
            message: 'registration not found'
        });
    };

    res.status(200).json({
        status: 'success',
        registration
    });
};

// create a enter registration
const createRegistration = async (req, res) => {

    try {
        const registration = await Registrations.create({
            entranceTime: Date.now()
        });

        res.status(200).json({
            status: 'success',
            registration
        });
    } catch (err) {
        console.log(err)
    }
};

// update to a exit registration
const exitRegistration = async (req, res) => {
    const { id } = req.params;

    const exit = await Registrations.update({
        exitTime: Date.now(),
        status: 'out'
    }, {
        where: {
            id
        }
    });

    if (exit['0'] != 1) {
        res.status(400).json({
            status: 'error',
            message: 'registration not exist'
        });
    };

    res.status(200).json({
        status: 'success',
        exit
    });
};

// cancel a exit registration
const cancelRegistration = async (req, res) => {
    const { id } = req.params;

    const cancel = await Registrations.update({
        status: 'cancelled'
    }, {
        where: {
            id
        }
    });

    if (cancel['0'] != 1) {
        res.status(400).json({
            status: 'error',
            message: 'registration not exist'
        });
    };

    res.status(200).json({
        status: 'success',
        cancel
    });
};

module.exports = {
    getAllRegistrations,
    getRegistration,
    createRegistration,
    exitRegistration,
    cancelRegistration
};