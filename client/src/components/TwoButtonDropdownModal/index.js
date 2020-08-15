import React from "react";
import "./index.css";
import Modal from "react-bootstrap/Modal";


function TwoButtonDropdownModal(props) {
  return (
    <>
        <Modal id="twobtnmodal" show={props.show} 
        onHide={props.onHide}
        backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="body">
                    <select
                        onChange={props.onChange}
                        value={props.value}>
                        {props.dropDownValues.map(currentItem =>( <option key={currentItem._id} value={currentItem._id}>{currentItem.title}</option>))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary mb-3" onClick={props.onClickClose}>
                {props.closeButtonText}
                </button>
                <button id={props.selectButtonText} className="btn btn-primary mb-3" onClick={props.onClickSelect}>
                {props.selectButtonText}
                </button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default TwoButtonDropdownModal;