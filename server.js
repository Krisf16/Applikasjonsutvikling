const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const bcrypt = require('bcrypt');

// Hent inn moduler her -------------------------

const user = require("./js/user.js");
const login = require("./js/login2.js");
const list = require("./js/list.js");
const auth = require("./js/auth.js");

// Ikke rør etter her ----------------------------

app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));
app.use(bodyParser.json());

// Legg til moduler mellom her ---------------------------------

app.use(user);
app.use(login);
app.use(list);
app.use(auth.router);


// IKKE endre noe etter dette punktet ----------------------------



app.listen(app.get('port'), function () {
     console.log('server running', app.get('port'));
});



app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops thats bad');
});

