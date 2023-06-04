const { Router } = require('express');

const router = Router();

//Create new users
router.post( '/new', (req, res) => {

    res.json({
        ok: true,
        msg: 'New'
    });

});

//Login
router.post('/', (re, res) => {

    res.json({
        ok: true,
        msg: 'Login'
    });

});

// Revalidate Token
router.get('/renew', (req, res) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
});

module.exports = router;