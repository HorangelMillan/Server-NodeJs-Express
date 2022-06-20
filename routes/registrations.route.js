const express = require('express');

const {
    getAllRegistrations,
    getRegistration,
    createRegistration,
    exitRegistration,
    cancelRegistration
} = require('../controllers/registrations.controller');

const registrationsRouter = express.Router();

registrationsRouter.get('/', getAllRegistrations);

registrationsRouter.get('/:id', getRegistration);

registrationsRouter.post('/', createRegistration);

registrationsRouter.patch('/:id', exitRegistration);

registrationsRouter.delete('/:id', cancelRegistration);

module.exports = { registrationsRouter };