const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequest = require('../errors/BadReauest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFound('Нет такой карточки');
    })
    .populate('user')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new BadRequest('BadRequest');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        throw new Forbidden('Нельзя удалить карточку другого пользователя');
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
          throw new NotFound('Нет такой карточки');
        })
        .catch((err) => next(err));
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return next(err);
    });
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет такой карточки');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Нет такой карточки');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
