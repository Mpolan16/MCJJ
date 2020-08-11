//TODOS:
//
//where is the userid coming from?
//error handling if user doesnt enter title and/or text
//modularize
//modal showing success?
//list of templates already saved by a user
//update/delete capability on existing templates
//css


import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../utils/API"
import '../App.css';

function CreateTemplate() {

  const [partsOfSpeech, setPartsOfSpeech] = useState({
    partOfSpeech: []
  });  
  const [template, setTemplate] = useState({
    id: "",
    text: ""
  });
  const { register, handleSubmit, setValue} = useForm();

  useEffect(() => {
    API.getAllPartsOfSpeech()
      .then(res => {        
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
          setPartsOfSpeech({partOfSpeech: res.data});
          //setTemplate("this is a test message")
          
      })
      //.catch(err => setError(err));
  }, []);


  const onDragStart = (event) => {
      //console.log(event.currentTarget.dataset.name)
    	event.dataTransfer.setData("partOfSpeech", event.currentTarget.dataset.name);
  }
  
	const onDragOver = (event) => {
	    event.preventDefault();
	}

	const onDrop = (event) => {
      //console.log(event.dataTransfer.getData("partOfSpeech"))
      addPartOfSpeechToTemplate(event,event.dataTransfer.getData("partOfSpeech"));
  }

  const onDoubleClick = event => {             
    addPartOfSpeechToTemplate(event,event.currentTarget.dataset.name);      
  };    

  const addPartOfSpeechToTemplate = (event, partOfSpeech) => {
    let dataOnDrop = ""
    let textBeforeCursorPosition = ""
    let textAfterCursorPosition = ""

    //console.log(template.substring(0, event.target.selectionStart))
    //console.log(template)
  
    if (template.text === "")  {
        dataOnDrop = "##" + partOfSpeech
    }
    else {
      //if the selection start and selection end are the same, cursor is either in a position in the text, OR
      //it is at the end.  Place the selected value at the cursor spot
      if (event.target.selectionStart === event.target.selectionEnd) {  
          textBeforeCursorPosition = template.text.substring(0, event.target.selectionStart)
          textAfterCursorPosition = template.text.substring(event.target.selectionStart, template.text.length)

          //***** */
          //there is a bug that can occur here if the user double clicks a part of speech, then immediately
          //attempts to drag another part of speech in.  The 'selectionStart' becomes zero, and the dragged
          //part of speech is placed at position 0.  This is not really a logical process for a user to follow,
          //so I have moved on at this point - JLD
          //***** */

          //cursor is at the end
          if (event.target.selectionStart === undefined) {
              dataOnDrop = textBeforeCursorPosition.trim() + " ##" + partOfSpeech
          }    
          else if (textAfterCursorPosition.trim() === "") {              
            dataOnDrop = textBeforeCursorPosition.trim() + " ##" + partOfSpeech              
          }            
          else { //cursor is somewhere in the already existing text.  Add spaces and the text              
            dataOnDrop = textBeforeCursorPosition.trim() + " ##" + partOfSpeech + " " + textAfterCursorPosition                
          }            
      }
      //if selectionstart and selectionend arent the same, something was highlighted.  Replace it.
      else {
          textBeforeCursorPosition = template.text.substring(0, event.target.selectionStart)
          textAfterCursorPosition = template.text.substring(event.target.selectionEnd, template.text.length)

          dataOnDrop = textBeforeCursorPosition + "##" + partOfSpeech +  textAfterCursorPosition
      }
    }     
    
    setTemplate({text: dataOnDrop});
    
  }

  const handleInputChange = event => {
    setTemplate({text: event.target.value})
  };

  const saveTemplate = (data) => {
    let individualWords = []
    let prompts = []
    let promptCounter = 1
    let promptPart = ""
    let stringFound = 0
    let anotherPromptFound = 0
    let builtParagraph = ""
    

    individualWords = template.text.split(" ");
    for (let i=0; i<individualWords.length; i++) {
      //look for any added parts of speech.
      stringFound = individualWords[i].search("##")
      //if a part of speech is found, that ## word needs to be replaced with "___" and the prompts array populated
      if (stringFound >= 0) {        
        //If a punctuation mark, or new line or other weirdness appears, HOPEFULLY it is a prompt at the end of sentence and/or a new paragraph/newline.
        //If found, replace the prompt part ONLY with ___, and save the prompt correctly.
        stringFound = individualWords[i].search(/[.,/!$%^&*;:{}=\-`~()]/g)  //removed # and _ from this list.
        if (stringFound > 0) {
          //if code gets in here, that means most likely a new line or a punctuation.
          //break it down into just the prompt piece (ex, so "##Noun." should be "##Noun" )
          promptPart = individualWords[i].substring(0,stringFound)           
          //put the prompt into the prompt array.  (ex. "##Noun" should be saved as "(1)Noun")
          prompts.push("(" + promptCounter + ")" + promptPart.substring(2,promptPart.length))        
          //replace the prompt only with the ___ (ex. "##Noun." should be saved as "___."")
          individualWords[i] = individualWords[i].replace(promptPart,"___")
          //increment the prompt counter.
          promptCounter++          

          //extreme edge case.  if there happens to be more than one prompt in 'part', then need to replace that one too.  This assumes
          //that correct grammar has been used - ie, there are spaces where they are supposed to be.
          //(ex. ##Noun.\n\n##Adjective really needs to be saved as "___.\n\n___")
          anotherPromptFound = individualWords[i].search('##')
          if (anotherPromptFound > 0) {
            promptPart = individualWords[i].substring(anotherPromptFound,individualWords[i].length)
            //put the prompt into the prompt array.  (ex. "##Noun" should be saved as "(1)Noun")
            prompts.push("(" + promptCounter + ")" + promptPart.substring(2,promptPart.length))        
            //replace the prompt only with the ___ (ex. "##Noun." should be saved as "___."")
           
            individualWords[i] = individualWords[i].replace(promptPart,"___")
            //increment the prompt counter.
            promptCounter++
          }
        }
        else {
          //Otherwise, the prompt appears in the middle of a sentence.  Put the part of speech into the prompts array, 
          //and increment the prompt counter (for the count inside the "()" thingie - should look like "(1)Noun")        
          prompts.push("(" + promptCounter + ")" + individualWords[i].substring(2,individualWords[i].length))        

          //replace the word with ___
          individualWords[i] = "___"
          //increment the prompt counter.
          promptCounter++
        }


      }
    }

    //put the paragraph back together like humpty dumpty
    builtParagraph = individualWords.join(" ")

    //console.log(individualWords)
    // console.log(prompts)
    // console.log(builtParagraph)
    // console.log(data);    
    
    API.insertTemplate({
      title: data.title,
      story: builtParagraph,
      prompts: prompts,
      category: data.category,
      language: data.language,
      userid: "jtest@hotmail.com"     //need to consider this!!!!!!! - where is the userid coming from???
    })
      .then(res => {        
        //console.log(res.data)
        setTemplate({
          id: "",
          text: ""
        });
        //reset back to empty values.
        setValue("title", "");
        setValue("language", "English"); 
        setValue("category", "Funny");           
        //do another then and retrieve another set of data that shows the list of templates a user has created
        //do a modal showing success?
      })
  };

  //need to modularize
  return (
    <div className="other-container">
      <div className="drag-container">
          <h2 className="head">Parts Of Speech</h2>
          <div className="PartsOfSpeech">              
              <span className="group-header">list of parts</span>                
              {partsOfSpeech.partOfSpeech.map(partOfSpeech =>(
                <div key={partOfSpeech._id}
                  onDragStart={onDragStart}
                  onDoubleClick={onDoubleClick}
                  draggable
                  className="draggable"
                  data-name={partOfSpeech.partOfSpeech}>
                    {partOfSpeech.partOfSpeech}
                </div>
              ))}
          </div>            
          <br></br>
          <form onSubmit={handleSubmit(saveTemplate)}>
            <label htmlFor="title">Title:</label>
            <input name="title" ref={register} />
            <label htmlFor="category">Category:</label>
            <select ref={register} name="category">
              <option value="Funny">Funny</option>
              <option value="Scary">Scary</option>
              <option value="Other">Other</option>              
            </select>
            <label htmlFor="language">Language:</label>
            <select ref={register} name="language">
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>
            <br></br>         
            <textarea className="droppable"
                id="templateEntry"
                onDragOver={onDragOver}
                onDrop={onDrop}              
                onChange={handleInputChange}
                value={template.text}>
            </textarea>
            <br></br>            
            <input type="submit" />
          </form>

      </div>    
    </div>
  );
}

export default CreateTemplate;