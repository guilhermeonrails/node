const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require("body-parser"),
const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(routes);

mongoConnect(() => {
    app.listen(3000)
})
