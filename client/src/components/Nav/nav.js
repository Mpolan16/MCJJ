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

export default Nav;