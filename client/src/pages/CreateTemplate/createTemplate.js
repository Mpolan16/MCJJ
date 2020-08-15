//TODOS:
//
//where is the userid coming from?
//error handling if user doesnt enter title and/or text
//put the resets and save modal in a funciton...starting line 135.  One for insert, one for update, one for delete.
//modularize
//change the category dropdown if spanish chosen?
//css


import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import '../../App.css'
import TwoButtonDropdownModal from "../../components/TwoButtonDropdownModal";
import OneButtonSimpleModal from "../../components/OneButtonSimpleModal";

function CreateTemplate() {
  const [partsOfSpeech, setPartsOfSpeech] = useState({
    partOfSpeech: []
  });  

  const [template, setTemplate] = useState({
    id: "",
    text: "",
    selectionStart: 0,
    selectionEnd: 0
  });  

  const [userTemplates, setUserTemplates] = useState({
    userTemplates: []
  });

  const { register, handleSubmit, setValue, errors} = useForm();
  
  const [buttonModalState, setButtonModalState] = useState({
    title: "",
    closeBtnText: "",
    selectBtnText: ""
  });

  const [successModalState, setSuccessModalState] = useState({
    title: "",
    body: ""
  });
  
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [templateID, setTemplateID] = useState();  


  useEffect(() => {
    APIgetAllPartsOfSpeech();
    APIgetAllTemplatesByUser("jtest@hotmail.com");  //hardcoded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  need to figure out where userid is coming from
  }, []);

  const APIgetAllPartsOfSpeech = () => {
    API.getAllPartsOfSpeech()
      .then(res => {        
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
          setPartsOfSpeech({partOfSpeech: res.data});
      })
     .catch(err => console.log(err));
  }

  const APIgetAllTemplatesByUser = (userid) => {
    API.getTemplatesByUser(userid)
      .then(res => {        
          if (res.data.status === "error") {
              throw new Error(res.data.message);
          }
          let array = res.data[0].storytemplates
          array.unshift({_id: "empty", value:"test"})          
          //setUserTemplates({userTemplates: res.data[0].storytemplates});
          setUserTemplates({userTemplates: array});
      })
      .catch(err => console.log(err));
  }  
  
  const APIgetTemplateById = (id) => {    
    let promptCounter = 0
    let splitStory = [];    

    API.getTemplateById(id)
      .then(res => {                    
        
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }

        splitStory = res.data.story.split(" ");
        for (let i=0; i<splitStory.length; i++) {          
          if(splitStory[i].indexOf( "___") >= 0) {  //returns -1 if not found.
            //the original value that is returned will look like ex. (1)Noun or (2)Name Of City.  this line removes the numbers in parens and replaces with
            //##.  (ex (1)Noun becomes ##Noun and (2)Name Of City becomes ##Name Of City).  Additionally, if a prompt has spaces, those are replaced with _.
            //(ex ##Name Of City becomes ##Name_Of_City)
            splitStory[i] = replaceSpacesWithUnderscore("##" + res.data.prompts[promptCounter].substring(res.data.prompts[promptCounter].indexOf(")") + 1));            
            promptCounter++
          }
        }

        //populate the template, the title, language, and category but join splitStory
        setTemplate({id: res.data._id, text: splitStory.join(" ")});
        setValue("title", res.data.title);
        setValue("language", res.data.language); 
        setValue("category", res.data.category);    
      })
      .catch(err => console.log(err));      
  }      

  const APIinsertNewTemplate = (data) => {

    API.insertTemplate({
      title: data.title,
      story: data.story,
      prompts: data.prompts,
      category: data.category,
      language: data.language,
      userid: "jtest@hotmail.com"     //need to consider this!!!!!!! - where is the userid coming from???
    })
      .then(res => {       
        if (res.data.status === "error") {
            throw new Error(res.data.message);
        } 

        resetPage("save")
      })
      .catch(err => console.log(err));  
    }

  const resetPage = (saveOrDelete) => {
    if (saveOrDelete === "save") {
      setSuccessModalState({title:"Successful Save", body:"Template successfully saved!"})
    }
    else {
      setSuccessModalState({title:"Successful Delete", body:"Template successfully deleted!"})
    }

    setTemplate({
      id: "",
      text: ""
    });
    //reset back to empty values.
    setValue("title", "");
    setValue("language", "English"); 
    setValue("category", "Funny");           
    setButtonModalState({closeBtnText: "Close"})
    APIgetAllTemplatesByUser("jtest@hotmail.com");  //hardcoded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  need to figure out where userid is coming from
    handleShowSuccessModal();
  }

  const APIupdateExistingTemplate = (data) => {
    API.updateTemplate({
      id: data.id,
      title: data.title,
      story: data.story,
      prompts: data.prompts,
      category: data.category,
      language: data.language
    })
      .then(res => {       
        if (res.data.status === "error") {
            throw new Error(res.data.message);
        } 
        resetPage("save")        
      })
      .catch(err => console.log(err));  
  }
  
  const APIdeleteExistingTemplate = (data) => {
    API.deleteTemplate({
      id: data.id,
      userid: data.userid
    })
      .then(res => {             
        resetPage("delete")  
      })
      .catch(err => console.log(err));  
}

  const handleShowSuccessModal = () => setShowSuccessModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleCloseTemplateModal = () => setShowTemplateModal(false);
  const handleShowTemplateModal = (event) => {
    if (event.target.id === "btnDelete") {
      setButtonModalState({title: "Delete A Template", closeBtnText: "Close", selectBtnText: "Delete"})
    }
    else {
      setButtonModalState({title: "Update A Template", closeBtnText: "Close", selectBtnText: "Select"})
    }
    setShowTemplateModal(true)
  };

  const handleSelectTemplateModal = (event) => {      
    if (event.target.id==="Select") {
      if (templateID !== undefined && templateID !== "empty") {
        APIgetTemplateById(templateID)
      }    
    }
    else if (event.target.id==="Delete") {
      deleteTemplate()
    }    
    setShowTemplateModal(false);
  }  

  const onDragStart = (event) => {
    event.dataTransfer.setData("partOfSpeech", event.currentTarget.dataset.name);
  }
  
	const onDragOver = (event) => {
    event.preventDefault();
	}

	const onDrop = (event) => {
    let partOfSpeech = event.dataTransfer.getData("partOfSpeech");
    partOfSpeech = replaceSpacesWithUnderscore(partOfSpeech)
    addPartOfSpeechToTemplate(event,partOfSpeech);
  }

  const onDoubleClick = (event) => {             
    let partOfSpeech = event.currentTarget.dataset.name;
    partOfSpeech = replaceSpacesWithUnderscore(partOfSpeech)
    addPartOfSpeechToTemplate(event,partOfSpeech);    
  };    

  const replaceSpacesWithUnderscore = (partOfSpeech) => {
    if (partOfSpeech.search(" ") > 0 ) {      
      partOfSpeech = partOfSpeech.replace(/\s/g,'_')
    }
    return partOfSpeech;
  }

  const replaceUnderscoreWithSpaces = (partOfSpeech) => {    
    if (partOfSpeech.search("_") > 0 ) {      
      partOfSpeech = partOfSpeech.replace(/_/g,' ')
    }
    return partOfSpeech;
  }  
  
  const onTemplateDropDownClick = (event) => { 
    setTemplateID(event.target.value)    
  };  

  const addPartOfSpeechToTemplate = (event, partOfSpeech) => {
    let dataOnDrop = ""
    let textBeforeCursorPosition = ""
    let textAfterCursorPosition = "" 
  
    if (template.text === "")  {
        dataOnDrop = "##" + partOfSpeech
    }
    else {
      //if the selection start and selection end are the same, cursor is either in a position in the text, OR
      //it is at the end.  Place the selected value at the cursor spot
      if (template.selectionStart === template.selectionEnd) {  
          textBeforeCursorPosition = template.text.substring(0, template.selectionStart)
          textAfterCursorPosition = template.text.substring(template.selectionStart, template.text.length)

          //cursor is at the end
          if (template.selectionStart === undefined) {
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
          textBeforeCursorPosition = template.text.substring(0, template.selectionStart)
          textAfterCursorPosition = template.text.substring(template.selectionEnd, template.text.length)

          dataOnDrop = textBeforeCursorPosition + "##" + partOfSpeech +  textAfterCursorPosition
      }
    }     
    
    setTemplate({...template, text: dataOnDrop});
    
  }

  const handleInputChange = event => {
    //keep track of entered text, plus location of the cursor
    const selectionStart = event.target.selectionStart
    setTemplate({...template, text: event.target.value, selectionStart: selectionStart, selectionEnd: selectionStart})
  };

  const handleTextAreaClick = event => {
    //handles the select start and end by clicking or by clicking and holding to select a section of code.
    const selectionStart = event.target.selectionStart
    const selectionEnd = event.target.selectionEnd
    setTemplate({...template, selectionStart: selectionStart, selectionEnd: selectionEnd})
  }

  const handleArrowMoves = event => {
    //if user presses any of the arrows while in the text, the selectionstart is set.
    switch (event.keyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        const selectionStart = event.target.selectionStart
        setTemplate({...template, selectionStart: selectionStart, selectionEnd: selectionStart})
        break;
      default:
        break;
    }
  }

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
          promptPart = replaceUnderscoreWithSpaces(individualWords[i].substring(0,stringFound))
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
            promptPart = replaceUnderscoreWithSpaces(individualWords[i].substring(anotherPromptFound,individualWords[i].length))
            //put the prompt into the prompt array.  (ex. "##Noun" should be saved as "(1)Noun")
            prompts.push("(" + promptCounter + ")" + promptPart.substring(2,promptPart.length))        
            //replace the prompt only with the ___ (ex. "##Noun." should be saved as "___."")
           
            individualWords[i] = individualWords[i].replace(promptPart,"___")
            //increment the prompt counter.
            promptCounter++
          }
        }
        else {
          promptPart = replaceUnderscoreWithSpaces(individualWords[i].substring(2,individualWords[i].length))                  
          //Otherwise, the prompt appears in the middle of a sentence.  Put the part of speech into the prompts array, 
          //and increment the prompt counter (for the count inside the "()" thingie - should look like "(1)Noun")        
          prompts.push("(" + promptCounter + ")" + promptPart)        

          //replace the word with ___
          individualWords[i] = "___"
          //increment the prompt counter.
          promptCounter++
        }
      }
    }


    //put the paragraph back together like humpty dumpty
    builtParagraph = individualWords.join(" ")

    const objectToPass = {
      id: template.id,
      title: data.title,
      story: builtParagraph,
      prompts: prompts,
      category: data.category,
      language: data.language,
      userid: "jtest@hotmail.com"     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!need to consider this!!!!!!! - where is the userid coming from???      
    }
    
    //if the id is undefined or if the id is "", that should mean that this is a new template
    if (template.id === undefined || template.id === "") {
      APIinsertNewTemplate(objectToPass);
    }
    //otherwise, it is an already existing template that needs to be updated.
    else {
      APIupdateExistingTemplate(objectToPass)
    }
  };

  const deleteTemplate = () => {   
      const objectToPass = {
      id: templateID,      
      userid: "jtest@hotmail.com"     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!need to consider this!!!!!!! - where is the userid coming from???      
    }
    APIdeleteExistingTemplate(objectToPass)    
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
            <input name="title" 
              aria-invalid={errors.title ? "true" : "false"}              
              ref={register({ required: true })}/>
              { errors.title && (
                  <span role="alert">
                    This field is required
                  </span>
                )
              }            
            <label htmlFor="category">Category:</label>
            <select ref={register} name="category">
              <option value="Funny">Funny</option>
              <option value="Scary">Scary</option>
              <option value="Fables">Fables</option>              
              <option value="Cuentos">Cuentos</option>              
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
                onClick={handleTextAreaClick}
                onKeyUp={handleArrowMoves}
                value={template.text}
                name="text"
                aria-invalid={errors.text ? "true" : "false"}
                ref={register({ required: true })}>
            </textarea>
            { errors.text && (
                  <span role="alert">
                    This field is required
                  </span>
                )
              }          
            <br></br>            
            <input type="submit" />
          </form>
          <br></br>
          <br></br>          
          <button id="btnDelete" className="btn btn-primary mb-3" onClick={handleShowTemplateModal}>
            Delete Template
          </button>

          <button id="btnUpdate" className="btn btn-primary mb-3" onClick={handleShowTemplateModal}>
            Launch update modal
          </button>          

          <TwoButtonDropdownModal
            title={buttonModalState.title}
            show={showTemplateModal}
            onHide={handleCloseTemplateModal}
            onChange={onTemplateDropDownClick}
            value={templateID}
            dropDownValues={userTemplates.userTemplates}
            onClickClose={handleCloseTemplateModal}
            onClickSelect={handleSelectTemplateModal}
            closeButtonText={buttonModalState.closeBtnText}
            selectButtonText={buttonModalState.selectBtnText}/>

          <OneButtonSimpleModal
            title={successModalState.title}
            show={showSuccessModal}
            onHide={handleCloseSuccessModal}            
            body={successModalState.body}
            onClickClose={handleCloseSuccessModal}            
            closeButtonText={buttonModalState.closeBtnText}/>      
            

      </div>    
    </div>
    
  );
}

export default CreateTemplate;