import { AliveObject } from './AliveObject.js';
import { Bullet } from './Bullet.js';

export class Player extends AliveObject {
  constructor(game) {
    const width = 60;
    const height = 60;
    const posX = game.canvas.width / 2 - width / 2;
    const posY = game.canvas.height - height - game.paddingBottom;
    const velocity = 7;
    const imageSrc = 'images/ship.png';
    super({ game, posX, posY, width, height, velocity, imageSrc });

    this.canShoot = true;

    this.keys = {
      pressed: {
        left: false,
        right: false,
      },
    };

    this.move();
  }

  move() {
    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowLeft':
          this.keys.pressed.left = true;
          break;
        case 'ArrowRight':
          this.keys.pressed.right = true;
          break;
        case 'd':
          this.keys.pressed.right = true;
          break;
        case 'a':
          this.keys.pressed.left = true;
          break;
        case ' ':
          this.keys.pressed.space = true;
          break;
      }
    });

    document.addEventListener('keyup', e => {
      switch (e.key) {
        case 'ArrowLeft':
          this.keys.pressed.left = false;
          break;
        case 'ArrowRight':
          this.keys.pressed.right = false;
          break;
        case 'd':
          this.keys.pressed.right = false;
          break;
        case 'a':
          this.keys.pressed.left = false;
          break;
        case ' ':
          this.keys.pressed.space = false;
          break;
      }
    });
  }

  update() {
    this.collideWithBullet();
    this.render();

    const leftBorder = this.posX > 0;
    const rightBorder = this.posX < this.game.canvas.width - this.width;

    if (this.keys.pressed.left && leftBorder) {
      this.posX -= this.velocity;
    } else if (this.keys.pressed.right && rightBorder) {
      this.posX += this.velocity;
    }

    if (this.keys.pressed.space && this.canShoot) {
      this.canShoot = false;
      this.shoot();

      setTimeout(() => {
        this.canShoot = true;
      }, 500);
    }
  }

  collideWithBullet() {
    this.game.enemyBullets.forEach(bullet => {
      const bulletTop = bullet.posY;
      const bulletBottom = bullet.posY + bullet.height;
      const bulletLeft = bullet.posX;
      const bulletRight = bullet.posX + bullet.width;

      const playerTop = this.posY;
      const playerBottom = this.posY + this.height;
      const playerLeft = this.posX;
      const playerRight = this.posX + this.width;

      const colliding =
        bulletBottom >= playerTop &&
        bulletTop <= playerBottom &&
        bulletRight >= playerLeft &&
        bulletLeft <= playerRight;

      if (colliding) {
        setTimeout(() => {
          const bulletIndex = this.game.enemyBullets.indexOf(bullet);
          this.game.enemyBullets.splice(bulletIndex, 1);

          if (this.game.lives > 0) {
            this.game.death();
            this.reset();
          } else {
            this.game.gameOver();
          }
        }, 0);
      }
    });
  }

  shoot() {
    this.game.bullets.push(
      new Bullet({
        game: this.game,
        posX: this.posX + this.width / 2,
        posY: this.posY,
      })
    );
  }

  reset() {
    this.posX = this.game.canvas.width / 2 - this.width / 2;
    this.posY = this.game.canvas.height - this.height - this.game.paddingBottom;
  }
}
