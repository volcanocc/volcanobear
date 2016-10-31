var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    if (req.cookies.islogin) {
        console.log('cookies:' + req.cookies.islogin);
        req.session.username = req.cookies.islogin;
    }

    if (req.session.username) {
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;
    }
    else {
        res.redirect('/login');
        return false;
    }

    res.render('admin', {title: '百度新闻后台管理'});
});

module.exports = router;