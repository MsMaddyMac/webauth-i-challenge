const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const knex = require('../database/dbConfig');

const server = express();

const sessionConfig = {
	// session storage options
	name: 'whatchamacallit',
	secret: 'pinky promise, please!',
	resave: false,
	saveUninitialized: true,

	// how to store the session
	store: new KnexSessionStore({
		knex,
		createtable: true,
		tablename: 'sessions',
		sidfieldname: 'sid',
		clearInterval: 1000 * 60 * 10
	}),

	// cookie options
	cookie: {
		maxAge: 100 * 60 * 10,
		secure: false,
		httpOnly: true
	}
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfig)); // will add a req.session object

server.use('/api/auth', authRouter);
server.use('/api/restricted/users', usersRouter);

server.get('/', (req, res) => {
	res.json({ api: "It's working, it's working!!" });
});

module.exports = server;
