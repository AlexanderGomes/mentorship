import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useSearchParams } from "react-router-dom";
import defaultPicture from "../../assets/default.png";
import "./Search.css";

const Search = () => {
  const [selectedType, setSelectedType] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const axiosPrivate = useAxiosPrivate();

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const isMentor = selectedType === "mentors";


  const getQueryValues = async (key, nextPage = 1) => {
    try {
      const response = await axiosPrivate.get(
        `/api/functions/search?q=${query}&isMentor=${isMentor}`
      );
      setResults(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      getQueryValues(query, isMentor);
      setSearchParams({ q: query, isMentor: isMentor });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const values = searchParams.get("q");
    const mentor = searchParams.get("isMentor");

    getQueryValues(values, mentor);
  }, [searchParams]);

  return (
    <>
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

      <div className="card__outter">
        {results?.map((res) => (
          <div key={res._id}>
            <UserCard users={res} />
          </div>
        ))}
      </div>
    </>
  );
};

const UserCard = ({ users }) => {
  const defaultPic = users.profilePicture
    ? users.profilePicture
    : defaultPicture;

  return (
    <>
      <Link className="remove" to={`/profile/${users._id}`}>
        <div className="card">
          <div className="card__img">
            <img src={defaultPic} alt="profile" />
          </div>
          <div className="card__top__info">
            <p className="card__name">{users.name}</p>
            <p className="card__title">{users.careerTitle}</p>
            <p className="card__location">{users.location}</p>
            <div className="card__desc">
              {users?.aboutMe && <p>{users.aboutMe?.slice(0, 200)}...</p>}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Search;
