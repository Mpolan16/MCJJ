
import React, { useEffect, useState } from "react";
import SaveLib from "../components/saveLib";
import Voice from "../components/voice";
import API from "../utils/API.js";
import Accents from "../components/getAccents.js";



function Create() {
    const [words, setWords] = useState(null)
    const [userValues, setUserValues] = useState({});
    const [story, setStory] = useState({})
    const [userStory, setUserStory] = useState();


    useEffect(() => {
        API.getTemplateById("5f2dcf43ea7ebd39e0cf8676").then((res) => {
            console.log(res);
            console.log(res.data.prompts);
            setStory({ details: res.data.story, title: res.data.story })
            setWords(res.data.prompts)
        });
    }, []);

    const onChange = (e) => {
        const value = e.target.value;
        const index = e.target.dataset.index
        userValues[index] = value
        setUserValues(userValues)
        console.log(userValues)
    }

    const onSubmit = (e) => {
        // make sure user filled all inputs
        // Object.keys(userValues).length === words.length

        let userStory = story.details;

        for (let i = 0; i < words.length; i++) {
            console.log({ userValues })
            userStory = userStory.replace("___", userValues[i])
        }

        setUserStory(userStory)
    }

    return (
        <div>
            <p>Generated Madlib</p>
            {
                words && (
                    <>
                        {words.map((element, i) => {
                            return <input data-index={i} placeholder={element} onChange={onChange} />
                        })}
                        <button onClick={onSubmit}>Submit</button>
                    </>
                )
            }
            {
                userStory && (
                    <>
                        <p id="returnedStory">
                            {userStory}
                        </p>
                        <button>Save</button>
                        <button>New Template</button>
                        {/* <button onClick={getAccents}>Read</button> */}

                        <label for="rate">Rate</label>
                        <div id="rate-value" className="badge">1</div>
                        <input type="range" id="rate" className="custom=range" min="0.5" max="2" defaultValue="1" step="0.1"></input>

                        <label for="pitch">Pitch</label>
                        <div id="pitch-value" className="badge">1</div>
                        <input type="range" id="pitch" className="custom=range" min="0" max="2" defaultValue="1" step="0.1"></input>


                    </>
                )
            }
            <div className="form-group">
                <select id="voice-select" className="form-control" style={{ width: "500px" }}></select>
            </div>
            <button className="btn"></button>

        </div>

    );

import React, {Component} from "react";
//import React, { useEffect } from "react";
import SaveLib from "../components/savedLibs";
// import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


class Created extends Component {


    //component did mount

    //   useEffect(() => {
    //         // For demonstration purposes, we mock an API call.
    //         API.getTemplateById("5f2c1a5cade96c1b044166ce").then((res) => {
    //           //setDeveloperState(res);
    //           //console.log("Developer State:");
    //           console.log(res);
    //         });
    //       }, []);    
    //no square brackets makes it go every time the page renders
    //when certain data changes put the name of the state in the square brackets

    //make API call to mongo to get 

    render() {
        return(
            <div>
                <p>Generated Madlib</p>            
        
                {/* here we add the code for the generated madlib */}
                <SaveLib />
                {/* save, delete, and create new buttons with onclick functions 
                should these be buttons or components */}

                <button id = "save">Save this Story</button>
                <button id = "delete">Delete this Story</button>
                <a href = "/storySelection">Pick another story</a>


               
            </div>
            
        );
    }

}


export default Created;

