const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/task',isAuthenticated, (request, respond) => {
   
    respond.render('Tasks/tasks');

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
        task.user = req.user.id;
        await task.save();
        req.flash('success_msg', 'Nota agregada exitosamente')
        res.redirect('/tasks')
    }
});

router.get('/tasks', async (req, res) => {
    const userNotes = await Task.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('tasks/userNotes', { userNotes });
});

router.get('/tasks/editNote/:id', async (req, res) => {
    const note = await Task.findById(req.params.id);
    res.render('tasks/editNote', { note });
});

router.put('/tasks/edit/:id', async (req, res) => {
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota actualizada exitosamente')
    res.redirect('/tasks');
});

router.delete('/tasks/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada exitosamente')
    res.redirect('/tasks');
});

module.exports = router;