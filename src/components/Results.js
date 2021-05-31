import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import DetailsPage from "./DetailsPage";

function Results({ repos, selectedLanguage, isSubmitted }) {
  const [results, setResults] = useState(repos);
  const [isDetailClick, setIsDetailClick] = useState(false);
  const [repoDetail, setRepoDetail] = useState({});

  const detailRepo = (value) => {
    setRepoDetail(value);
    setIsDetailClick(true);
    console.log(repoDetail);
  };

  useEffect(() => {
    if (selectedLanguage && selectedLanguage !== "default") {
      selectedLanguage = selectedLanguage === "null" ? null : selectedLanguage;
      const resultByLanguage = repos.filter(
        ({ language }) => selectedLanguage === language
      );

      setResults(resultByLanguage);
    } else {
      setResults(repos);
    }
    setIsDetailClick(false)

  }, [repos, selectedLanguage]);

  if (repos.length === 0 && isSubmitted) {
    return <div>No repo found</div>;
  } else {
    return (
      <div>
        {results.map((repo) => {
          return (
            <div
              onClick={() => {
                detailRepo(repo);
              }}
              key={repo.id}
            >
              {repo.full_name}
            </div>
          );
        })}
        {isDetailClick && <DetailsPage repoDetail={repoDetail} />}
      </div>
    );
  }
}

export default Results;
