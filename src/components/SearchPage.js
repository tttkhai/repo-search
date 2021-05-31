import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Results from "./Results";
import SortRepo from "./SortRepo";
import FilterLanguage from "./FilterLanguage";

export const getRepos = (input, sortValue) => {
  try {
    const githubURL = `https://api.github.com/search/repositories?q=${input}&sort=${sortValue}&per_page=50`;
    return axios.get(githubURL);
  } catch (err) {
    alert("Errors: " + err);
  }
};

function SearchPage() {
  const [userInput, setUserInput] = useState("");
  const [repos, setRepos] = useState([]);
  const [sort, setSort] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setRepos([]);

    const input = userInput.trim();

    // require user input after trim it
    if (!input || /^\s*$/.test(input)) {
      setIsSubmitted(true);
      setError("Please enter at least something");
      return;
    }
    setIsLoading(true);
    fetchRepos(input, sort);
  };

  const sortedRepo = (value) => {
    setSort(value);
    if (repos.length > 0) {
      fetchRepos(userInput, value);
    }
  };

  const fetchRepos = async (input, sortValue) => {
    console.log("fetchRepos being called");
    const result = await getRepos(input, sortValue);
    setIsSubmitted(true);
    setIsLoading(false);
    setLanguages([
      ...new Set(
        result.data.items.map(({ language }) =>
          language === null ? "null" : language
        )
      ),
    ]);
    setRepos(result.data.items);
  };

  const filterInput = (value) => {
    setSelectedLanguage(value);
  };

  const reset = () => {
    console.log("reset being invoked");
    setIsLoading(false);
    setRepos([]);
    setLanguages([]);
    setSelectedLanguage("");
    setIsSubmitted(false);
    setError("");
  };

  // After submission, the previous results will be wiped out if the users add/remove the form texts
  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
    inputRef.current.focus();
  }, [userInput]);

  return (
    <div className="aa" style={{ marginRight: "auto", marginLeft: "auto" }}>
      <div className="row">
        <div className="col-md-8 mt-3">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              style={{ width: "80%", marginRight: "10px" }}
              placeholder="Enter a repository"
              type="text"
              className="form-control mb-2"
              ref={inputRef}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button className="btn" style={{ width: "100px" }} type="submit">
              {isLoading ? "Searching" : "Search"}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>

        <div className="col-md-4" style={{ display: "flex" }}>
          <div className="col-lg-4" style={{ marginRight: "10px" }}>
            <SortRepo sortedRepo={sortedRepo} />
          </div>

          <div className="col-lg-6">
            <FilterLanguage filterInput={filterInput} languages={languages} />
          </div>
        </div>
        <div style={{fontWeight: '700'}}>
          <Results
            isSubmitted={isSubmitted}
            repos={repos}
            selectedLanguage={selectedLanguage}
            userInput={userInput}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
