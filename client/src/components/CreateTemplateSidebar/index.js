import React from "react";
import './index.css';
import Image from "react-bootstrap/Image";

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

        <div>
          <Image id = "templateChar" src = "../../Assets/template.png" />
        </div>
    </div>
  );
}

export default CreateTemplateSidebar;