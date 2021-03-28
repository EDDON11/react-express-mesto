import React from "react";

const PopupWithForm = ({
  title,
  name,
  onClose,
  button,
  isOpen,
  children,
  onSubmit,
}) => {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__content">
        <button
          className="popup__close popup__close_add"
          type="button"
          onClick={onClose}
        />
        <div className="popup__body">
          <h3 className="popup__title">{title}</h3>
          <form
            className={`popup__form popup__form_${name}`}
            method="post"
            name={name}
            onSubmit={onSubmit}
            noValidate
          >
            {children}
            <button className="popup__save-button" type="submit">
              {button}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupWithForm;
