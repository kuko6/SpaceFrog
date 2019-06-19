class Youngling extends GameObject {
  constructor(id, width, height, speed, x, y) {
    super(id, width, height, speed);

    // original position
    this.x = x;
    this.y = -100;

    this.position = {
      x: x,
      y: y
    };

    this.moveA = false;
    this.Speed = speed;
    this.speed = {
      x: 0,
      y: speed
    }

    this.fire = true;
    this.projectile = {
      x: this.position.x + (this.width/2) - 10,
      y: this.position.y + (this.height/2),
      speed: 8
    };

    this.HP = 100;
  }

  drawProjectile() {
    ctx.fillStyle = "darkred";
    for (let i = 0; i < 2; i++) {
      ctx.fillRect(this.projectile.x + i*20, this.projectile.y, 6, 10);
    }
  };

  updateProjectile() {
    this.projectile.y += this.projectile.speed;
    if (this.projectile.y > GAME_HEIGHT) {
      this.projectile.y = this.position.y + (this.height/2);
      this.projectile.x = this.position.x + (this.width/2) - 15;
      this.fire = false;
    }
  };

  shoot() {
    if (this.fire) {
      this.drawProjectile();
      this.updateProjectile();
    }
    else {
      this.fire = true;
      this.projectile.y = this.position.y + (this.height/2);
      this.projectile.x = this.position.x + (this.width/2) - 15;
    }
  };

  updateHP() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.position.x + 13, this.position.y - 10, this.HP/2, 5);

    ctx.fillStyle = "red";
    ctx.fillRect(this.HP/2 + (this.position.x + 13), this.position.y - 10, 50 - this.HP/2, 5);
  };

  setMoveAround() {
    this.moveA = true;
  };

  moveAround() {
    if (this.position.y < GAME_HEIGHT - 300) {
      this.speed.y = this.Speed;
    }

    else if (this.position.y >= GAME_HEIGHT - 300) {
      this.speed.y = 0;
      this.speed.x = this.Speed;
    }

    if (this.position.x + this.width >= GAME_WIDTH + 100) {
      this.position.y = this.y;
      this.speed.x = 0;
      this.speed.y = this.Speed;
      this.moveA = false;
    }
  };

  move() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.y < GAME_HEIGHT - 500) {
      this.fire = false;
    }
    if (this.position.y >= GAME_HEIGHT - 500 && !this.moveA) {
      this.speed.y = 0;
      setTimeout(this.setMoveAround.bind(this), 10000);
    }
  };

  update() {
    // move
    this.move();
    if (this.moveA)
      this.moveAround();
    // shoot
    this.shoot();

    // updates the HP bar
    this.updateHP();

    // monitors projectile collision with player
    if (this.projectile.x >= player.position.x)
      if (this.projectile.x <= (player.position.x + player.width))
        if ((this.projectile.y >= player.position.y) && (this.projectile.y <= (player.position.y + player.height))) {
          player.HP -= 20;
          this.fire = false;
        }

    // monitors collision with player projectiles
    if (this.position.y >= 25)
      if ((player.projectile.position.x >= this.position.x) || (player.projectile.position.x2 >= this.position.x) && (player.pressedKeys.shoot == true))
        if ((player.projectile.position.x <= this.position.x + this.width) || (player.projectile.position.x2 <= this.position.x + this.width))
          if ((player.projectile.position.y >= this.position.y) && (player.projectile.position.y <= this.position.y + this.height)) {
            player.pressedKeys['shoot'] = false;
            this.HP -= 10;
          }

    // monitors collision with player
    if (((player.position.x <= this.position.x) && (this.position.x <= (player.position.x + player.width))) || ((this.position.x <= player.position.x) && (player.position.x <= (this.position.x + this.width))))
      if (((player.position.y <= this.position.y) && (this.position.y <= (player.position.y + player.height))) || ((this.position.y <= player.position.y) && (player.position.y <= (this.position.y + this.height)))) {
        player.HP -= 100;
        this.HP -= 50;
      }
  };
}
