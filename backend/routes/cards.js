const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require("../controllers/cards");

router.get(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/^(http|https):\/\/[^ "]+$/),
    }),
  }),
  getCards
);
router.post("/cards", createCard);
router.delete(
  "/cards/:_id",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteCard
);
router.put(
  "/cards/:_id/likes",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  putLike
);
router.delete(
  "/cards/:_id/likes",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteLike
);

module.exports = router;
