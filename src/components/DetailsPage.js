import React from "react";
import { Button, Modal } from "react-bootstrap";

function DetailsPage({ repoDetail, isDetailClick, toggleModal }) {
  return (
    <>
      {/* Modal -- a modal will popup with details */}
      <Modal show={isDetailClick} animation={false}>
        <Modal.Header>Repo: {repoDetail.name} </Modal.Header>
        <Modal.Body>
          <div>Description: {repoDetail.description} </div>
          <div>Number of stars: {repoDetail.stargazers_count} </div>
          <div>Language: {repoDetail.language} </div>
          <div>Owner: {repoDetail.owner ? repoDetail.owner.login : ""} </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => toggleModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailsPage;
