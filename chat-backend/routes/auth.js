/* 
    path: auth
*/
const { Router } = require('express');

//Controllers
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

//Create new users
router.post( '/new', createUser);

//Login
router.post('/', login);

// Revalidate Token
router.get('/renew', renewToken);

module.exports = router;