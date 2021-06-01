import React from "react";
import { Button, Modal } from "react-bootstrap";

function DetailsPage({ repoDetail, isDetailClick, toggleModal }) {
  return (
    <>
      {/* Modal -- a modal will popup with repo details */}
      <Modal show={isDetailClick} animation={false}>
        <Modal.Header>{repoDetail.name} </Modal.Header>
        <Modal.Body>
          <div>Owner: {repoDetail.owner ? repoDetail.owner.login : ""} </div>
          <div>Description: {repoDetail.description} </div>
          <div>Language: {repoDetail.language} </div>
          <div>Number of stars: {repoDetail.stargazers_count} </div>
          <div>Number of forks: {repoDetail.forks_count} </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn" onClick={() => toggleModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailsPage;
