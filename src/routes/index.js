import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/common/history';

import Login from '../components/common/Login';
import Home from '../components/common/Home';
import NoMatch from '../components/common/404';
import NoPage from '../components/common/noPage';
import App from '../components/common/App';

class MRoute extends Component {
    render() {
        return (
          <Router history={history}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/app" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/404" component={NoMatch}/>
                <Route path="/noPage" component={NoPage}/>
              </Switch>
          </Router>
        )
      }
}

export default MRoute;