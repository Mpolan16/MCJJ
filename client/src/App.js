import React, { Component } from 'react';
// import Login from './components/login.js';
// import Home from './components/home.js';
// import Create from './components/create.js';
// import FavoritesList from './components/favoritesList.js';
// import NoMatch from "./pages/noMatch";
// import Footer from './components/footer.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router basename="/">
        <div>
          test
          {/* <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/favorites/:id" component={FavoritesList} />
            <Route exact path="/create" component={Create} />
            <Route component={NoMatch} />
          </Switch>
          <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
