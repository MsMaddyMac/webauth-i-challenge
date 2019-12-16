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
            console.log('Could not register user.', err)
            res.status(500).json(err);
        });
});

module.exports = router;