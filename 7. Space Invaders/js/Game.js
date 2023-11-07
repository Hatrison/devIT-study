import { Player } from './Player.js';
import { Bunch } from './Bunch.js';
import { Barricade } from './Barricade.js';

export class Game {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext('2d');

    this.paddingBottom = 20;

    this.scoreEl = document.getElementById('score-num');
    this.livesEl = document.getElementById('lives-num');
    this.levelEl = document.getElementById('level-num');

    this.player = new Player(this);
    this.init(3, 10, false, 1, 2);
    this.level = 1;
    this.score = 0;
    this.lives = 2;
    this.levelEl.innerHTML = this.level;
    this.scoreEl.innerHTML = this.score;
    this.livesEl.innerHTML = this.lives;
  }

  init(rows, columns, canShoot, maxHp, velocity) {
    this.bunch = new Bunch(this, rows, columns, canShoot, maxHp, velocity);
    this.bullets = [];
    this.enemyBullets = [];
    this.barricades = Barricade.createBarricades(this, 4);
  }

  start() {
    this.animationId = window.requestAnimationFrame(() => {
      this.start();
    });

    this.clear();

    this.barricades.forEach(barricade => {
      barricade.update();
    });

    this.player.update();

    this.bullets.forEach(bullet => {
      bullet.update();
    });

    this.bunch.update();

    this.enemyBullets.forEach(bullet => {
      bullet.update();
    });
  }

  nextLevel() {
    this.level++;
    this.levelEl.innerHTML = this.level;

    if (this.level === 2) this.init(4, 10, false, 1, 3);
    if (this.level === 3) this.init(2, 10, true, 1, 2);
    if (this.level === 4) this.init(2, 10, true, 2, 3);
    if (this.level === 5) this.init(1, 1, true, 40, 4);
    if (this.level === 6) this.win();
  }

  death() {
    this.lives--;
    this.livesEl.innerText = this.lives;
  }

  gameOver() {
    window.cancelAnimationFrame(this.animationId);
    this.lives = 0;
    this.deleteObjects();
    this.clear();

    this.printText('Game Over', 'red', 48);
  }

  win() {
    window.cancelAnimationFrame(this.animationId);
    this.deleteObjects();
    this.clear();

    this.printText('You win', 'green', 48, -40);

    this.printText('Your Score: ' + this.score, 'white', 24, 20);
  }

  printText(text, color = 'red', size = 48, deltaY = 0) {
    this.ctx.fillStyle = `${color}`;
    this.ctx.font = `${size}px "Press Start 2P", cursive`;
    const textWidth = this.ctx.measureText(text).width;
    const x = (this.canvas.width - textWidth) / 2;
    const y = this.canvas.height / 2 + deltaY;
    this.ctx.fillText(text, x, y);
  }

  deleteObjects() {
    this.bullets = [];
    this.enemyBullets = [];
    this.bunch.invaders = [];
    this.bunch = null;
    this.player = null;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
