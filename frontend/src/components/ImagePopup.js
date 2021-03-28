import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_photo ${card && "popup_open"}`}>
      <div className="popup__content popup__content_photo">
        <button
          className="popup__close popup__close_photo"
          onClick={onClose}
        ></button>
        <img
          className="popup__full"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h4 className="popup__title popup__title_photo" type="reset">
          {card ? card.name : ""}
        </h4>
      </div>
    </div>
  );
};

export default ImagePopup;
