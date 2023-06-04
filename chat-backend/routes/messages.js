/* 
    Path: messages
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getChat } = require('../controllers/message');

const router = Router();

router.get('/:from', validateJWT, getChat);

module.exports = router;