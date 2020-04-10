const socket = require('./scripts/socket');
const express = require('express');
const cors = require('cors');
const webPush = require('web-push');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

webPush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

app.get('/', (req, res) => res.send('Hello HackChat!'));

app.post('/authenticate', (req, res) => {
	const { handle, password } = req.body;

	// should to be from database
	const users = {
		marc: 'pass',
		tobi: 'pass',
	};

	// proxy validation
	if (users[handle] === password) res.send({ handle });
	else res.status(404).send({ error: 'login for this username and password is invalid' });
});

app.post('/notifications/subscribe', (req, res) => {
	const subscription = req.body;

	console.log('request::', subscription);

	const payload = JSON.stringify({
		title: subscription.title || 'Hello!',
		body: subscription.message || 'It works!',
		icon: subscription.icon,
	});

	webPush
		.sendNotification(subscription, payload)
		.then((result) => console.log(result))
		.catch((e) => console.log(e.stack));

	res.status(200).json({ success: true });
});

const server = app.listen(port, () => console.log(`Server listening on port ${port}! @ http://localhost:${port}/`));
socket(server);
