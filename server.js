const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
var session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path')


const hbs = exphbs.create({});

const app = express();

const PORT = process.env.PORT || 3001;

// set Handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const session_table = new SequelizeStore({
    db: sequelize
});

session_table.sync();

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: true,
    store: session_table
};


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// use routes
app.use(routes);

// sync models to the database and turns on server
sequelize.sync({ force: false }).then(() => {

    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

});

