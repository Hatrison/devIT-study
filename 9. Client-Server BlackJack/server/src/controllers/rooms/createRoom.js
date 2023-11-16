const Room = require('../../schemas/rooms');
const createToken = require('../../helpers/createToken');
const { nanoid } = require('nanoid');
const initGame = require('../../utils/initGame');
const returnCards = require('../../helpers/returnCards');
const calcScore = require('../../helpers/calcScore');

const createRoom = async (req, res) => {
  const { deck, player, dealer } = initGame();
  const playerId = nanoid();
  const score = calcScore(player.hand);

  const room = await Room.create({
    cards: deck.cards,
    players: [{ ...player, score, uid: playerId }],
    dealer: { hand: dealer.hand, score: calcScore(dealer.hand) },
    history: [
      'Game created',
      `Dealer cards dealt with cards: ${returnCards(dealer.hand)}`,
      `Player ${player.id} cards dealt with cards: ${returnCards(player.hand)}`,
    ],
  });

  setTimeout(async () => {
    try {
      await Room.findByIdAndUpdate(room._id, {
        started: true,
        currentTurn: 1,
        $push: {
          history: 'Game started',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, 20 * 1000);

  const roomToken = createToken(room._id);
  const userToken = createToken(playerId);

  return res.status(201).json({
    roomToken,
    userToken,
    dealer: room.dealer,
    players: [{ ...player, score }],
    id: player.id,
  });
};

module.exports = createRoom;
