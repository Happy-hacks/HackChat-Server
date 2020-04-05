const socket = require('./scripts/socket');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello HackChat!'));

app.post('/authenticate', (req, res) => {
	const { handle, password } = req.body;

	// should to be from database
	const users = {
		marc: 'pass',
		tobi: 'pass'
	};

	// proxy validation
	if (users[handle] === password) res.send({ handle });
	else res.status(404).send({ error: 'login for this username and password is invalid' });
});

const server = app.listen(port, () => console.log(`Server listening on port ${port}! @ http://localhost:${port}/`));

socket(server);
