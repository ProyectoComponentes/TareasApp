
const express =  require('express');
const router = express.Router();

router.get('/',(request,respond)=>{
    respond.render('index');
});
module.exports =  router;

