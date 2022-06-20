const express = require('express');
const { registrationsRouter } = require('./routes/registrations.route');
const { db } = require('./utils/database.util');

// init express
const app = express();

// middlewares
app.use(express.json());
app.use('/api/v1/registrations', registrationsRouter);

// ----- authenticated database
db.authenticate()
    .then(() => console.log('--- database authenticated'))
    .catch(err => console.log(err));
// sync database models
db.sync()
    .then(() => console.log('--- datbases model synced'))
    .catch(err => console.log(err));
// ----- temporal

app.listen(4000, () => {
    console.log('--- server running on port 4000');
});

