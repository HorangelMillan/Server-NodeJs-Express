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
    };
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
    };
};

// cancel a exit registration
const cancelRegistration = async (req, res) => {
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
    };
};

module.exports = {
    getAllRegistrations,
    getRegistration,
    createRegistration,
    exitRegistration,
    cancelRegistration
};