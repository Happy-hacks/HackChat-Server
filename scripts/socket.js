const socket = require('socket.io');

function connect(server) {
	const io = socket(server);

	io.on('connection', (socket) => {
		console.log('made socket connection', socket.id);

		socket.on('chat', (data) => {
			io.sockets.emit('chat', data);
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
