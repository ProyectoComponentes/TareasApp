const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../helpers/autentication');

router.get('/task',isAuthenticated, (request, respond) => {
   
    respond.render('Tasks/tasks');
});
module.exports = router;