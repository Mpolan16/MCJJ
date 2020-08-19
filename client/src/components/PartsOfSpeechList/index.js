import React from "react";
import './index.css';

function PartsOfSpeechList(props) {
  return (
    <div id="partsOfSpeechDiv">
      <h5>Parts of speech to use</h5>
      <div id="listPartsOfSpeech">                            
          {props.partsOfSpeech.partOfSpeech.map(partOfSpeech =>(
          <div key={partOfSpeech._id}
              onDragStart={props.onDragStart}
              onDoubleClick={props.onDoubleClick}
              draggable
              className="draggable"
              data-name={partOfSpeech.partOfSpeech}>
              <p className="partOfSpeech">{partOfSpeech.partOfSpeech}</p>
          </div>          
          ))}          
      </div> 
      <p>Drag a part of speech into the text area, or double click one!</p>
      {/* <p>Don't see a part of speech you want to use?  Just type ## before something you want to use!  Don't forget to use underscores for spaces!!  (For example, ##Name_Of_Planet)</p>  */}
    </div>
  );
}

export default PartsOfSpeechList;