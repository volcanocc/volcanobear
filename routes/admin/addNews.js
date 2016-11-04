/**
 * Created by CAN on 2016/10/23.
 */

var express = require('express');
var router = express.Router();

var News = require('../../models/news.js');

var TITLE_ADD_NEWS = '百度新闻后台管理--新闻添加';

//访问新闻添加页面
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

    res.render('admin/addNews', {title: TITLE_ADD_NEWS});
});

//添加新闻
router.post('/', function (req, res) {

    var newstitle = req.body['newsTitle'],
        newstype = req.body['newsType'],
        newsimg = req.body['newsImg'],
        newstime = req.body['newsTime'],
        newssrc = req.body['newsSrc'];

    var reqData = [newstitle, newstype, newsimg, newstime, newssrc];

    News.insertNews(reqData, function (err, result) {
        res.send(result);
    })
});

module.exports = router;


