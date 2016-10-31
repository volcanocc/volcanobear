/**
 * Created by CAN on 2016/10/23.
 */

var express = require('express');
var router = express.Router();

var News = require('../models/news.js');


//获取选中新闻
router.get('/:id', function (req, res) {

    var newsid = req.params.id;
    var newstime = req.params.newstime;

    console.log("update-newstime:: " + newstime);

    News.curNews(newsid, function (err, result) {

        console.log("result:" + result);

        var id = result[0].id,
            newstype = result[0].newstype,
            newstitle = result[0].newstitle,
            newsimg = result[0].newsimg,
            newstime = result[0].newstime,
            newssrc = result[0].newssrc;

        var newResult = [{
            "id": id,
            "newstype": newstype,
            "newstitle": newstitle,
            "newsimg": newsimg,
            "newstime": newstime,
            "newssrc": newssrc
        }];

        console.log("newResult:" + JSON.stringify(newResult));

        res.send(newResult);
    })
});

module.exports = router;



