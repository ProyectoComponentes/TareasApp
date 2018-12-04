const express = require('express');
const router = express.Router();

router.get('/usuario/signup', (request, respond) => {
   respond.render('signup');
});
module.exports = router;