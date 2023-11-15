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

  /**
   * Calculate the player's current score in Blackjack, accounting for Aces.
   * @returns {number} The player's current score.
   */
  score() {
    let total = this.hand.reduce((acc, card) => acc + card.value, 0);
    let numAces = this.hand.filter(card => card.rank === 'A').length;

    while (numAces > 0 && total > 21) {
      total -= 10;
      numAces--;
    }

    return total;
  }

  setCards(cards) {
    this.hand = cards;
  }
}

module.exports = Player;
