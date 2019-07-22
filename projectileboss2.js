class ProjectileBoss2 {
  constructor(width, height, speed, x, y, id, mode) {

    this.img = document.getElementById('banana');
    this.id = id;
    this.mode = mode;

    this.x = x;
    this.y = y;

    this.speed = {
      x: speed,
      y: speed
    };

    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  move() {
    if (this.mode == 2 && this.y < 400) {
      if (this.id >= 2) {
        this.x += this.speed.x;
      }
      else {
        this.x -= this.speed.x
      }
    }

    if (this.mode != 3 && this.y >= 400) {
      if (this.x - player.position.x <= 4 && this.x - player.position.x >= -4) {
        this.x = player.position.x;
      }
      else if (player.position.x > this.x) {
        this.x += this.speed.x;
      }
      else if (player.position.x < this.x) {
        this.x -= this.speed.x;
      }
    }
    this.y += this.speed.y;
  };

  getBigger() {
    this.width += 10;
    this.height += 10;
  };

  update() {
    // move
    this.move();

    // makes bananas bigger
    if (this.mode == 3 && this.y >= 300) {
      this.getBigger();
      this.x -= this.speed.x;
    }

    // monitors projectile collision with player
    if (this.x >= player.position.x)
      if (this.x <= (player.position.x + player.width))
        if ((this.y >= player.position.y) && (this.y <= (player.position.y + player.height))) {
          player.HP -= 10;
          this.dead = true;
        }

    // also monitors projectile collision with player, works better with mode 3 projectiles than the first one
    if (this.mode == 3)
      if (((player.position.x <= this.x) && (this.x <= (player.position.x + player.width))) || ((this.x <= player.position.x) && (player.position.x <= (this.x + this.width))))
        if (((player.position.y <= this.y) && (this.y <= (player.position.y + player.height))) || ((this.y <= player.position.y) && (player.position.y <= (this.y + this.height)))) {
          player.HP -= 10;
          this.dead = true;
        }

    // border testing
    if (this.y > GAME_HEIGHT) {
      this.dead = true;
    }
  };
}
