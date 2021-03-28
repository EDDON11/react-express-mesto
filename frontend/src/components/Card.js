import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_visible" : "element__delete-button_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleCardDelete}
        type="button"
      ></button>
      <img
        className="element__pic"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__rectangle">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <p className="element__likos">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
