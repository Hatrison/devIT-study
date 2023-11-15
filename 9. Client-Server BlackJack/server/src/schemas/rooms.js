const handleMongooseError = require('../helpers/handleMongooseError');
const { Schema, model } = require('mongoose');

const roomSchema = new Schema(
  {
    cards: {
      type: Array,
      default: [],
    },
    players: {
      type: Array,
      default: [],
    },
    dealerCards: {
      type: Array,
      default: [],
    },
    started: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Room = model('room', roomSchema);

roomSchema.post('save', handleMongooseError);
module.exports = Room;
