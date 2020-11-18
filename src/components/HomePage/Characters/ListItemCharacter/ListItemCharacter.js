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

  const comics = getNestedObject(char, ["comics", "items"]);
  return (
    <div className="col-sm-12">
      <div className={style.cardItem}>
        <div className="row ">
          <div className={`col-6 col-lg-4 text-center ${style.bgc}`}>
            <img
              className={`rounded-circle ${style.marvalImage}`}
              alt="..."
              src={`${char.thumbnail.path}.${char?.thumbnail?.extension}`}
            />
          </div>

          <div className="col-6 col-lg-8">
            <div className={`card-body ${style.bodyCard}`}>
              <h5 className="card-title mb-4">{char.name}</h5>
              <div>
                <p className="">Comics</p>
                {comics.splice(0, 3).map((c) => {
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
    </div>
  );
}

export default ListItemCharacter;
