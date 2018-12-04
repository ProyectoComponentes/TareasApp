const express = require('express');
const router = express.Router();

router.get('/', (request, respond) => {
respond.send("api tarea esta respondiendo");
});
module.exports = router;