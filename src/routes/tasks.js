const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/tasks/add', (req, res) => {
    res.render('tasks/newNote');
});

router.post('/tasks/new-task', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if (!title) {
        errors.push({ text: 'El titulo es requerido' })
    }

    if (!description) {
        errors.push({ text: 'La descripcion es requerida' });
    }

    if (errors.length > 0) {
        res.render('tasks/newNote', {
            errors, title, description
        });
    } else {
        const task = new Task({ title, description });
        await task.save();
        res.redirect('/userNotes')
    }
});

router.get('/userNotes', async (req, res) => {
    const userNotes = await Task.find();
    res.render('tasks/userNotes', { userNotes });
});

module.exports = router;