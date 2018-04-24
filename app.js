var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');


var mongoose = require('mongoose');
var config = require('./config/config');

var mongoose = mongoose.connect('mongodb://127.0.0.1/lookersup',function(err) {
    if(err)  {
        console.log("connect mongodb error" + err);
    }else {
        console.log("connect mongodb success!" );
    }
})

console.log(mongoose)

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.set('views', path.join(__dirname, 'views'));

//设定views变量，意为网页模板引擎
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>';
     next();
});

require('./routes')(app);

app.get('/', function (req, res) {
    res.render('login');
});


app.listen(config.port, function (err) {
    if (err) {
        console.log("start server error " + err);
        throw err;
    }
    console.log("start server and port is " + config.port);
});







