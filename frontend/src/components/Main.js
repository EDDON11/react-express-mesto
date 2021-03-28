import React from "react";
import Card from "./Card.js";
import Header from "./Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  loginData,
  loggedIn,
  onSignOut,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        login={loginData}
        link="/sign-in"
        onClick={onSignOut}
        loginText={"Выйти"}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар"
            />
            <button className="profile__avatar-button" onClick={onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__info-name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}
          />
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
