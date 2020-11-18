/* eslint-disable react/prop-types */
import React from "react";
import style from "./Header.module.css";
import { faListUl, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ changeView, view }) {
  const changeButtons = () => {
    if (view === "card") {
      return (
        <FontAwesomeIcon
          icon={faTh}
          className={style.FontAwesomeIcon}
          onClick={() => changeView()}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faListUl}
          className={style.FontAwesomeIcon}
          onClick={() => changeView()}
        />
      );
    }
  };
  return (

    <header className={style.header}>
      <h1>
        <a href="/" className={style.home}>
          Home
        </a>
      </h1>
      {changeButtons()}
    </header>
   
  );
}

export default Header;
