const socket = require('./scripts/socket');
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Hello HackChat!'));
const server = app.listen(port, () => console.log(`Server listening on port ${port}! @ http://localhost:${port}/`));

socket(server);
