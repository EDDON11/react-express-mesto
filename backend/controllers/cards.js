const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Нет такой карточки' });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Нет такой карточки' });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Нет такой карточки' });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
