import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "../components/InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, getContent } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState();

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  function onInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  const [isRequestSuccessful, setRequestSuccessful] = React.useState(false);

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    if (isRequestSuccessful) {
      history.push("/sing-in");
    }
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }, []);

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopup();
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopup();
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .getCreateCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn]);

  const handleRegister = (data) => {
    const { email, password } = data;
    return register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error("Ошибка");
        }
        if (res.data) {
          setRequestSuccessful(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    return authorize(email, password)
      .then((res) => {
        if (!res || res.statusCode === 401) {
          setIsInfoTooltipOpen(true);
          throw new Error("Нет такого пользователя");
        }
        if (!res || res.statusCode === 400) {
          setIsInfoTooltipOpen(true);
          throw new Error("Ошибка");
        }
        if (res.token) {
          setLoggedIn(true);
          setRequestSuccessful(true);
          history.push("/");
          localStorage.setItem("jwt", res.token);
          getContent(res.token).then((res) => {
            if (res) {
              setLoginData(res.data);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [loginData, setLoginData] = React.useState({
    _id: "",
    email: "",
  });

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setLoginData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setRequestSuccessful(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onSignOut={handleSignOut}
            loginData={loginData.email}
          />
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
              onInfoTooltip={onInfoTooltip}
            />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopup} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          isRequestSuccessful={isRequestSuccessful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
