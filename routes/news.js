/**
 * Created by CAN on 2016/10/23.
 */

var express = require('express');
var router = express.Router();

var News = require('../models/news.js');

router.get('/', function (req, res) {
    News.getNewsList([], function (err, result) {
        res.send(result);
    })
});

router.get('/:type', function (req, res) {

    var newsType = req.params.type;

    console.log(newsType);

    console.log("newsType: " + newsType);

    News.getTypeNewsList(newsType, function (err, result) {
        res.send(result);
    })
});


router.post('/', function (req, res) {

    var newsTitle = req.body['newstitle'],
        newsType = req.body['newstype'],
        newsImg = req.body['newsimg'],
        newsTime = req.body['newstime'],
        newsSrc = req.body['newssrc'];

    var reqData = {
        newstitle: newsTitle,
        newstype: newsType,
        newsimg: newsImg,
        newstime: newsTime,
        newssrc: newsSrc
    };

    News.insertNews(reqData, function (err, result) {
        res.send(result);
    })
});

module.exports = router;


