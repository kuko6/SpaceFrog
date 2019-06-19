class Copycat extends Invader {
  constructor(id, width, height, x, y, speed) {
    super(id, width, height, x, y, speed);

    this.projectile = {
      x: (this.position.x + 11),
      x2: (this.position.x + 30),
      y: (this.position.y + 20),
      speed: 12
    };
  }

  drawProjectile() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.projectile.x, this.projectile.y, 3, 10);
    ctx.fillRect(this.projectile.x2, this.projectile.y, 3, 10);
  };

  updateProjectile() {
    this.projectile.y += this.projectile.speed;

    if (this.projectile.y > GAME_HEIGHT) {
      this.projectile.y = this.position.y + 20;
      this.projectile.x = this.position.x + 11;
      this.projectile.x2 = this.position.x + 30;
      this.fire = false;
    }
  };

  shoot() {
    if (this.fire && this.position.y >= 0) {
      this.drawProjectile();
      this.updateProjectile();
    }
    else {
      this.fire = true;
      this.projectile.y = this.position.y + 20;
      this.projectile.x = this.position.x + 11;
      this.projectile.x2 = this.position.x + 30;
    }
  };

  move() {
    if (this.position.x - player.position.x <= 4 && this.position.x - player.position.x >= -4) {
      this.position.x = player.position.x;
    }
    else if (player.position.x > this.position.x) {
      this.position.x += this.speed;
    }
    else if (player.position.x < this.position.x) {
      this.position.x -= this.speed;
    }
    setTimeout(() => this.position.y += this.speed, 5000);
  };

  update() {
    // move
    if (this.position.y < 10) {
      this.position.y += 1;
    }
    else
      this.move();

    // shoot
    this.shoot();

    // monitors projectile collision with player
    if (this.projectile.x >= player.position.x)
      if (this.projectile.x2 <= (player.position.x + player.width))
        if ((this.projectile.y >= player.position.y) && (this.projectile.y <= (player.position.y + player.height))) {
          player.HP -= 10;
          this.fire = false;
        }

    // monitors collision with player projectiles
    if ((player.projectile.position.x >= this.position.x) || (player.projectile.position.x2 >= this.position.x) && (player.pressedKeys.shoot == true))
      if ((player.projectile.position.x <= this.position.x + this.width) || (player.projectile.position.x2 <= this.position.x + this.width))
        if ((player.projectile.position.y >= this.position.y) && (player.projectile.position.y <= this.position.y + this.height)) {
          player.pressedKeys['shoot'] = false;
          player.score += 125;
          this.dead = true;
        }

    // monitors collision with player
    if (((player.position.x <= this.position.x) && (this.position.x <= (player.position.x + player.width))) || ((this.position.x <= player.position.x) && (player.position.x <= (this.position.x + this.width))))
      if (((player.position.y <= this.position.y) && (this.position.y <= (player.position.y + player.height))) || ((this.position.y <= player.position.y) && (player.position.y <= (this.position.y + this.height)))) {
        this.dead = true;
        player.HP -= 50;
        player.score += 125;
      }

    // border testing
    if (this.position.y > GAME_HEIGHT) {
      this.dead = true;
    }
  };
}
