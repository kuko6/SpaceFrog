class ProjectileBoss3 {
  constructor(width, height, speed, x, y, id, mode) {

    this.img = document.getElementById('canonball');
    this.id = id;
    this.mode = mode;

    this.x = x;
    this.y = y;

    this.speed = {
      x: speed,
      y: speed
    };

    if (this.mode == 2 || this.mode == 3)
      this.speed.y /= 2;

    this.width = width;
    this.height = height;

    this.explosion = false;
    this.explosionY = this.y + (Math.floor(Math.random() * 300) + 100);
  }

  draw() {
    if (this.mode == 2 || this.mode == 3) {
      if (!this.explosion) {
        this.img = document.getElementById('barrel');
        this.width = 70;
        this.height = 60
      }
      else if (this.explosion == true) {
        this.img = document.getElementById('explosion');
        this.width += 5;
        this.height += 5;
      }
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  explode() {
    if ((this.mode == 2 || this.mode == 3) && this.y >= this.explosionY) {
      this.explosion = true;
    }

    if (this.width >= 400) {
      this.dead = true;
    }
  };

  move() {
    if (!this.explosion) {
      this.y += this.speed.y;
    }
    else if (this.explosion) {
      this.x -= this.speed.x/2;
      this.y -= this.speed.y;
    }
  };

  update() {
    // move
    this.move();

    // makes the barrel explode
    this.explode();

    // monitors projectile collision with player
    if (this.x >= player.position.x)
      if (this.x <= (player.position.x + player.width))
        if ((this.y >= player.position.y) && (this.y <= (player.position.y + player.height))) {
          player.HP -= 20;
          this.dead = true;
        }

    // also monitors projectile collision with player, works better with explosion than the first one
    if (this.mode == 2 || this.mode == 3)
      if (((player.position.x <= this.x) && (this.x <= (player.position.x + player.width))) || ((this.x <= player.position.x) && (player.position.x <= (this.x + this.width))))
        if (((player.position.y <= this.y) && (this.y <= (player.position.y + player.height))) || ((this.y <= player.position.y) && (player.position.y <= (this.y + this.height)))) {
          player.HP -= 5;
          this.explosion = true;
        }

    // monitors collision with player projectiles
    if (this.mode == 2 || this.mode == 3)
      if ((player.projectile.position.x >= this.x) || (player.projectile.position.x2 >= this.x) && (player.pressedKeys.shoot == true))
        if ((player.projectile.position.x <= this.x + this.width) || (player.projectile.position.x2 <= this.x + this.width))
          if ((player.projectile.position.y >= this.y) && (player.projectile.position.y <= this.y + this.height)) {
            player.pressedKeys['shoot'] = false;
            this.explosion = true;
          }

    // border testing
    if (this.y > GAME_HEIGHT) {
      this.dead = true;
    }
  };
}
