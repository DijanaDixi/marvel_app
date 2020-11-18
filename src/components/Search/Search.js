/* eslint-disable react/prop-types */
import React from "react";
import style from "./Search.module.css";

function Search({ getSearchData, showFavorite }) {
  const setSearchValue = (val) => {
    getSearchData(val);
  };
  return (
    <>
      <nav className={`navbar navbar-light justify-content-between ${style.nav}`}>
        <div className="container">
          <a className="navbar-brand text-white ">Hero Search</a>
          <a
            href="/"
            className="text-white"
            onClick={(e) => {
              e.preventDefault(), showFavorite();
            }}
          >
            FAVORITE
          </a>
          <form className={`form-inline text-danger ${style.marginBlock}`}>
            <input
              className="form-control mr-sm-2 "
              type="search"
              placeholder="Hero Search"
              aria-label="Search"
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
        </div>
      </nav>
    </>
  );
}
export default Search;
