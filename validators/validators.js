const bcrypt = require('bcryptjs');

const Users = require('../users/users-modal');

module.exports = {
    validateLogin
};

function validateLogin(req, res, next) {
    const { username, password } = req.headers;

       
        if (username && password) {
            Users
            .findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'You shall not pass!' });
                }
            })
            .catch(err => {
                console.log('Error validating login.');
                res.status(500).json({ error: 'Error validating login.' });
            });
        } else {
            res.status(400).json({ message: 'No credentials provided.' });
        }

};