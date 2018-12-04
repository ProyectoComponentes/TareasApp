
const express =  require('express');
const router = express.Router();

router.get('/',(request,respond)=>{
    respond.send("api index esta respondiendo");
});
module.exports =  router;

