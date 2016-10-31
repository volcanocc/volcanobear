/**
 * Created by CAN on 2016/10/23.
 */

var express = require('express');
var router = express.Router();

var News = require('../models/news.js');

//删除新闻
router.post('/', function (req, res) {

    console.log("1.POST: " + JSON.stringify(req.body));

    var newsId = req.body['newsId'];

    News.deleteNews(newsId, function (err, result) {
        res.send(result);
    })
});

module.exports = router;


