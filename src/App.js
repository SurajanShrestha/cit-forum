import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';
import Topic from './views/topic';
import User from './views/user';
import UserAccount from './views/userAccount';

function Error(){
  return <h4 className="text-center">404 Error!!! Page Not Found 😵.</h4>
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/topic">
            <Topic />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/userAccount">
            <UserAccount />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
