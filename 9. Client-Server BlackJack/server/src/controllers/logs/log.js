const Room = require('../../schemas/rooms');
const calcScore = require('../../helpers/calcScore');
const checkWinner = require('../../helpers/checkWinner');

const log = async (req, res) => {
  const uid = req?.user?.uid;
  const { rid } = req.room;
  const { action } = req.body;

  if (action === 'hit') {
    const room = await Room.findById(rid);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const player = room.players.find(player => player.uid === uid);

    if (!player) {
      return res
        .status(400)
        .json({ message: `You aren't a participant in this room ` });
    }

    const card = room.cards.splice(0, 1);
    const playerCards = player.hand.concat(card);

    const updatedRoom = await Room.findByIdAndUpdate(
      rid,
      {
        cards: room.cards,
        players: room.players.map(player => {
          if (player.uid === uid) {
            return {
              ...player,
              hand: playerCards,
              score: calcScore(playerCards),
            };
          }
          return player;
        }),
        $push: {
          history: `Player ${player.id} hit with card: ${card[0].rank} - ${card[0].suit}`,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      players: updatedRoom.players.map(player => delete player.uid && player),
    });
  } else if (action === 'stand') {
    const room = await Room.findById(rid);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const player = room.players.find(player => player.uid === uid);

    if (!player) {
      return res
        .status(400)
        .json({ message: `You aren't a participant in this room ` });
    }

    if (room.currentTurn + 1 > room.players.length) {
      const message = checkWinner(room.players, room.dealer);

      await Room.findByIdAndUpdate(rid, {
        gameEnded: true,
        gameResult: message,
        history: [...room.history, `Game ended. ${message}`],
      });

      return res
        .status(201)
        .json({ isGameOver: true, winningMessage: message });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      rid,
      {
        currentTurn: room.currentTurn + 1,
        $push: {
          history: `Player ${player.id} stand`,
        },
      },
      { new: true }
    );

    return res.status(201).json({ turnId: updatedRoom.currentTurn });
  }
};

module.exports = log;
