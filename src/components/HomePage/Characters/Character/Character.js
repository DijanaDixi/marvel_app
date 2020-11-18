/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Character.module.css";

// eslint-disable-next-line react/prop-types
function Character({ char, bookmark, favorite }) {
  // flip character card
const[flip,setFlip]=useState(false)

  const handleClick=()=>{
    setFlip(!flip)
  }
 
  const saveId = (val) => {
    bookmark(val);
    setFlip(false) 
  };


  // Nested Object
  const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce(
      (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
      nestedObj
    );
  };
// comics details
  const comics = getNestedObject(char, ["comics", "items"]);

  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
      <div className={`${style.card}`} onClick={handleClick}>

        {/* flipCardInner */}
        <div className={flip? `${style.rotateFlipCard}`:`${style.flipCardInner}`}>
          <div className={style.flipCardFront}>
            <img
              className="card-img-top"
              alt="..."
              // eslint-disable-next-line react/prop-types
              src={`${char?.thumbnail?.path}.${char?.thumbnail?.extension}`}
            />
            <div className={`card-body ${style.cardBody}`}>
              <p className="card-text ">{char.name}</p>

              {/* Bookmarks */}
                {favorite.find((f) => f.id === char.id) ? (
                  <FontAwesomeIcon
                    icon={faBookmark}
                    onClick={(e) =>{e.stopPropagation(); saveId(char, char.id)}}
                    className={`text-danger ${style.bookmark}`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBookmark}
                    // eslint-disable-next-line react/prop-types
                    onClick={(e) =>{e.stopPropagation(); saveId(char, char.id)}}
                    className={style.bookmark}
                  />
                )}
              {/* Bookmarks End */}
            </div>
          </div>
          <div className={style.flipCardBack}>

            {/* Comics */}
          <div>
             <p className="text-center text-uppercase font-italic">Comics</p>
            {comics.splice(0,4).map((c) => {
             return <p key={c.id}>{c.name || "- -"}</p>;
            })}
            </div>
           {/* Comics End */}

          </div>
        </div>
        {/* flipCardInner */}
       
      </div>
      {/* card */}
    </div>
  );
}

export default Character;
