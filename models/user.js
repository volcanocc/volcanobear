/**
 * Created by CAN on 2016/10/22.
 */

var Utils = require('./common/Utils');

var User = {};

//保存用户
User.save = function (reqData, callback) {

    console.log("==reqData: " + reqData);

    var insertUser_Sql = "INSERT INTO `userinfo` (`id`,`username`,`userpass`) VALUES(0,?,?)";

    Utils.queryUser(insertUser_Sql, reqData, function (err, result) {
        if (err) {
            console.log("insertUser_Sql Error: " + err.message);
            return false;
        }
        callback(err, result);
    })
};

//根据用户名得到用户数量
User.getUserNumByName = function (username, callback) {

    var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM `userinfo` WHERE username = ?";

    Utils.queryUser(getUserNumByName_Sql, [username], function (err, result) {
        if (err) {
            console.log("getUserNumByName Error: " + err.message);
            return false;
        }
        callback(err, result);
    })
};

//根据用户名得到用户信息
User.getUserByUserName = function (username, callback) {

    console.log("getUserByUserName-usename：" + username);

    var getUserByUserName_Sql = "SELECT * FROM `userinfo` WHERE username = ?";

    Utils.queryUser(getUserByUserName_Sql, [username], function (err, result) {
        if (err) {
            console.log("getUserByUserName Error: " + err.message);
            return false;
        }
        callback(err, result);
    })
};

module.exports = User;

