/**
 * Created by Administrator on 2016/11/9.
 */

var React = require('react');

var ArticleBoardWrap = React.createClass({


    handleClick: function () {
        $.ajax({
            url: 'http://localhost:3000/news',
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.info(data);
            }
        })
    },


    render: function () {
        return (
            <span>
                123123123<br/>
                <button type="button" onClick={this.handleClick}>获取数据</button>
            </span>
        );
    }
});

module.exports = ArticleBoardWrap;
