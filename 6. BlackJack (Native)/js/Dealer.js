import { Player } from './Player.js';

export class Dealer extends Player {
  constructor() {
    super();
    this.scoreboard = document.getElementById('dealer-points');
    this.cards = document.getElementById('dealer-cards');
  }

  /**
   * Render the dealer's current state, updating the displayed score and cards.
   */
  render() {
    this.scoreboard.innerHTML = String(this.score());
    this.cards.innerHTML = this.hand.map(card => card.render()).join('');
  }
}
