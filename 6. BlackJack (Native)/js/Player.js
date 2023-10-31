export class Player {
  static #counter = 0;

  constructor() {
    /**
     * The player's hand, which is an array of cards.
     * @type {Card[]}
     */
    this.hand = [];

    /**
     * An identifier for the player, starting from 1 and incrementing with each new player.
     * @type {number}
     */
    Player.#counter++;
    this.id = Player.#counter;
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

  /**
   * Render the player's information and cards as an HTML representation.
   * @returns {string} HTML representation of the player.
   */
  render() {
    const cards = this.hand.map(card => card.render());
    const score = this.score();

    return `<div class='player'>
              <div id='player' class='card-table'>
                <div class='info'>
                  <h2>Player ${this.id}</h2>
                  <div id='player-points' class='points'>${String(score)}</div>
                </div>
                <ul id='player-cards' class='cards'>${cards.join('')}</ul>
              </div>
              <ul id='buttons' class='buttons-list'>
                <li>
                  <button id='hit' class='button' disabled
                  data-player='${this.id}'>Hit</button>
                </li>
                <li>
                  <button id='stand' class='button' disabled 
                  data-player='${this.id}'>Stand</button>
                </li>
              </ul>
            </div>`;
  }
}
