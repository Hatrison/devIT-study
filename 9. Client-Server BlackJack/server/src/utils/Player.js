class Player {
  static #counter = 0;

  constructor(increment = true, initial = false) {
    if (initial) {
      Player.#counter = 0;
    }

    this.hand = [];

    if (increment) {
      Player.#counter++;
      this.id = Player.#counter;
    }
  }

  setCards(cards) {
    this.hand = cards;
  }
}

module.exports = Player;
