/* 
    Path: messages
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getChat, interactWithChatbot, test } = require('../controllers/message');

const router = Router();

router.get('/:from', validateJWT, getChat);
router.get('/bot/hola1', getChat);
router.get('/bot/hola', interactWithChatbot);
router.get('/bot/hola2', test);

module.exports = router;