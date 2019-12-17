const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const knex = require('../database/dbConfig');

const server = express();

const sessionConfig = {};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfig)); // will add a req.session object

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	res.json({ api: "It's working, it's working!!" });
});

module.exports = server;
