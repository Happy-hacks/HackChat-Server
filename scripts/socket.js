const socket = require('socket.io');

function connect(server) {
	const io = socket(server);

	const messages = [];

	io.on('connection', (socket) => {
		console.log('made socket connection', socket.id);

		console.log(socket.handshake.query.handle);

		socket.on('chat', (data) => {
			const message = { ...data, time: new Date().getTime() };

			// appending new messages to list, max amount is set to 10
			if (messages.length > 10) messages.pop();
			messages.push(message);

			io.sockets.emit('chat', message);
		});

		socket.on('typing', (data) => {
			socket.broadcast.emit('typing', data);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected', socket.id);
		});
	});
}

module.exports = connect;
