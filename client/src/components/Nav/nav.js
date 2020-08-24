import React from "react";
import {Link} from "react-router-dom";
import "./nav.css"
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
 
import { AuthUserContext } from '../Session';
 
const Nav = () => (
  <header>
      <nav>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      </nav>
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
  <nav>
      <Link to={ROUTES.LANDING}>Home</Link>
  
  
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </nav>
 
);
 
export default Nav;
