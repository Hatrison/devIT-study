export class Modal {
  constructor(game) {
    this.game = game;
    this.modal = document.getElementById('modal');
    this.modalMessage = document.getElementById('modal-message');
    this.restartButton = document.getElementById('modal-button');

    this.restartButton.addEventListener('click', this.restart.bind(this));
  }

  open(message) {
    this.modalMessage.innerHTML = message;
    this.modal.classList.remove('hidden');
  }

  restart() {
    this.modal.classList.add('hidden');
    this.game.start();
  }
}
