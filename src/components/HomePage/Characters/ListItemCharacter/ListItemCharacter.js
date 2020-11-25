/* eslint-disable react/prop-types */
import React from "react";
import style from "./ListItemCharacter.module.css";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ListItemCharacter({ char, favorite, bookmark }) {
  const saveId = (val) => {
    bookmark(val);
  };

  // Nested Object
  const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce(
      (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
      nestedObj
    );
  };

  const getComics = getNestedObject(char, ["comics", "items"]);
  const comics=getComics.slice(0,3)
  return (
    <div className={`col-sm-12 ${style.bodyCard}`}>
        <div className="row">
          <div className={`col-6 col-lg-4 ${style.imageHolder}`}>
            <img
              className={` ${style.marvelImage}`}
              alt="..."
              src={`${char.thumbnail.path}.${char?.thumbnail?.extension}`}
            />
          </div>

          <div className="col-6 col-lg-8">
            <div className='card-body p-0 mt-2'>
              <h5 className="card-title ">{char.name}</h5>
              <div>
                <h5 className={style.overflow}>Comics</h5>
                {comics?.map((c) => {
                  return <p key={c.id}>{c?.name || "- -"}</p>;
                })}
              </div>
              <div>
                {favorite.find((f) => f.id === char.id) ? (
                  <FontAwesomeIcon
                    icon={faBookmark}
                    onClick={() => saveId(char, char.id)}
                    className={`text-danger ${style.bookmark}`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBookmark}
                    onClick={() => saveId(char)}
                    className={style.bookmark}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default ListItemCharacter;
