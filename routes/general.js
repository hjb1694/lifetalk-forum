const router = require('express').Router();


router.get('/', (req,res) => {

    res.render('home');

});

router.get(['*','not found'], (req,res) => {

    res.status(404).send('404 Not Found!');

});


module.exports = router;