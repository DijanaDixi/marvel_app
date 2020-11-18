import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Character from "./Character/Character";
import Search from "../../Search/Search";
import ListItemCharacter from "./ListItemCharacter/ListItemCharacter";
import style from "./Characters.module.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [view, setView] = useState("card");
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    getAllCharacters();
  }, []);


  useEffect(() => {
    if (localStorage.getItem("favorite")) {
      setFavorite(JSON.parse(localStorage.getItem("favorite")));
    }
  }, []);

  // Change view
  useEffect(() => {
    if (localStorage.getItem("view")) {
      setView(localStorage.getItem("view"));
    } else {
      setView("card");
    }
  }, []);

  // All Characters
  const getAllCharacters = () => {
    fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=6e5060e01c4b7ee2a016ffcd5079b468&hash=487fdf44d9cc6e059dae4d062cf419e2`
    )
      .then((response) => response.json())
      .then((res) => {
        setCharacters(res.data.results);
      });
  };

  // Get data from Search input
  const getSearchData = (val) => {
    if (val.length > 0) {
      fetch(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${val}&ts=thesoer&apikey=6e5060e01c4b7ee2a016ffcd5079b468&hash=487fdf44d9cc6e059dae4d062cf419e2`
      )
        .then((response) => response.json())
        .then((res) => {
          setCharacters(res.data.results);
        });
    } else {
      setCharacters(favorite);
    }
  };

  // Change list and card view
  const changeView = () => {
    if (view === "card") {
      setView("list");
      localStorage.setItem("view", "list");
    } else {
      setView("card");
      localStorage.setItem("view", "card");
    }
  };

  // sava data in local storage-bookmarks
  const bookmark = (value) => {

    const charatcterInFavorite = favorite.includes(value);
    
    if (charatcterInFavorite) {
      // remove duplicate character
      const favouritesWithoutCharacter = favorite.filter(
        (fav) => fav.id !== value.id
      );

      localStorage.setItem(
        "favorite",
        JSON.stringify(favouritesWithoutCharacter)
      );
      setFavorite(favouritesWithoutCharacter);
    } else {
      // add character
      const addFavorite = [...favorite, value];
      localStorage.setItem("favorite", JSON.stringify(addFavorite));
      setFavorite(addFavorite);
    }
  };

  // Favorite
  const showFavorite = () => {
    setCharacters(favorite);
  };
  //   AllCharacters
  const allCharacters = characters.map((char) => {
    if (view === "card") {
      return (
        <Character
          char={char}
          bookmark={bookmark}
          favorite={favorite}
          key={char.id}
        />
      );
    } else {
      return (
        <ListItemCharacter
          char={char}
          bookmark={bookmark}
          favorite={favorite}
          key={char.id}
        />
      );
    }
  });

  return (
    <>
      <Header changeView={changeView} view={view} />
      <div className={style.comicBGPanel}>
        <Search getSearchData={getSearchData} showFavorite={showFavorite} />
        <div className={`container ${style.charactersBody}`}>
          <div className="row">{allCharacters}</div>
        </div>
      </div>
    </>
  );
}
export default Characters;
