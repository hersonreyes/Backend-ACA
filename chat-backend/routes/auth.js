/* 
    path: auth
*/
const { Router } = require('express');

//Controllers
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

//Create new users
router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    createUser
);

//Login
router.post(
    '/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ], 
    login
);

// Revalidate Token
router.get('/renew', renewToken);

module.exports = router;