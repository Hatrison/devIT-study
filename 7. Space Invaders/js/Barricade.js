import { GameObject } from './GameObject.js';

export class Barricade extends GameObject {
  constructor({ game, posX, posY, width, height }) {
    super({ game, posX, posY, width, height });

    this.maxHp = 5;
    this.hp = this.maxHp;
  }

  static createBarricades(game, quantity) {
    const barricades = [];
    const barricadeWidth = 100;
    const barricadeHeight = 60;
    const totalBarricadeWidth = quantity * barricadeWidth;
    const spacing = (game.canvas.width - totalBarricadeWidth) / (quantity + 1);

    for (let i = 0; i < quantity; i++) {
      const posX = spacing + i * (barricadeWidth + spacing);
      const posY =
        game.canvas.height -
        3 * game.paddingBottom -
        game.player.height -
        barricadeHeight;

      barricades.push(
        new Barricade({
          game,
          posX,
          posY,
          width: barricadeWidth,
          height: barricadeHeight,
        })
      );
    }

    return barricades;
  }

  render() {
    this.game.ctx.fillStyle = 'grey';
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  update() {
    this.render();
    this.checkCollision();
  }

  checkCollision() {
    this.collisionWithBullet();
    this.collisionWithEnemyBullet();
    this.collisionWithEnemy();
  }

  collisionWithBullet() {
    this.game.bullets.forEach(bullet => {
      const bulletTop = bullet.posY - bullet.radius;
      const bulletBottom = bullet.posY + bullet.radius;
      const bulletLeft = bullet.posX - bullet.radius;
      const bulletRight = bullet.posX + bullet.radius;

      const barricadeTop = this.posY;
      const barricadeBottom = this.posY + this.height;
      const barricadeLeft = this.posX;
      const barricadeRight = this.posX + this.width;

      const colliding =
        bulletBottom >= barricadeTop &&
        bulletTop <= barricadeBottom &&
        bulletRight >= barricadeLeft &&
        bulletLeft <= barricadeRight;

      if (colliding) {
        const bulletIndex = this.game.bullets.indexOf(bullet);
        this.game.bullets.splice(bulletIndex, 1);
        this.collide();
      }
    });
  }

  collisionWithEnemyBullet() {
    this.game.enemyBullets.forEach(bullet => {
      const bulletTop = bullet.posY;
      const bulletBottom = bullet.posY + bullet.height;
      const bulletLeft = bullet.posX;
      const bulletRight = bullet.posX + bullet.width;

      const barricadeTop = this.posY;
      const barricadeBottom = this.posY + this.height;
      const barricadeLeft = this.posX;
      const barricadeRight = this.posX + this.width;

      const colliding =
        bulletBottom >= barricadeTop &&
        bulletTop <= barricadeBottom &&
        bulletRight >= barricadeLeft &&
        bulletLeft <= barricadeRight;

      if (colliding) {
        const bulletIndex = this.game.enemyBullets.indexOf(bullet);
        this.game.enemyBullets.splice(bulletIndex, 1);
        this.collide();
      }
    });
  }

  collisionWithEnemy() {
    this.game.bunch.invaders.forEach(invader => {
      const invaderTop = invader.posY;
      const invaderBottom = invader.posY + invader.height;
      const invaderLeft = invader.posX;
      const invaderRight = invader.posX + invader.width;

      const barricadeTop = this.posY;
      const barricadeBottom = this.posY + this.height;
      const barricadeLeft = this.posX;
      const barricadeRight = this.posX + this.width;

      const colliding =
        invaderBottom >= barricadeTop &&
        invaderTop <= barricadeBottom &&
        invaderRight >= barricadeLeft &&
        invaderLeft <= barricadeRight;

      if (colliding) {
        invader.hp--;
        this.collide();
      }
    });
  }

  collide() {
    this.hp--;
    if (this.hp <= 0) {
      this.destroy();
    }
  }

  destroy() {
    const index = this.game.barricades.indexOf(this);
    this.game.barricades.splice(index, 1);
  }
}
