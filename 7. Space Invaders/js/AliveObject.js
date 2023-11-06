export class AliveObject {
  constructor({ game, posX, posY, width, height, velocity, imageSrc }) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;

    this.velocity = velocity;

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
