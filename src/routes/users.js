const express = require('express');
const router = express.Router();
const user = require('../models/User');
const password = require('passport');
const {isAuthenticated} = require('../helpers/autentication');

router.get('/user/signup', (request, respond) => {
   respond.render('signup');
});

router.post('/user/signin', password.authenticate('local', {
   successRedirect: '/tasks',
   failureRedirect: '/',  
   badRequestMessage: 'Hay campos vacios',
   failureFlash: true
}));

router.post('/user/signup', async (request, respond) => {
   const { name, email, password, confirm_password } = request.body;
   const requestData = [];
   requestData.push(request.body.name,
      request.body.email,
      request.body.password,
      request.body.confirm_password)
   const errors = [];
   let result = verificarInputs(requestData);
   if (result === false) {
      if (password != confirm_password) {
         errors.push({ text: 'Las contraseñas no coinciden.' });
      }
      if (password.length < 4) {
         errors.push({ text: 'La contraseña tiene que ser mayor a 4 caracteres.' });
      }
      if (errors.length > 0) {
         respond.render('signup', { errors, name, email, password, confirm_password });
      }
      else {
         const emailUser = await user.findOne({ email: email });
         if (emailUser) {
            errors.push({ text: 'Este email ya existe en la base de datos.' });
            respond.render('signup', { errors, name, password, confirm_password });
         } else {
            const newUser = new user({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            request.flash('success_msg', 'Registro exitoso');
            respond.redirect('/');
         }

      }


   } else {
      errors.push({ text: 'Hay campos vacíos' });
      respond.render('signup', { errors, name, email, password, confirm_password });
   }


});
router.get('/user/logout', (request, respond) => {
   request.logout();
   respond.redirect('/');
});
function verificarInputs(requestData) {
   let result = false;
   requestData.forEach(element => {
      if (element === "") {
         result = true;
      }

   });
   return result;

}
module.exports = router;