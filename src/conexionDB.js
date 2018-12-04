const mongoose = require('mongoose');

mongoose.connect('mongodb://componentesDbTemporal:componentes2018@ds155252.mlab.com:55252/db-mongo-temporal', {
    useNewUrlParser: true
})
  .then(db => console.log('La base de datos se ha conectado correctamente'))
  .catch(err => console.error(err));
