/**
 * Created by CAN on 2016/10/23.
 */

var express = require('express');
var router = express.Router();

var News = require('../../models/news.js');


//更新新闻
router.post('/', function (req, res) {

    var newstitle = req.body['newsTitle'],
        newstype = req.body['newsType'],
        newsimg = req.body['newsImg'],
        newstime = req.body['newsTime'],
        newssrc = req.body['newsSrc'],
        newsid = req.body['newsId'];

    var reqData = [newstitle, newstype, newsimg, newstime, newssrc, newsid];

    News.updateNews(reqData, function (err, result) {
        res.send(result);
    })
});

module.exports = router;



