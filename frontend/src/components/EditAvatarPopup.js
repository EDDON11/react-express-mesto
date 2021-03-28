import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });

    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить Аватар"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      button="Сохранить"
    >
      <input
        required
        id="avatar-input"
        className="popup__input popup__input_type_avatar"
        placeholder="Ссылка на фото"
        type="url"
        name="avatar"
        autoComplete="off"
        ref={inputRef}
      />
      <span id="avatar-input-error" className="popup__error" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
