import login from "../image/login.svg";
import loginError from "../image/loginerror.svg";

function InfoTooltip({ isOpen, onClose, isRequestSuccessful }) {
  return (
    <section className={`${isOpen ? "popup_open" : ""} popup`}>
      <div className="popup__content popup__content_login">
        <button
          className="popup__close popup__close_infotool"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="popup__login-img"
          alt="info"
          src={`${isRequestSuccessful ? login : loginError}`}
        />
        <p className="popup__login-text">{`${
          isRequestSuccessful
            ? "Вы успешно зарегестрированы"
            : "Что-то пошло не так. Попробуйте ещё раз"
        }`}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
