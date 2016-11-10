/**
 * Created by CAN on 2016/11/10.
 */
var React = require('react');
import {Link} from 'react-router';

var E404 = React.createClass({

    render: function () {
        return (
            <div>
                <h1>
                    404
                </h1>

                <Link to="/">首页</Link>

            </div>

        );
    }
});

module.exports = E404;
