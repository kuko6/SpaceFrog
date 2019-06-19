class Invader extends GameObject{
  constructor(id, width, height, x, y, speed) {
    super(id, width, height, speed);

    // original position
    this.x = x;
    this.y = y;

    this.position = {
      x: x,
      y: y
    };

    this.dead = false;

    this.fire = true;
    this.projectile = {
      x: (this.position.x + 16.5),
      y: (this.position.y + 10),
      speed: 8
    };
  }

  drawProjectile() {
    ctx.fillStyle = "darkred";
    ctx.fillRect(this.projectile.x, this.projectile.y, 18, 18);
  };

  updateProjectile() {
    this.projectile.y += this.projectile.speed;

    if (this.projectile.y > GAME_HEIGHT) {
      this.projectile.y = this.position.y + 10;
      this.projectile.x = this.position.x + 16.5;
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
      this.projectile.y = this.position.y + 10;
      this.projectile.x = this.position.x + 16.5;
    }
  };

  update() {
    // move
    this.position.x += this.speed;

    // shoot
    this.shoot();

    // monitors projectile collision with player
    if (this.projectile.x >= player.position.x)
      if (this.projectile.x <= (player.position.x + player.width))
        if ((this.projectile.y >= player.position.y) && (this.projectile.y <= (player.position.y + player.height))) {
          player.HP -= 10;
          this.fire = false;
        }

    // monitors collision with player projectiles
    if ((player.projectile.position.x >= this.position.x) || (player.projectile.position.x2 >= this.position.x) && (player.pressedKeys.shoot == true))
      if ((player.projectile.position.x <= this.position.x + this.width) || (player.projectile.position.x2 <= this.position.x + this.width))
        if ((player.projectile.position.y >= this.position.y) && (player.projectile.position.y <= this.position.y + this.height)) {
          player.pressedKeys['shoot'] = false;
          player.score += 100;
          this.dead = true;
        }

    // monitors collision with player
    if (((player.position.x <= this.position.x) && (this.position.x <= (player.position.x + player.width))) || ((this.position.x <= player.position.x) && (player.position.x <= (this.position.x + this.width))))
      if (((player.position.y <= this.position.y) && (this.position.y <= (player.position.y + player.height))) || ((this.position.y <= player.position.y) && (player.position.y <= (this.position.y + this.height)))) {
        this.dead = true;
        player.HP -= 50;
        player.score += 100;
      }

    // tests for borders
    if ((this.position.x + this.width > this.x + 300) || (this.position.x + this.width > GAME_WIDTH)) {
      this.speed = this.speed * -1;
      this.position.y += 20;
    }
    if (this.position.x < this.x) {
        this.speed = this.speed * -1;
        this.position.y += 20;
    }
    if (this.position.y > GAME_HEIGHT) {
      this.dead = true;
    }
  };
}
