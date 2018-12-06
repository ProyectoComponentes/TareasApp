const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const method_override = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//INITILIAZATIONS
const app = express();
require('./conexionDB');
require('./config/passport');

//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(method_override('_method'));
app.use(session({
    secret: 'componentesSecretWord',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//ROUTES
app.use(require('./routes/'));
app.use(require('./routes/users'));
app.use(require('./routes/tasks'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//SETTINGS SERVER
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

