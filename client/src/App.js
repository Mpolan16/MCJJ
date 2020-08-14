import React, { Component } from 'react';
import Home from './pages/home.js';
import Create from './pages/create.js';
import Nav from './components/nav.js';
// import FavoritesList from './components/favoritesList.js';
// import NoMatch from "./pages/noMatch";
import Footer from './components/footer.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StorySelection from './pages/storySelection.js';

// New Routes
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
 
import * as ROUTES from './constants/routes.js';
import { withAuthentication } from './components/Session';
 
const App = () => (
      <Router basename="/">
        <div>
          <Nav />
          <Switch>
            {/* <Route exact path="/favorites/:id" component={FavoritesList} /> */}
            {/* <Route component={NoMatch} /> */}
            <Route exact path={ROUTES.CREATE} component={Create} />
            <Route exact path={ROUTES.STORYSEL} component={StorySelection} />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
);
 
export default withAuthentication(App);


