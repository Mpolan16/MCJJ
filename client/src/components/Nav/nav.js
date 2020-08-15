import React from "react";
import {Link} from "react-router-dom";
import "./nav.css"


function Nav() {
    return(
        
            <nav className = "navbar">
                <div>
                    <span class="navbar-brand">Title Here</span>  
                </div>
                <div className = "justify-content-end">
                    <Link to = "/" id = "startHere">
                     Start Here
                    </Link>
                    <Link to = "/" id = "signIn">
                    {/* change this Link to /signin AFTER component is created*/}
                      Sign in
                    </Link>
                </div>
            </nav>
    
    );
}

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
