var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('client/index', {title: '百度新闻后台管理'});
});

module.exports = router;