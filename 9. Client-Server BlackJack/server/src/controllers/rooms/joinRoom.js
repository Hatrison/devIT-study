const Room = require('../../schemas/rooms');
const createToken = require('../../helpers/createToken');
const { nanoid } = require('nanoid');
const Player = require('../../utils/Player');
const returnCards = require('../../helpers/returnCards');
const calcScore = require('../../helpers/calcScore');

const addPlayerToRoom = async room => {
  const player = new Player();
  player.setCards(room.cards.splice(0, 2));
  const playerId = nanoid();

  const updatedRoom = await Room.findByIdAndUpdate(
    room._id,
    {
      cards: room.cards,
      $push: {
        players: { ...player, score: calcScore(player.hand), uid: playerId },
      },
      history: [
        ...room.history,
        `Player ${player.id} joined the game`,
        `Player ${player.id} cards dealt with cards: ${returnCards(
          player.hand
        )}`,
      ],
    },
    { new: true }
  );

  const userToken = createToken(playerId);
  const roomToken = createToken(room._id);

  return {
    roomToken,
    userToken,
    dealer: updatedRoom.dealer,
    players: updatedRoom.players.map(player => delete player.uid && player),
    id: player.id,
    turnId: updatedRoom.currentTurn,
  };
};

const joinRoom = async (req, res) => {
  const { rid } = req.room;
  const uid = req?.user?.uid;

  const room = await Room.findById(rid);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  if (room.gameEnded) {
    return res
      .status(201)
      .json({ isGameOver: true, winningMessage: room.gameResult });
  }

  if (room.started && !uid) {
    return res.status(400).json({ message: 'Room already started' });
  }

  if (uid) {
    const player = room.players.find(player => player.uid === uid);

    if (!player) {
      if (room.started) {
        return res.status(400).json({ message: 'Room already started' });
      }

      const result = await addPlayerToRoom(room);
      return res.status(201).json(result);
    }

    const roomToken = createToken(rid);
    const userToken = createToken(uid);

    return res.status(201).json({
      roomToken,
      userToken,
      dealer: room.dealer,
      players: room.players.map(player => delete player.uid && player),
      id: player.id,
      turnId: room.currentTurn,
    });
  }

  const result = await addPlayerToRoom(room);
  return res.status(201).json(result);
};

module.exports = joinRoom;
