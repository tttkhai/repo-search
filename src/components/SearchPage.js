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
  const [sort, setSort] = useState("keys");
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

    // user inputs are required
    if (!input || /^\s*$/.test(input)) {
      setIsSubmitted(true);
      setError("Please enter at least something");
      return;
    }
    setIsLoading(true);
    fetchRepos(input, sort);
  };

  const sortedRepo = (value) => {
    if (repos.length > 0) {
      setSort(value);
      fetchRepos(userInput, value);
    }
  };

  // return results from the searched text
  const fetchRepos = async (input, sortValue) => {
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
    setIsLoading(false);
    setRepos([]);
    setLanguages([]);
    setSelectedLanguage("");
    setIsSubmitted(false);
    setError("");
  };

  // After submission, if the users try to add/remove texts then the previous results will be reset
  useEffect(() => {
    if (isSubmitted) {
      reset();
    }
    inputRef.current.focus();
  }, [userInput]);

  return (
    <div className="container">
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
            {/* validation - it will pop up an error if users enter empty text (after trim) */}
            {error && <p className="error">{error}</p>}
          </form>
        </div>

        {/* Dropdown Selection to sort the results/filter by language */}
        <div className="col-md-4 dropdown-selection">
          <div className="col-lg-4" style={{ marginRight: "10px" }}>
            <SortRepo sortedRepo={sortedRepo} />
          </div>
          <div className="col-lg-6">
            <FilterLanguage filterInput={filterInput} languages={languages} />
          </div>
        </div>

        {/* Results from the query will be displayed here */}
        <div className="col-md-8" style={{ fontWeight: "700" }}>
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
