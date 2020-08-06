import React from "react";
// import stories from "../utils/stories.json";

//going to need an onClick prop that comes from the page that calls it
//needs a list of the accents from the speech synthesizer?


function Voice(props) {
    return(
        <div>
            <p>add voice Button and dropdown</p>
            <div className = "dropdown">
                <button className = "btn dropdown-toggle" type = "button" datatoggle id = "dropdownMenuButton" aria-haspopup = "true" aria-expanded = "false">Choose your accent</button>
                <div className = "dropdown-menu" aria-labelledby = "dropdownMenuButton">
                    {/* map through the accents from the props to be a dropdown item */}
                    {/*<a className = "dropdown-item" href = "#">{props.___}</a> */}
                </div>

           

            </div>
            {/* voice component (make into class for component didmount (use effect too) inorder to get saved items from database, import json file) */}
        </div>
    );
}

export default Voice;