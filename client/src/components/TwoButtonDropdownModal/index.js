import React from "react";
import "./index.css";
import Modal from "react-bootstrap/Modal";


function TwoButtonDropdownModal(props) {
  return (
    <>
        <Modal id="twobtnmodal" show={props.show} 
        onHide={props.onHide}
        backdrop="static">
            <Modal.Header id="header" closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="body">
                    <select id="selectDropdown"
                        onChange={props.onChange}
                        value={props.value}>
                        {props.dropDownValues.map(currentItem =>( <option key={currentItem._id} value={currentItem._id}>{currentItem.title}</option>))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="mb-3 closeBtn" onClick={props.onClickClose}>
                {props.closeButtonText}
                </button>
                <button id={props.selectButtonText} className="mb-3 selectBtn" onClick={props.onClickSelect}>
                {props.selectButtonText}
                </button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default TwoButtonDropdownModal;