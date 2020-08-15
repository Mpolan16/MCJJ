import React from "react";
import "./index.css";
import Modal from "react-bootstrap/Modal";


function OneButtonSimpleModal(props) {
  return (
    <>
        <Modal id="onebtnmodal" show={props.show} 
        onHide={props.onHide}
        backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="body">
                    <p>{props.body}</p>                    
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary mb-3" onClick={props.onClickClose}>
                {props.closeButtonText}
                </button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default OneButtonSimpleModal;