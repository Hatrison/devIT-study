const Room = require('../../schemas/rooms');
const createToken = require('../../helpers/createToken');
const { nanoid } = require('nanoid');

const createRoom = async (req, res) => {
  const { id } = await Room.create({});

  const roomToken = createToken(id);
  const userToken = createToken(nanoid());

  return res
    .status(201)
    .json({ message: 'Room was created successfully!', roomToken, userToken });
};

module.exports = createRoom;
