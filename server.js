

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./js/db.js");
const users = require("./js/user.js");





app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));
app.use(bodyParser.json());


app.listen(app.get('port'), function () {
     console.log('server running', app.get('port'));
});



app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops thats bad');
});


app.use('/app/user/',users);
