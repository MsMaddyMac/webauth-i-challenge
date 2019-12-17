const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-modal');

router.post('/register', (req, res) => {
	let user = req.body;

	// hash the password
	// the 8 is the number of rounds (iterations)
	const hash = bcrypt.hashSync(user.password, 8);
	// override the plain text password with the hash
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(err => {
			console.log('Could not register user.', err);
			res.status(500).json(err);
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	//checks that the password is valid
	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				// save a session for the client and send back a cookie
				req.session.user = user;

				res.status(200).json({ message: `${user.username} is logged in!` });
			} else {
				res.status(401).json({ message: 'You shall not pass!' });
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
