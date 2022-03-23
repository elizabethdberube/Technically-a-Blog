const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({});


const app = express();

const PORT = 3001;













app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log(`App listening at http://localhost:${PORT} 👍`);
});