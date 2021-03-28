import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [job, setJob] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name || "");
    setJob(currentUser.about || "");
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: job,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangejob(e) {
    setJob(e.target.value);
  }
  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button="Сохранить"
    >
      <input
        required
        minLength={2}
        maxLength={40}
        id="name-input"
        className="popup__input popup__input_type_heading"
        placeholder="Имя"
        type="text"
        name="edit"
        autoComplete="off"
        value={name}
        onChange={handleChangeName}
      />
      <span id="name-input-error" className="popup__error" />
      <input
        required
        minLength={2}
        maxLength={200}
        id="about-input"
        className="popup__input popup__input_type_subheading"
        placeholder="Вид деятельности"
        type="text"
        name="about"
        autoComplete="off"
        value={job}
        onChange={handleChangejob}
      />
      <span id="about-input-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
