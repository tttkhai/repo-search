import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Results from "./Results";
import SortRepo from "./SortRepo";
import FilterLanguage from "./FilterLanguage";

function SearchPage() {
  const [userInput, setUserInput] = useState("");
  const [repos, setRepos] = useState([]);
  // const [repoDetail, setRepoDetail] = useState();
  const [sort, setSort] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const input = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setRepos([]);
    setIsLoading(true);
    fetchRepos(userInput, sort);
  };
  const sortedRepo = (value) => {
    setSort(value);
  };

  const fetchRepos = async (input, sortValue) => {
    if (!userInput || /^\s*$/.test(userInput)) {
      return;
    }
    const githubURL = `https://api.github.com/search/repositories?q=${input}&sort=${sortValue}&per_page=50`;
    console.log("githubURL: "+githubURL);

    const result = await axios.get(githubURL);
    setIsSubmitted(true);
    setLanguages([
      ...new Set(
        result.data.items.map(({ language }) =>
          language === null ? "null" : language
        )
      ),
    ]);
    setIsLoading(false);
    setRepos(result.data.items);

    console.log("repo: " + JSON.stringify(repos));
  };
  const filterInput = (value) => {
    console.log("filterInput being called: " + value);

    setSelectedLanguage(value);
  };

  const reset = () => {
    setIsLoading(false);
    setRepos([]);
    setLanguages([]);
    setSelectedLanguage("");
    setIsSubmitted(false);
  };

  useEffect(() => {
    fetchRepos(userInput, sort);
  }, [sort]);

  useEffect(() => {
    reset();
  }, [userInput]);

  return (
    <div>
      <h2>Repo Search</h2>
      <SortRepo sortedRepo={sortedRepo} />
      <FilterLanguage filterInput={filterInput} languages={languages} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => setUserInput(e.target.value)} />
        <button type="submit">{isLoading ? "Searching" : "Search"}</button>
      </form>

      <Results
        isSubmitted={isSubmitted}
        repos={repos}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
}

export default SearchPage;
