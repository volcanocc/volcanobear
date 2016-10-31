/**
 * Created by CAN on 2016/10/23.
 */

var mysql = require('mysql');
var DBconfig = require('./DBconfig');

var pool = mysql.createPool({
    host: DBconfig.host,
    user: DBconfig.user,
    password: DBconfig.password,
    database: DBconfig.database,
    port: DBconfig.port
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

var Utils = {};

//用户查询
Utils.queryUser = function (sql, reqData, callback) {

    pool.on('connection', function(connection) {
        connection.query('SET SESSION auto_increment_increment=1');
    });

    pool.getConnection(function (err, connection) {
        if (!connection || err) {
            callback(err, null)
        } else {
            connection.query(sql, reqData, function (err, result) {

                console.log("==queryData-result==：" + JSON.stringify(result));

                connection.release();
                callback(err, result);
            })
        }
    });
};

//数据查询
Utils.queryData = function (sql, reqData, callback) {

    pool.on('connection', function(connection) {
        connection.query('SET SESSION auto_increment_increment=1');
    });

    pool.getConnection(function (err, connection) {
        if (!connection || err) {
            callback(err, null)
        } else {
            connection.query(sql, reqData, function (err, result) {

                console.log("==queryData-result==：" + JSON.stringify(result));

                connection.release();
                callback(err, result);
            })
        }
    });
};

module.exports = Utils;