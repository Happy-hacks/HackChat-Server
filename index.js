const socket = require('./scripts/socket');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.get('/', (req, res) => res.send('Hello HackChat!'));
const server = app.listen(port, () => console.log(`Server listening on port ${port}! @ http://localhost:${port}/`));

socket(server);
