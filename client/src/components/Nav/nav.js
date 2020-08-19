import React from "react";
import {Link} from "react-router-dom";
import "./nav.css"
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
 
import { AuthUserContext } from '../Session';
 
const Nav = () => (
  <div>
   
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);


const NavigationAuth = () => (
  <ul>
     <h1 id = "title">Name Goes Here</h1>
      <Link to={ROUTES.LANDING}> MadLibs</Link>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>

    <li>
      <SignOutButton />
    </li>
  </ul>
);
 
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);
 
export default Nav;
