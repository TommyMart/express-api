// Database connector and disconnector for the project

const mongoose = require('mongoose');

// Connect to DB
async function databaseConnector(databaseURL) {
    await mongoose.connect(databaseURL);
}

// Disconnect from DB
async function databaseDisconnector() {
    await mongoose.connection.close();
}

module.exports = {
    databaseConnector,
    databaseDisconnector
}