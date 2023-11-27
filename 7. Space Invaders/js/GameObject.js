export class GameObject {
  constructor({
    game,
    posX = 0,
    posY = 0,
    velocity = 0,
    width = 0,
    height = 0,
  }) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
  }

  render() {
    this.game.ctx.fillStyle = 'white';
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  update() {
    this.render();
  }
}
