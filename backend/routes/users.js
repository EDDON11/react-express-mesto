const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get(
  "/users/:_id",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  getProfile
);

router.post("/users", createUser);
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/^(http|https):\/\/[^ "]+$/),
    }),
  }),
  updateAvatar
);

module.exports = router;
