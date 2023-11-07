import { Invader } from './Invader.js';

export class Bunch {
  constructor(game, rows = 3, columns = 10) {
    this.game = game;
    this.posX = 0;
    this.posY = 0;
    this.velocity = {
      x: 3,
      y: 0,
    };

    this.invaders = [];

    this.canShoot = true;

    this.createBunch(rows, columns);
  }

  createBunch(rows, columns) {
    const invaderWidth = Invader.width;
    const invaderHeight = Invader.height;
    const invaderGap = 10;

    this.width = invaderWidth * columns + invaderGap * (columns - 1);
    this.height = invaderHeight * rows + invaderGap * (rows - 1);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        this.invaders.push(
          new Invader({
            game: this.game,
            posX: x * (invaderWidth + invaderGap),
            posY: y * (invaderHeight + invaderGap),
            velocity: this.velocity.x,
          })
        );
      }
    }
  }

  update() {
    if (this.invaders.length === 0) {
      this.game.bunch = null;
      this.game.win();
      return;
    }

    this.move();
    this.invaders.forEach(invader => {
      invader.update(this.velocity);
    });

    if (this.canShoot) {
      this.canShoot = false;
      const index = Math.floor(Math.random() * this.invaders.length);
      this.invaders[index].shoot();

      setTimeout(() => {
        this.canShoot = true;
      }, 1000);
    }
  }

  move() {
    this.posX += this.velocity.x;
    this.velocity.y = 0;

    const borders =
      this.posX + this.width >= this.game.canvas.width || this.posX <= 0;

    if (borders) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y += Invader.height;
      this.posY += this.velocity.y;
    }

    const bottom =
      this.posY + this.height >=
      this.game.canvas.height -
        this.game.paddingBottom -
        this.game.player.height;

    if (bottom) {
      this.game.gameOver();
    }
  }

  recalculateSize() {
    if (this.invaders.length === 0) return;

    let leftmostInvader = this.invaders[0];
    let rightmostInvader = this.invaders[0];
    let topmostInvader = this.invaders[0];
    let bottommostInvader = this.invaders[0];

    for (const invader of this.invaders) {
      if (invader.posX < leftmostInvader.posX) {
        leftmostInvader = invader;
      }
      if (invader.posX > rightmostInvader.posX) {
        rightmostInvader = invader;
      }
      if (invader.posY < topmostInvader.posY) {
        topmostInvader = invader;
      }
      if (invader.posY > bottommostInvader.posY) {
        bottommostInvader = invader;
      }
    }

    this.width = rightmostInvader.posX + Invader.width - leftmostInvader.posX;
    this.height = bottommostInvader.posY + Invader.height - topmostInvader.posY;
    this.posX = leftmostInvader.posX;
  }
}
