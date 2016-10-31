/**
 * Created by CAN on 2016/10/23.
 */

var express = require('express');
var router = express.Router();
var xss = require('xss');

var News = require('../models/news.js');


//更新新闻
router.post('/', function (req, res) {

    var newstitle = xss(req.body['newsTitle']),
        newstype = xss(req.body['newsType']),
        newsimg = xss(req.body['newsImg']),
        newstime = xss(req.body['newsTime']),
        newssrc = xss(req.body['newsSrc']),
        newsid = xss(req.body['newsId']);

    var reqData = [newstitle, newstype, newsimg, newstime, newssrc, newsid];

    News.updateNews(reqData, function (err, result) {
        res.send(result);
    })
});

module.exports = router;



