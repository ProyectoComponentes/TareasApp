const express = require('express');
const router = express.Router();

router.get('/task', (request, respond) => {
    respond.render('Tasks/tasks');
});
module.exports = router;