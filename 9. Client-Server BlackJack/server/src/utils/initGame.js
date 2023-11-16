const Deck = require('./Deck');
const Player = require('./Player');

const initGame = () => {
  const Deck = require('./Deck');
  const Player = require('./Player');
  const deck = new Deck();
  const dealer = new Player(false);
  dealer.setCards(deck.deal(2));
  const player = new Player(true, true);
  player.setCards(deck.deal(2));

  return { deck, player, dealer };
};

module.exports = initGame;
