const router = require('express').Router();

const Users = require('./users-modal');
const { validateLogin } = require('../validators/validators');

router.get('/',  validateLogin, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.send(err);
        });
});


module.exports = router;