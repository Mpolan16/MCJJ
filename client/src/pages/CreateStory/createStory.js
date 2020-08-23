import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";
import API from "../../utils/API.js";
import SpeechContainer from "../../components/readStory.js"
import { withRouter } from "react-router-dom";
import './createStory.css';


function Create(props) {
    const [words, setWords] = useState(null)
    const [userValues, setUserValues] = useState({});
    const [story, setStory] = useState({})
    const [userStory, setUserStory] = useState();
    const [styledTemplate, setTemplate] = useState();
    const [newStory, setNewStory] = useState(0);



    useEffect(() => {

        console.log(props);
        // console.log("Category",props.location.state.category)    
        // console.log("Language",props.location.state.language)    

        // API.getTemplateById("5f3f11ff535fed30f454d6a3").then((res) => {

        //     setStory({ details: res.data.story, title: res.data.story })
        //     setWords(res.data.prompts)
        //     setTemplate(res.data.story)
        // });

        API.getTemplatesByCategoryAndLanguage(props.location.state.cat, props.location.state.lang).then((res) => {
        //API.getTemplatesByCategoryAndLanguage('Funny', 'English').then((res) => {            
            const nbrStories = res.data.length;
            //console.log(nbrStories)
            const randomStory = Math.floor(Math.random() * nbrStories); 
            //console.log(res.data[randomStory].story)
            setStory({ details: res.data[randomStory].story, title: res.data[randomStory].title })
            setWords(res.data[randomStory].prompts)
        });


    }, [newStory]);

    const onNewStory = (e) => {
        setNewStory(Math.random())
        setUserStory(null)
        setStory(null)
        setWords(null)
    }

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

            const placeholder = i + "___";
            styledStory = styledStory.replace("___", placeholder)
            if (!userValues[i]) {
                userValues[i] = "blank"
            }
            styledStory = styledStory.split(placeholder).join("<button class='inputWord'>" + userValues[i] + "</button>");
        }

        setTemplate(styledStory);
        setUserStory(userStory);
    }

    return (
        <Container>
            <Card className="text-center" id = "wordEntry">
                <h3 id = "enterWords">Enter a word for each blank:</h3>
                    <Card.Body>
                        {words && (
                                <>
                                    {words.map((element, i) => {
                                        return <input className="word-input" data-index={i} key={i} placeholder={element} onChange={onChange} />
                                    })}
                                    <div>
                                        <button  onClick={() => onSubmit()} className="submit-btn">SUBMIT</button>
                                    </div>
                                </>
                        )}
                    </Card.Body>
            </Card>
            {userStory && (
                    <SpeechContainer
                        story={userStory}
                        styledStory={styledTemplate}
                        onNewStory={onNewStory}
                    />
            )}

        </Container>

    );
}

export default withRouter(Create);

