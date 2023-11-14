const joinRoom = async (req, res) => {
  return res.status(201).json({ message: 'join-room' });
};

module.exports = joinRoom;
