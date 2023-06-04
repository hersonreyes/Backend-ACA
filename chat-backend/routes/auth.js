/* 
    path: auth
*/
const { Router } = require('express');

//Controllers
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');

const router = Router();

//Create new users
router.post( '/new', createUser);

//Login
router.post(
    '/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ], 
    login
);

// Revalidate Token
router.get('/renew', renewToken);

module.exports = router;