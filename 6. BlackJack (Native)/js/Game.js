import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Dealer } from './Dealer.js';
import { Modal } from './Modal.js';

export class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.modal = new Modal(this);
    this.hitButton = document.getElementById('hit');
    this.standButton = document.getElementById('stand');
    this.checkButton = document.getElementById('check');

    this.hitButton.addEventListener('click', this.hit.bind(this));
    this.standButton.addEventListener('click', this.stand.bind(this));
    this.checkButton.addEventListener('click', this.check.bind(this));
  }

  start() {
    this.deck.shuffle();
    this.player.hand = this.deck.deal(2);
    this.dealer.hand = this.deck.deal(2);
    this.player.render();
    this.dealer.render();
  }

  hit() {
    this.player.hand = this.player.hand.concat(this.deck.deal(1));
    this.player.render();

    const playerScore = this.player.score();
    if (playerScore > 21) {
      this.modal.open('Player busts. Dealer wins.');
    }
  }

  stand() {
    this.dealer.hand = this.dealer.hand.concat(this.deck.deal(1));
    this.dealer.render();

    const dealerScore = this.dealer.score();
    if (dealerScore > 21) {
      this.modal.open('Dealer busts. Player wins.');
    }
  }

  check() {
    const playerScore = this.player.score();
    const dealerScore = this.dealer.score();

    if (playerScore === 21 && this.player.hand.length === 2) {
      this.modal.open('Player wins with a Blackjack!');
    } else if (dealerScore === 21 && this.dealer.hand.length === 2) {
      this.modal.open('Dealer wins with a Blackjack!');
    } else if (playerScore > dealerScore) {
      this.modal.open('Player wins!');
    } else if (dealerScore > playerScore) {
      this.modal.open('Dealer wins.');
    } else {
      this.modal.open(`It's a tie!`);
    }
  }
}
