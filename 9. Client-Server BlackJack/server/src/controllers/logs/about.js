const Room = require('../../schemas/rooms');

const about = async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  return res.status(200).json(room);
};

module.exports = about;
