import { Deck } from './Deck.js';

export class Modal {
  constructor(game) {
    this.game = game;
    this.modal = document.getElementById('modal');
    this.modalMessage = document.getElementById('modal-message');
    this.restartButton = document.getElementById('modal-button');

    this.restartButton.addEventListener('click', this.restart.bind(this));
  }

  /**
   * Open the modal and display a message.
   * @param {string} message - The message to be displayed in the modal.
   */
  open(message) {
    this.modalMessage.innerHTML = message;
    this.modal.classList.remove('hidden');
  }

  /**
   * Restart the game by closing the modal and initializing a new deck.
   */
  restart() {
    this.modal.classList.add('hidden');
    this.game.deck = new Deck();
    this.game.start();
  }
}
