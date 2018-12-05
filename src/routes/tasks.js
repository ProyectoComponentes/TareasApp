const express = require('express');
const router = express.Router();
const task = require('../models/Task');

router.get('Tasks/add', (req, res) => {
    res.render('Tasks/tasks');
});

router.get('/Tasks', (req, res) => {
    res.send('Notas del usuario');
});

module.exports = router;