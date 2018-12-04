const express = require('express');
const router = express.Router();

router.get('/', (request, respond) => {
respond.send("api usuarios esta respondiendo");
});
module.exports = router;