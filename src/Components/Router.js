import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from "../Routes/Home";
import TV from "../Routes/TV";
import Search from "../Routes/Search";
import Header from './Header';

export default () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tv" component={TV} />
                <Route path="/tv/popular" render={() => <h1>Popular</h1>} />
                <Route path="/search" component={Search} />
                <Redirect from='*' to={Home} />
            </Switch>
        </>
    </Router>
)