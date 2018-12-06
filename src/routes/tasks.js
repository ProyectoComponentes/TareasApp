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
    const userNotes = await Task.find().sort({ date: 'desc' });
    res.render('tasks/userNotes', { userNotes });
});

router.get('/tasks/editNote/:id', async (req, res) => {
    const note = await Task.findById(req.params.id);
    res.render('tasks/editNote', { note });
});

router.put('/tasks/edit/:id', async (req, res) => {
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(req.params.id, {title, description});
    res.redirect('/userNotes');
});

module.exports = router;