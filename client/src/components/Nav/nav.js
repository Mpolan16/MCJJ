import React from "react";
import {Link} from "react-router-dom";

function Nav() {
    return(
        <nav>
            <Link to = "/">
                MadLibs
            </Link>
            <Link to = "/">
                {/* change this Link to /signin AFTER component is created*/}
                Sign in
            </Link>
        </nav>
    );
}

export default Nav;