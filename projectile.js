class Projectile {
  constructor(playerX, playerY) {

    this.playerX = playerX;
    this.playerY = playerY;

    this.speed = 12;

    this.position = {
      x: (this.playerX + 8),
      x2: (this.playerX + 41),
      y: (this.playerY + 10)
    };
  }

  draw() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.position.x, this.position.y, 3, 10);
    ctx.fillRect(this.position.x2, this.position.y, 3, 10);
  };

  update() {
    this.position.y -= this.speed;

    if (this.position.y < 0) {
      this.position.y = this.playerY + 10;
      this.position.x = this.playerX + 8;
      this.position.x2 = this.playerX + 41;
      player.pressedKeys['shoot'] = false;
    }

  };
}
