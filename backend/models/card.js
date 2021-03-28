const mongoose = require('mongoose');
const validator = require('validator')

const cardSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    required: true,
    type: String,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(valid) {
        return /(http|https):\/\/(www\.)?(\S+)\.([a-zA-Z])+(\/)?(\w-\._~:\/\?#\[\]@!\$&’\(\)\*\+,;=)?/.test(
          valid,
        );
      },
      message: 'Введите правильный url',
    },
  },

  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
