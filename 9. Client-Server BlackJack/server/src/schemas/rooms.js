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
    dealer: {
      type: Object,
      default: {},
    },
    started: {
      type: Boolean,
      default: false,
    },
    currentTurn: {
      type: Number,
      default: 0,
    },
    gameEnded: {
      type: Boolean,
      default: false,
    },
    gameResult: {
      type: String,
      default: '',
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const Room = model('room', roomSchema);

roomSchema.post('save', handleMongooseError);
module.exports = Room;
