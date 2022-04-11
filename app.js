const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

//templating engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

//routes
const homePage = require('./src/routes/home');
app.use('/board', homePage);

const adminPage = require('./src/routes/admin');
app.use('/admin', adminPage);

//listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));