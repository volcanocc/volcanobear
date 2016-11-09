/**
 * Created by CAN on 2016/9/25.
 */

var React = require('react');
import {Link} from 'react-router';

var World = require('./World');

var Hello = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },
    render: function () {
        return (
            <div>
                <h1>
                    hello
                    <World name="world"/>
                </h1>

                <Link to="/board">board</Link>

            </div>

        );
    }
});

module.exports = Hello;
