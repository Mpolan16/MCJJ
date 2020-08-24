import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import firebase from "firebase";
import TwoButtonDropdownModal from "../../components/TwoButtonDropdownModal";
import OneButtonSimpleModal from "../../components/OneButtonSimpleModal";
import PartsOfSpeechList from "../../components/PartsOfSpeechList"
import CreateTemplateSidebar from "../../components/CreateTemplateSidebar"
import { Container, Row, Col } from "react-bootstrap";
import './createTemplate.css'

function CreateTemplate() {

  const [currentUser, setCurrentUser] = useState();

  const [partsOfSpeech, setPartsOfSpeech] = useState({
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

  const { register, handleSubmit, setValue, errors } = useForm();

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


  useEffect(() => {
    async function getCurrentUser() {
      try {
        await firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            setCurrentUser(user.email)
          }
        })
      }
      catch (err) {
        console.log(err);
      }
    }
    getCurrentUser();
    APIgetAllPartsOfSpeech();
  }, []);

  const APIgetAllPartsOfSpeech = () => {
    API.getAllPartsOfSpeech()
      .then(res => {
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        setPartsOfSpeech({ partOfSpeech: res.data });
      })
      .catch(err => console.log(err));
  }

  const APIgetAllTemplatesByUser = (userid) => {
    API.getTemplatesByUser(userid)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        let array = res.data[0].storytemplates
        array.unshift({ _id: "empty", value: "test" })
        //setUserTemplates({userTemplates: res.data[0].storytemplates});
        setUserTemplates({ userTemplates: array });
      })
      .catch(err => console.log(err));
  }

  const APIgetTemplateById = (id) => {
    let promptCounter = 0
    let splitStory = [];

    API.getTemplateById(id)
      .then(res => {

        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }

        splitStory = res.data.story.split(" ");
        for (let i = 0; i < splitStory.length; i++) {
          if (splitStory[i].indexOf("___") >= 0) {  //returns -1 if not found.
            //if a prompt has spaces, those are replaced with _.  Add ## at the beginning to signify a prompt
            let currentPrompt = replaceSpacesWithUnderscore(res.data.prompts[promptCounter])
            currentPrompt = "##" + currentPrompt
            splitStory[i] = splitStory[i].replace("___", currentPrompt);
            promptCounter++
          }
        }

        //populate the template, the title, language, and category but join splitStory
        setTemplate({ id: res.data._id, text: splitStory.join(" ") });
        setValue("title", res.data.title);
        setValue("language", res.data.language);
        setValue("category", res.data.category);
      })
      .catch(err => console.log(err));
  }

  const APIinsertNewTemplate = (data) => {

    //console.log(data)

    API.insertTemplate({
      title: data.title,
      story: data.story,
      prompts: data.prompts,
      category: data.category,
      language: data.language,
      userid: currentUser
    })
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }

        resetPage("save")
      })
      .catch(err => console.log(err));
  }

  const resetPage = (saveOrDelete) => {
    if (saveOrDelete === "save") {
      setSuccessModalState({ title: "Successful Save", body: "Template successfully saved!" })
    }
    else {
      setSuccessModalState({ title: "Successful Delete", body: "Template successfully deleted!" })
    }

    setTemplate({
      id: "",
      text: ""
    });
    //reset back to empty values.
    setValue("title", "");
    setValue("language", "English");
    setValue("category", "Funny");
    setButtonModalState({ closeBtnText: "Close" })
    APIgetAllTemplatesByUser(currentUser);
    handleShowSuccessModal();
  }

  const prepareNewTemplate = () => {
    setTemplate({
      id: "",
      text: ""
    });
    //reset back to empty values.
    setValue("title", "");
    setValue("language", "English");
    setValue("category", "Funny");
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
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        resetPage("save")
      })
      .catch(err => console.log(err));
  }

  const APIdeleteExistingTemplate = (data) => {
    API.deleteTemplate({
      id: data.id,
      userid: data.userid
    })
      .then(res => {
        resetPage("delete")
      })
      .catch(err => console.log(err));
  }

  const handleShowSuccessModal = () => setShowSuccessModal(true);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseTemplateModal = () => setShowTemplateModal(false);
  const handleShowTemplateModal = (event) => {
    APIgetAllTemplatesByUser(currentUser)
    if (event.target.id === "btnDelete") {
      setButtonModalState({ title: "Delete A Template", closeBtnText: "Close", selectBtnText: "Delete" })
    }
    else {
      setButtonModalState({ title: "Update A Template", closeBtnText: "Close", selectBtnText: "Select" })
    }
    setShowTemplateModal(true)
  };

  const handleSelectTemplateModal = (event) => {
    if (event.target.id === "Select") {
      if (templateID !== undefined && templateID !== "empty") {
        APIgetTemplateById(templateID)
      }
    }
    else if (event.target.id === "Delete") {
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
    addPartOfSpeechToTemplate(event, partOfSpeech);
  }

  const onDoubleClick = (event) => {
    let partOfSpeech = event.currentTarget.dataset.name;
    partOfSpeech = replaceSpacesWithUnderscore(partOfSpeech)
    addPartOfSpeechToTemplate(event, partOfSpeech);
  };

  const replaceSpacesWithUnderscore = (partOfSpeech) => {
    if (partOfSpeech.search(" ") > 0) {
      partOfSpeech = partOfSpeech.replace(/\s/g, '_')
    }
    return partOfSpeech;
  }

  const replaceUnderscoreWithSpaces = (partOfSpeech) => {
    if (partOfSpeech.search("_") > 0) {
      partOfSpeech = partOfSpeech.replace(/_/g, ' ')
    }
    return partOfSpeech;
  }

  const onTemplateDropDownClick = (event) => {
    setTemplateID(event.target.value)
  };

  const addPartOfSpeechToTemplate = (event, partOfSpeech) => {
    let dataOnDrop = ""
    let textBeforeCursorPosition = ""
    let textAfterCursorPosition = ""

    if (template.text === "") {
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

        dataOnDrop = textBeforeCursorPosition + "##" + partOfSpeech + textAfterCursorPosition
      }
    }

    setTemplate({ ...template, text: dataOnDrop });

  }

  const handleInputChange = event => {
    //keep track of entered text, plus location of the cursor
    const selectionStart = event.target.selectionStart
    setTemplate({ ...template, text: event.target.value, selectionStart: selectionStart, selectionEnd: selectionStart })
  };

  const handleTextAreaClick = event => {
    //handles the select start and end by clicking or by clicking and holding to select a section of code.
    const selectionStart = event.target.selectionStart
    const selectionEnd = event.target.selectionEnd
    setTemplate({ ...template, selectionStart: selectionStart, selectionEnd: selectionEnd })
  }

  const handleArrowMoves = event => {
    //if user presses any of the arrows while in the text, the selectionstart is set.
    switch (event.keyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        const selectionStart = event.target.selectionStart
        setTemplate({ ...template, selectionStart: selectionStart, selectionEnd: selectionStart })
        break;
      default:
        break;
    }
  }

  const saveTemplate = (data) => {
    let individualWords = []
    let prompts = []
    let promptPart = ""
    let stringFound = 0
    let anotherPromptFound = 0
    let builtParagraph = ""

    individualWords = template.text.split(" ");
    for (let i = 0; i < individualWords.length; i++) {
      //look for any added parts of speech.
      stringFound = individualWords[i].search("##")
      //if a part of speech is found, that ## word needs to be replaced with "___" and the prompts array populated
      if (stringFound >= 0) {
        //If a punctuation mark, or new line or other weirdness appears, HOPEFULLY it is a prompt at the end of sentence and/or a new paragraph/newline.
        //If found, replace the prompt part ONLY with ___, and save the prompt correctly.
        stringFound = individualWords[i].search(/[.,/!$%^&*;:{}=`~()]/g)  //removed #, -, and _ from this list.
        if (stringFound > 0) {
          //if code gets in here, that means most likely a new line or a punctuation.
          //break it down into just the prompt piece (ex, so "##Noun." should be "##Noun" )
          promptPart = replaceUnderscoreWithSpaces(individualWords[i].substring(0, stringFound))
          //put the prompt into the prompt array.  (ex. "##Noun" should be saved as "Noun")
          prompts.push(promptPart.substring(2, promptPart.length))
          //replace the prompt only with the ___ (ex. "##Noun." should be saved as "___."")
          individualWords[i] = individualWords[i].replace(promptPart, "___")

          //extreme edge case.  if there happens to be more than one prompt in 'part', then need to replace that one too.  This assumes
          //that correct grammar has been used - ie, there are spaces where they are supposed to be.
          //(ex. ##Noun.\n\n##Adjective really needs to be saved as "___.\n\n___")
          anotherPromptFound = individualWords[i].search('##')
          if (anotherPromptFound > 0) {
            promptPart = replaceUnderscoreWithSpaces(individualWords[i].substring(anotherPromptFound, individualWords[i].length))
            //put the prompt into the prompt array.  (ex. "##Noun" should be saved as "Noun")
            prompts.push(promptPart.substring(2, promptPart.length))
            //replace the prompt only with the ___ (ex. "##Noun." should be saved as "___."")           
            individualWords[i] = individualWords[i].replace(promptPart, "___")
          }
        }
        else {
          promptPart = replaceUnderscoreWithSpaces(individualWords[i].substring(2, individualWords[i].length))
          //Otherwise, the prompt appears in the middle of a sentence.  Put the part of speech into the prompts array   
          prompts.push(promptPart)
          //replace the word with ___
          individualWords[i] = "___"
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
      userid: currentUser
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
      userid: currentUser
    }
    APIdeleteExistingTemplate(objectToPass)
  };

  return (
    <Container>
      <div className="drag-container">
        <Row id = "templatePage">
          <Col lg={1}>
          </Col>
          <Col lg={5}>

            <form onSubmit={handleSubmit(saveTemplate)}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input className="form-control" name="title"
                  aria-invalid={errors.title ? "true" : "false"}
                  ref={register({ required: true })} />
                {errors.title && (
                  <>
                    <span class="noentry" role="alert">
                      The title is required!
                      </span>
                  </>
                )
                }
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select className="form-control" ref={register} name="category">
                  <option value="Funny">Funny</option>
                  <option value="Scary">Scary</option>
                  <option value="Fables">Fables</option>
                  <option value="Cuentos">Cuentos</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="language">Language:</label>
                <select className="form-control" ref={register} name="language">
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="text">Story:</label>
                <textarea className="droppable form-control"
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
                {errors.text && (
                  <>
                    <span className="noentry" role="alert">
                      A story is required!
                      </span>
                  </>
                )
                }
              </div>
              <button id="btnSave" className="btn btn-primary mt-2">
                Save Template
            </button>
            </form>
          </Col>
          <Col lg={2}>
            <PartsOfSpeechList
              partsOfSpeech={partsOfSpeech}
              onDragStart={onDragStart}
              onDoubleClick={onDoubleClick} />
          </Col>
          <Col lg={2}>
            <CreateTemplateSidebar
              newTemplate={prepareNewTemplate}
              updateTemplate={handleShowTemplateModal}
              deleteTemplate={handleShowTemplateModal} />
          </Col>
        </Row>

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
          selectButtonText={buttonModalState.selectBtnText} />

        <OneButtonSimpleModal
          title={successModalState.title}
          show={showSuccessModal}
          onHide={handleCloseSuccessModal}
          body={successModalState.body}
          onClickClose={handleCloseSuccessModal}
          closeButtonText={buttonModalState.closeBtnText} />
      </div>
    </Container>
  );
}

export default CreateTemplate;