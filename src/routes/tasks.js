const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { isAuthenticated } = require('../helpers/autentication');

router.get('/tasks/add', isAuthenticated, (request, respond) => {
    respond.render('tasks/newNote');
});

router.post('/tasks/new-task', isAuthenticated, async (req, res) => {
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
        req.flash('success_msg', 'Tarea agregada exitosamente')
        res.redirect('/tasks')
    }
});

router.get('/tasks', isAuthenticated, async (req, res) => {
    const userNotes = await Task.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('tasks/userNotes', { userNotes });
});

router.get('/tasks/editNote/:id', isAuthenticated, async (req, res) => {
    const note = await Task.findById(req.params.id);
    res.render('tasks/editNote', { note });
});

router.put('/tasks/edit/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Tarea actualizada exitosamente')
    res.redirect('/tasks');
});

router.delete('/tasks/delete/:id', isAuthenticated, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Tarea eliminada exitosamente')
    res.redirect('/tasks');
});

module.exports = router;