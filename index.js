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
		ralle: 'pass',
		steph: 'pass',
	};

	// proxy validation
	if (users[handle] === password) res.send({ handle });
	else res.status(404).send({ error: 'login for this username and password is invalid' });
});

app.post('/subscribe', (req, res) => {
	const subscription = req.body;
	const { title, body, icon } = subscription;

	const payload = JSON.stringify({
		title: title || 'Dr. Le Quack',
		body: body || "qu'est que c'est!",
		icon: icon || 'https://vignette.wikia.nocookie.net/villains/images/b/b9/Le_Quack.png/revision/latest/top-crop/width/360/height/450?cb=20200202175536',
	});

	try {
		webPush.sendNotification(subscription, payload);
		res.status(200).json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

const server = app.listen(port, () => console.log(`Server listening on port ${port}! @ http://localhost:${port}/`));
socket(server);
