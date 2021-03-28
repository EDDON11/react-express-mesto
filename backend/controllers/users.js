const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res
        .status(500)
        .send({ message: "Не удалось получить информацию о пользователе" })
    );
};

const getProfile = (req, res) => {
  User.findOne({ _id: req.params._id })
    .orFail(new Error("NotFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      if (err.kind === "ObjectId") {
        return res.status(400).send({ message: "Нет пользователя с таким id" });
      }
      return res.status(500).send({ message: "На сервере произошла ошибка" });
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      if (!user) {
        throw new ValidationError("Не корректные почта или пароль");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Неверные данные" });
      } else if (err.name === "MongoError") {
        return res.status(500).send({ message: "Ошибка при отправке данных" });
      }
      next(err);
    })
    .catch(next);
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true }
  )
    .orFail(new Error("NotFound"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Неверные данные" });
      }
      return res.status(500).send({ message: "Ошибка при отправке данных" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true }
  )
    .orFail(new Error("NotFound"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Неверные данные" });
      }
      return res.status(500).send({ message: "Ошибка при отправке данных" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Unauthorized("Пользователь не зарегистрирован");
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
