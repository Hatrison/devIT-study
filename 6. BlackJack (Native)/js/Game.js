import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Dealer } from './Dealer.js';
import { Modal } from './Modal.js';

export class Game {
  constructor() {
    this.deck = new Deck();
    this.players = [new Player(), new Player(), new Player(), new Player()];
    this.dealer = new Dealer();
    this.modal = new Modal(this);
    this.playground = document.getElementById('playground');

    this.playground.addEventListener('click', this.onClickPlayground);
  }

  start() {
    this.deck.shuffle();
    this.players.forEach(player => (player.hand = this.deck.deal(2)));
    this.dealer.hand = this.deck.deal(2);
    this.playground.innerHTML = this.players.reduce(
      (acc, player) => acc + player.render(),
      ''
    );
    this.dealer.render();

    this.allowButtons(0);
  }

  allowButtons(index, status = true) {
    const hitButtons = document.querySelectorAll('#hit');
    const standButtons = document.querySelectorAll('#stand');

    hitButtons[index].disabled = !status;
    standButtons[index].disabled = !status;
  }

  onClickPlayground = event => {
    if (event.target.id === 'hit') {
      this.hit(event.target.dataset.player);
    } else if (event.target.id === 'stand') {
      this.stand(event.target.dataset.player);
    }
  };

  hit(playerId) {
    const player = this.players.find(player => player.id === Number(playerId));
    player.hand = player.hand.concat(this.deck.deal(1));

    this.playground.innerHTML = this.players.reduce(
      (acc, player) => acc + player.render(),
      ''
    );

    this.allowButtons(playerId - 1);
  }

  stand(playerId) {
    this.allowButtons(playerId - 1, false);

    if (playerId < this.players.length) {
      this.allowButtons(playerId);
    } else {
      this.check();
    }
  }

  check() {
    const dealerScore = this.dealer.score();
    const playerScores = this.players.map(player => player.score());
    const winningScores = playerScores.filter(score => score <= 21);
    const blackjackScores = playerScores.filter(score => score === 21);

    if (
      !winningScores.length ||
      winningScores.every(score => score < dealerScore)
    ) {
      this.modal.open('Dealer won!');
    } else if (blackjackScores.length && dealerScore === 21) {
      this.modal.open('Draw!');
    } else {
      const greatestScore = Math.max(...winningScores);
      const winners = this.players.filter(
        player => player.score() === greatestScore
      );

      if (winners.length === 1) {
        this.modal.open(`Player ${winners[0].id} won!`);
      } else {
        this.modal.open(`Draw!`);
      }
    }
  }
}
