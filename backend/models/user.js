const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String,
    default: "Жак-Ив Кусто",
  },

  about: {
    minlength: 2,
    maxlength: 30,
    type: String,
    default: "Исследователь",
  },

  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(valid) {
        return /(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/.test(
          valid
        );
      },
      message: "Введите правильный url",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "Введите email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 5,
    
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
