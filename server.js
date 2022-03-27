const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
var session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({});

const app = express();

const PORT = process.env.PORT || 3001;

// set Handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess));

// use routes
app.use(routes);
app.use(express.static('public'));

// sync models to the database and turns on server
sequelize.sync({ force: false }).then(() => {

    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

});

