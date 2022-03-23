const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const hbs = exphbs.create({});

const app = express();

const PORT = process.env.PORT || 3001;

// set Handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use(routes);

// sync models to the database and turns on server
sequelize.sync({ force: false }).then(() => {

    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

});

