/**
 * Created by CAN on 2016/11/9.
 */
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';


import HelloWorld from '../components/Home/HelloWorld';
import ArticleBoard from '../components/ArticleBoard/ArticleBoardWrap';

var RouteConfig = React.createClass({

    render: function () {
        return (
            <Router history={hashHistory}>
                <Route path='/'>
                    <IndexRoute component={HelloWorld}/>
                    <Route path="/" component={HelloWorld}/>
                    <Route path="/board" component={ArticleBoard}/>
                </Route>
            </Router>
        )
    }

});

module.exports = RouteConfig;