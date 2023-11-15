const Room = require('../../schemas/rooms');
const createToken = require('../../helpers/createToken');
const { nanoid } = require('nanoid');
const Player = require('../../utils/Player');
const joinRoom = async (req, res) => {
  const { rid } = req.room;
  const uid = req?.user?.uid;

  const room = await Room.findById(rid);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  if (room.started && !uid) {
    return res.status(400).json({ message: 'Room already started' });
  }

  if (uid) {
    const player = room.players.find(player => player.uid === uid);

    if (!player) {
      return res
        .status(400)
        .json({ message: `You aren't a participant in this room ` });
    }

    const roomToken = createToken(rid);
    const userToken = createToken(uid);

    return res.status(201).json({
      roomToken,
      userToken,
      dealerCards: room.dealerCards,
      players: room.players.map(player => delete player.uid && player),
    });
  }

  const player = new Player();
  player.setCards(room.cards.splice(0, 2));
  const playerId = nanoid();

  const updatedRoom = await Room.findByIdAndUpdate(
    rid,
    {
      cards: room.cards,
      $push: {
        players: { ...player, uid: playerId },
      },
    },
    { new: true }
  );

  const userToken = createToken(playerId);
  const roomToken = createToken(rid);

  return res.status(201).json({
    roomToken,
    userToken,
    dealerCards: updatedRoom.dealerCards,
    players: updatedRoom.players.map(player => delete player.uid && player),
  });
};

module.exports = joinRoom;
