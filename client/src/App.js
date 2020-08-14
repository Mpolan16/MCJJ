import React, { Component } from 'react';
// import Login from './components/login.js';
import Home from './pages/Home/home.js';
import Create from './pages/CreateStory/createStory.js/index.js.js';
import Nav from './components/Nav/nav.js';
// import FavoritesList from './components/favoritesList.js';
// import NoMatch from "./pages/noMatch";
import Footer from './components/Footer/footer.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StorySelection from './pages/StorySelection/storySelection.js/index.js';
import CreateTemplate from './pages/CreateTemplate/createTemplate.js/index.js';



class App extends Component {
  render() {
    return (
      <Router basename="/">
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            {/* <Route exact path="/favorites/:id" component={FavoritesList} /> */}
            <Route exact path="/create" component={Create} />
            <Route exact path="/storySelection" component={StorySelection} />
            <Route exact path="/createTemplate" component={CreateTemplate} />            
            {/* <Route component={NoMatch} /> */}
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
