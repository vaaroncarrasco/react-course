const express = require('express');
require('dotenv').config(); // npm i dotenv // * to read .env files
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Crear express server
const app = express();

// Database
dbConnection();

// * CORS
app.use(cors());

// ? Public dir
app.use( express.static('public') );

// * Reading and parsing body
app.use( express.json() );


// ? Routes

// everything auth.js exports implement in route /api/auth
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// TODO: CRUD: Eventos

// Listen requests
app.listen( process.env.PORT, () => {
    console.log(`server running on port ${ process.env.PORT }`);
});