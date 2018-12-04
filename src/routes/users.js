const express = require('express');
const router = express.Router();

router.get('/user/signup', (request, respond) => {
   respond.render('signup');
});
router.post('/user/signup', (request, respond) => {
const  { name,email, password, confirm_password} = request.body;
const requestData = [];
requestData.push(request.body.name,
   request.body.email,
   request.body.password,
   request.body.confirm_password)
const errors = [];
let result = verificarInputs(requestData);
   if (result === false) {
      if (password != confirm_password) {
         errors.push({text: 'Las contraseñas no coinciden.'});
      }
      if (password.length < 4) {
         errors.push({text: 'La contraseña tiene que ser mayor a 4 caracteres.'});
      }
      if(errors.length > 0){
         respond.render('signup', {errors, name, email, password, confirm_password});
      }
      else{
         respond.send('ok');
      }
      
      
   }else{
      errors.push({text: 'Hay campos vacíos'});
      respond.render('signup',{errors, name, email, password, confirm_password});
   }


});
function verificarInputs(requestData) {
   let result =false;
   requestData.forEach(element => {
      if (element === "") {
         result=true;
      }

   });
   return result;

}
module.exports = router;