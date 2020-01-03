var express = require('express');
const path = require('path')
var app = express();
const status = require('http-status');
const cookieParser = require('cookie-parser');
app.use(cookieParser('zzzz'));



app.use(function (req, res, next) {
    if (req.url !== '/') {
        console.log(req.signedCookies.bwf)
        if (req.get('Referer') !== 'http://localhost:3000/') {
            res.status(status[403]).send('Forbidden')
        }
        else {
            next()
        }
        //  next()
    } else {
        res.cookie("bwf", "lzz12356", { signed: true });
        next()
    }

})

app.use(function (req, res, next) {
    if (req.url !== '/') {
        if (req.signedCookies.bwf) {
            next()
        } else {

            res.status(403).send('Forbidden')
        }
    } else {
        next()
    }

});
app.use(express.static(path.join(__dirname + '/views'), { maxAge: 1000 * 60 * 60 * 24 }));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});