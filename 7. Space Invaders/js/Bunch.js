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

    if (this.posX + this.width >= this.game.canvas.width || this.posX <= 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y += Invader.height;
    }
  }

  recalculateWidth() {
    if (this.invaders.length === 0) return;

    let leftmostInvader = this.invaders[0];
    let rightmostInvader = this.invaders[0];

    for (const invader of this.invaders) {
      if (invader.posX < leftmostInvader.posX) {
        leftmostInvader = invader;
      }
      if (invader.posX > rightmostInvader.posX) {
        rightmostInvader = invader;
      }
    }

    this.width = rightmostInvader.posX + Invader.width - leftmostInvader.posX;
    this.posX = leftmostInvader.posX;
  }
}
