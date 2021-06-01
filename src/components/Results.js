import React, { useState, useEffect } from "react";
import DetailsPage from "./DetailsPage";

function Results({ repos, selectedLanguage, isSubmitted, error }) {
  const [results, setResults] = useState(repos);
  const [isDetailClick, setIsDetailClick] = useState(false);
  const [repoDetail, setRepoDetail] = useState({});

  const detailRepo = (value) => {
    setRepoDetail(value);
    setIsDetailClick(true);
  };

  const toggleModal = () => {
    setIsDetailClick(false);
  };

  // The effect will be re-run everytime the repos and selectedLanguage values change
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (selectedLanguage && selectedLanguage !== "default") {
      selectedLanguage = selectedLanguage === "null" ? null : selectedLanguage;
      const resultByLanguage = filterByLanguage(repos, selectedLanguage)
      setResults(resultByLanguage);
    } else {
      setResults(repos);
    }
  }, [repos, selectedLanguage]);

  if (repos.length === 0 && isSubmitted && !error) {
    return <div>No repo found</div>;
  } else {
    return (
      <div style={{ marginTop: "10px" }}>
        {results.map((repo) => {
          return (
            <div
              className="input-form"
              onClick={() => {
                detailRepo(repo);
              }}
              key={repo.id}
            >
              {repo.full_name}
            </div>
          );
        })}

        <DetailsPage
          isDetailClick={isDetailClick}
          toggleModal={toggleModal}
          repoDetail={repoDetail}
        />
      </div>
    );
  }
}

export const filterByLanguage = (repos, selectedLanguage) => {
  return repos.filter(({ language }) => selectedLanguage === language);
};

export default Results;
