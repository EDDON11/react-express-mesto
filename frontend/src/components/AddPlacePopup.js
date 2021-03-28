import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });

    setName("");
    setLink("");
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Добавить карточку"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button="Сохранить"
    >
      <input
        required
        minLength={2}
        maxLength={30}
        id="title-input"
        className="popup__input popup__input_type_title"
        type="text"
        placeholder="Название"
        name="name"
        autoComplete="off"
        value={name}
        onChange={handleChangeName}
      />
      <span id="title-input-error" className="popup__error" />
      <input
        required
        id="url-input"
        className="popup__input popup__input_type_url"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        autoComplete="off"
        value={link}
        onChange={handleChangeLink}
      />
      <span id="url-input-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
