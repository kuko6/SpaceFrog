class ProjectileBoss1 {
  constructor(width, height, speed, x, y, id, mode) {

    this.id = id;
    this.mode = mode;

    this.width = width;
    this.height = height;

    this.speed = {
      x: speed/1.5,
      y: speed
    };

    if (this.mode == 1) {
      this.speed.x = 0;
    }

    if (this.id <= 3) {
      this.x = x - this.id*80;
      this.speed.x *= -1;
    }
    else if (this.id <= 8){
      this.x = (x - 600) + this.id*80;
    }
    this.y = y;

    this.dead = false;
  }

  draw() {
    ctx.fillStyle = "darkred";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  update() {
    // move
    this.y += this.speed.y;
    this.x += this.speed.x;

    // monitors projectile collision with player
    if (this.x >= player.position.x)
      if (this.x <= (player.position.x + player.width))
        if ((this.y >= player.position.y) && (this.y <= (player.position.y + player.height))) {
          player.HP -= 10;
          this.dead = true;
        }

    // border testing
    if (this.y > GAME_HEIGHT) {
      this.dead = true;
    }
  };
}
