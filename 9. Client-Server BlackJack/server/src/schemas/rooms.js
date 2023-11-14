const handleMongooseError = require('../helpers/handleMongooseError');
const { Schema, model } = require('mongoose');

const roomSchema = new Schema(
  {
    smth: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

const Room = model('room', roomSchema);

roomSchema.post('save', handleMongooseError);
module.exports = Room;
