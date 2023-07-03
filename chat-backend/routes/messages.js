/* 
    Path: messages
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getChat } = require('../controllers/message');

const router = Router();

// getChat - obtener el chat de los usuarios
router.get('/:from', validateJWT, getChat);

module.exports = router;