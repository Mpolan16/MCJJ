import React from "react";
import {Link} from "react-router-dom";
import { withAuthorization } from '../../components/Session';

function Home() {
    return(
        <div>
            <p>home: Welcome to MadLibs</p>
            <p>The Home Page is accessible by every signed in user.</p>
            {/* put an image here */}
            <Link to = "/storySelection">
                Click here to select options for your story
            </Link>
            <br>
            </br>
            <Link to = "/createTemplate">
                Click here to create a template
            </Link>
        </div>
    );
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Home);