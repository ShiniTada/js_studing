var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var jsonParser = bodyParser.json();
app.use(jsonParser);

var port = 8080;

// создание хранилища для сессий 
var sessionHandler = require('./js/session_handler');
var store = sessionHandler.createStore();

// создание сессии 
app.use(cookieParser());
app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret'
}));

var handlers = require('./js/queries');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/all', handlers.get_users);

app.post('/login', handlers.check_user);
app.post('/login', handlers.check_pass);

app.get('/check', function (req, res) {
    if (req.session.username) {
        res.send('hello, user ' + req.session.username);
    } else {
        res.send('Not logged in(');
    };
});

app.listen(port, function () {
    console.log('app running on port ' + port);
}); 
