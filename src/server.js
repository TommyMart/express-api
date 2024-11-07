// Firstly, make .env data ready to use
const dotenv = require('dotenv');
dotenv.config();

// Import express package and configure
const express = require('express');
const app = express();

// If not process.env is found, assign default values
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Configure basic Helmet settings on server instance
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));

// Configure some basic CORS settings on the server instance
const cors = require('cors');
var corsOptions = {
    origin: ["http://localhost:5000", "https://deployedApp.com"],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Configure API friendly request data formatting
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Test homepage route
app.get('/', (request, response) => {
    response.json({
        message: 'Hello World!'
    });
});


// If not route found
app.get('*', (request, response) => {
    response.status(404).json({
        message: 'No route with that path found!',
        attemptedPath: request.path
    });
});

// Export everything needed to run the server
module.exports = {
    HOST,
    PORT,
    app
}
