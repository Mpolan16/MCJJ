import React from "react";
import './index.css';

function CreateTemplateSidebar(props) {
  return (
    <div id="sideBarDiv">
        <h5>Want to update or delete one of your templates?</h5>
        <button id="btnNew" className="btn btn-primary m-1 sidebarbtn" onClick={props.newTemplate}>
            New Template
        </button>                       
    
        <button id="btnUpdate" className="btn btn-primary m-1 sidebarbtn" onClick={props.updateTemplate}>
            Update Template
        </button>             
        
        <button id="btnDelete" className="btn btn-primary m-1 sidebarbtn" onClick={props.deleteTemplate}>
            Delete Template
        </button>
    </div>
  );
}

export default CreateTemplateSidebar;