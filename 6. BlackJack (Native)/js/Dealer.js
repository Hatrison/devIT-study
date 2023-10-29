import { Player } from './Player.js';

export class Dealer extends Player {
  constructor() {
    super();
    this.scoreboard = document.getElementById('dealer-points');
    this.cards = document.getElementById('dealer-cards');
  }
}
