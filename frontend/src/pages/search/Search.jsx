import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import "./Search.css";

const Search = () => {
  const [selectedType, setSelectedType] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);


  const axiosPrivate = useAxiosPrivate();

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isMentor = selectedType === "mentors" ? true : false;

    try {
      const response = await axiosPrivate.get(
        `/api/functions/search?q=${query}&isMentor=${isMentor}`
      );
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-input-container">
        <input
          className="search"
          type="text"
          placeholder="Search mentors or freelancers..."
          value={query}
          onChange={handleInputChange}
        />
        <button className="search-button">Search</button>
      </form>
      <div className="bottom__choice">
        <div className="general">
          <label htmlFor="mentor">Mentor</label>
          <input
            className="input__check"
            type="radio"
            name="search-type"
            value="mentors"
            checked={selectedType === "mentors"}
            onChange={handleTypeChange}
          />
        </div>
        <div className="general">
          <label htmlFor="talent">Talent</label>
          <input
            className="input__check"
            type="radio"
            name="search-type"
            value="talent"
            checked={selectedType === "talent"}
            onChange={handleTypeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
