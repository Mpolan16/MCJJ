import React from "react";
import { PromiseProvider } from "mongoose";
import { prompts } from "../../scripts/seedDB"
import Voice from "../components/voice";


//need list of prompts from seedDB


function WordEntry() {
    return(
        <div>
            <p>inputs for each blank</p>

            {/* Map through list of prompts */}
            <input type="text" class="form-control" placeholder= {prompts[i]} aria-label="Username" aria-describedby="basic-addon1" />

            <Voice />

           

            <Link to = "/create">
                Generate my (fill in name)
            </Link>
        </div>
    );
}

export default WordEntry;