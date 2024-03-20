const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(routes);

app.listen(port, () => {
    console.log(`App running: ${port}`);
});
