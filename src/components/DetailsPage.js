import React from "react";

function DetailsPage({ repoDetail }) {
  return (
    <>
      <div>Repo: {repoDetail.full_name} </div>
      <div>Description: {repoDetail.description} </div>
      <div>Number of stars: {repoDetail.stargazers_count} </div>
      <div>Language: {repoDetail.language} </div>
      <div>Owner: {repoDetail.owner.login} </div>
    </>
  );
}

export default DetailsPage;
