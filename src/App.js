import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Topic from './components/Topic';

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
          <Route>
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
