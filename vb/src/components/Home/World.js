/**
 * Created by CAN on 2016/9/25.
 */

var React = require('react');

var World = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },
    render: function () {
        return (
            <span>
                {this.props.name}
            </span>
        );
    }
});

module.exports = World;
