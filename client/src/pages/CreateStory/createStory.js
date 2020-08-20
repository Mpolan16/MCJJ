import React, { useEffect, useState } from "react";
// import SaveLib from "../components/saveLib";
// import Voice from "../components/voice";
import API from "../../utils/API.js";
// import Accents from "../components/getAccents.js";
// import Read from "../components/readStory.js";
import SpeechContainer from "../../components/readStory.js"
import { withRouter } from "react-router-dom";
import './createStory.css';
//import {Link} from "react-router-dom";  --use LINK if using to call another page


function Create(props) {
    const [words, setWords] = useState(null)
    const [userValues, setUserValues] = useState({});
    const [story, setStory] = useState({})
    const [userStory, setUserStory] = useState();

    const [styledTemplate, setTemplate] = useState();



    useEffect(() => {

         //console.log(props);
        // console.log("Category",props.location.state.category)    
        // console.log("Language",props.location.state.language)    

        // API.getTemplateById("5f3c63244944b44690617d74").then((res) => {

        //     setStory({ details: res.data.story, title: res.data.story })
        //     setWords(res.data.prompts)
        //     setTemplate(res.data.story)
        // });

        API.getTemplatesByCategoryAndLanguage(props.location.state.cat[0], props.location.state.lang[0]).then((res) => {
            console.log(res);
            console.log(res.data.prompts);
            setStory({ details: res.data[0].story, title: res.data[0].title })
            setWords(res.data[0].prompts)
        });


    }, []);

    const onChange = (e) => {
        const value = e.target.value;
        const index = e.target.dataset.index
        userValues[index] = value
        setUserValues(userValues)
    }

    const onSubmit = (e) => {
        // make sure user filled all inputs
        // if (!Object.keys(userValues).length === words.length) {
        //     alert("Please fill in all values");
        //     return;
        // }

        let userStory = story.details;
        let styledStory = story.details;

        for (let i = 0; i < words.length; i++) {
            userStory = userStory.replace("___", userValues[i] || "blank");

            const placeholder = "(" + i + ")___";
            styledStory = styledStory.replace("___", placeholder)
            if (!userValues[i]) {
                userValues[i] = "blank"
            }
            styledStory = styledStory.split(placeholder).join("<button class='inputWords'>" + userValues[i] + "</button>");
        }

        setTemplate(styledStory);
        setUserStory(userStory);
    }

    return (
        <div>
            {
                words && (
                    <>
                        {words.map((element, i) => {
                            return <input className="word-input" data-index={i} placeholder={element} onChange={onChange} />
                        })}
                        <button onClick={() => onSubmit()} className="submit-btn">SUBMIT</button>
                    </>
                )
            }
            {
                userStory && (
                    <SpeechContainer
                        story={userStory}
                        styledStory={styledTemplate}

                    />

                )
            }


        </div>

    );
}

export default withRouter(Create);

