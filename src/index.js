var express = require('express');
const path = require('path')
var app = express();
const uuidv1 = require('uuid/v1')
const status = require('http-status');
const cookieParser = require('cookie-parser');
app.use(cookieParser('zzzz'));
// var cors = require('cors')
// app.use(cors())
app.use(function (req, res, next) {
    // console.log(req.url, 'url')
    if (req.url !== '/') {
        // console.log(req.get('Referer'),'Referer')
        if (req.get('Referer') !== 'http://localhost:3000/') {
            res.status(403).send('Forbidden2')
        }
        else {
            next()
        }
        //next()
    } else {
        if (!req.signedCookies.bwf)
            res.cookie("bwf", uuidv1(), { signed: true });
        next()
    }
})

app.use(function (req, res, next) {
    console.log(req.url, 'url111')
    if (req.url !== '/') {
        if (req.signedCookies.bwf) {
            next()
        } else {
            res.status(401).send('Unauthorized')
        }
    } else {
        next()
    }
});
app.use(express.static(path.join(__dirname + '/views')));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});