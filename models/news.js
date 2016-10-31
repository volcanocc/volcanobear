/**
 * Created by CAN on 2016/10/23.
 */

var Utils = require('./common/Utils');

var News = {};

//查询新闻
News.getNewsList = function (reqData, callback) {

    var queryNews_sql = "SELECT * FROM `news` order by id desc";

    Utils.queryData(queryNews_sql, reqData, function (err, result) {
        callback(err, result);
    });
};

//分类查询新闻
News.getTypeNewsList = function (reqData, callback) {

    var getTypeNewsList_sql = "SELECT * FROM news WHERE `newstype` = ? order by id desc";

    Utils.queryData(getTypeNewsList_sql, reqData, function (err, result) {
        callback(err, result);
    });
};

//添加新闻
News.insertNews = function (reqData, callback) {

    var insertNews_sql = "INSERT INTO `news` (`newstitle`,`newstype`,`newsimg`,`newstime`,`newssrc`) VALUES (?,?,?,?,?)"

    Utils.queryData(insertNews_sql, reqData, function (err, result) {
        callback(err, result);
    });
};

//删除新闻
News.deleteNews = function (reqData, callback) {

    var deleteNews_sql = "DELETE FROM `news` WHERE `news`.`id` = ?";

    Utils.queryData(deleteNews_sql, reqData, function (err, result) {
        callback(err, result);
    });
};

//更新新闻
News.updateNews = function (reqData, callback) {

    var updateNews_sql = "UPDATE `news` SET `newstitle`=?,`newstype`=?,`newsimg`=?,`newstime`=?,`newssrc`=? WHERE `id`=?";

    Utils.queryData(updateNews_sql, reqData, function (err, result) {
        callback(err, result);
    });
};

//选中新闻
News.curNews = function (reqData, callback) {

    var curNews_sql = "SELECT * FROM `news` WHERE `id` = ?";

    Utils.queryData(curNews_sql, reqData, function (err, result) {
        callback(err, result);
    });
};


module.exports = News;
