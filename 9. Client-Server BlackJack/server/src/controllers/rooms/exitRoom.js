const Room = require('../../schemas/rooms');
const exitRoom = async (req, res) => {
  const { rid } = req.room;
  const uid = req?.user?.uid;

  const room = await Room.findById(rid);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  if (uid) {
    const player = room.players.find(player => player.uid === uid);

    if (!player) {
      return res
        .status(400)
        .json({ message: `You aren't a participant in this room ` });
    }

    await Room.findByIdAndUpdate(
      rid,
      {
        cards: [...room.cards, ...player.hand],
        $pull: {
          players: { uid },
        },
      },
      { new: true }
    );

    return res.status(201).json({ message: 'You left the room' });
  }
};

module.exports = exitRoom;
