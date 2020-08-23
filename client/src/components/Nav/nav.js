import React from "react";
import {Link} from "react-router-dom";
import "./nav.css"
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
 
import { AuthUserContext } from '../Session';
 
const Nav = () => (
  <header>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </header>
);

 
const NavigationAuth = () => (
  <nav>  

      <Link to={ROUTES.ACCOUNT}>Account</Link>    

      <Link to={ROUTES.HOME}>Home</Link>
   
      <SignOutButton />
  
  </nav>
);
 
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);
 
export default Nav;
