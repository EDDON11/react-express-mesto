import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ onRegister, onInfoTooltip }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleChangeData(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(data);
  }

  return (
    <>
      <Header loginText={"Войти"} link="/sign-in" />
      <section className="auth">
        <form
          onSubmit={handleSubmit}
          className="auth__container auth__containe_type_register"
        >
          <h3 className="auth__title">Регистрация</h3>
          <label className="auth__field">
            <input
              value={data.email}
              onChange={handleChangeData}
              placeholder="Email"
              type="email"
              name="email"
              className="auth__input auth__input_type_register"
              id="email"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="auth__error" id="email-error"></span>
          </label>
          <label className="auth__field">
            <input
              value={data.password}
              onChange={handleChangeData}
              placeholder="Пароль"
              type="text"
              name="password"
              className="auth__input auth__input_type_password"
              id="password"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="auth__error" id="password-error"></span>
          </label>
          <button
            type="submit"
            className="auth__save-button"
            onClick={onInfoTooltip}
          >
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="auth__sing-in-text">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </section>
    </>
  );
}

export default Register;
