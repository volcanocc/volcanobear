/**
 * Created by CAN on 2016/11/9.
 */
import React from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';


import HelloWorld from '../components/Home/HelloWorld';
import ArticleBoard from '../components/ArticleBoard/ArticleBoardWrap';

import E404 from '../components/Other/E404';

var RouteConfig = React.createClass({

    render: function () {
        return (
            <Router history={browserHistory}>
                <Route path='/'>
                    <IndexRoute component={HelloWorld}/>
                    <Route path="/" component={HelloWorld}/>
                    <Route path="/board" component={ArticleBoard}/>
                </Route>
                <Route path="*" component={E404}/>
            </Router>
        )
    }

});

module.exports = RouteConfig;
