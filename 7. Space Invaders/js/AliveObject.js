import { GameObject } from './GameObject.js';

export class AliveObject extends GameObject {
  constructor({ game, posX, posY, width, height, velocity, imageSrc }) {
    super({ game, posX, posY, velocity, width, height });

    this.img = new Image();
    this.img.src = imageSrc;
  }

  render() {
    this.game.ctx.drawImage(
      this.img,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  update() {
    this.render();
  }
}
