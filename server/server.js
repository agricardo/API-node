var express = require('express');
var app = express();
var morgan = require('morgan');
var _ = require('lodash');
var port = 3001;
var host = '127.0.0.1';

var lionRouter = require('./lions')


app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/lions, lionRoutes')

app.use((err, req, res, next) =>{
    if(err){
        res.status(500).send(err);
    }
});


app.listen(port, host, function () {
    console.log('listening on http://localhost:', port);
})