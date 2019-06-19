class Boss2 extends GameObject {
  constructor(id, width, height, speed) {
    super(id, width, height, speed);

    this.position = {
      x: (GAME_WIDTH - this.width) / 2,
      y: -(this.height + 200)
    };

    this.fire = true;

    this.projectiles = [];
    this.projectile = {
      x: 0,
      y: 0,
      mode: 1,
      speed: 5
    };

    this.HP = 1000;
  }

  createProjectiles() {
    for (let i = 0; i < 4; i++) {
      this.projectile.y = this.position.y + 200 - (Math.floor(Math.random() * 50) + 0);
      this.projectile.x = this.position.x + 7 + (i*47);
      this.projectiles.push(new ProjectileBoss2(55, 40, this.projectile.speed, this.projectile.x, this.projectile.y, i, this.projectile.mode));
    }

    // changes projectile mode
    if (this.HP <= 750 && this.HP > 250) {
      if (this.projectile.mode == 1) {
        this.projectile.mode = 2;
      }
      else if (this.projectile.mode == 2 && this.HP > 500) {
        this.projectile.mode = 1;
      }
      else if (this.HP <= 500 && this.projectile.mode == 2) {
        this.projectile.mode = 3;
      }
      else if (this.projectile.mode == 3) {
        this.projectile.mode = 1;
      }
    }
    else if (this.HP <= 250) {
      this.projectile.mode = (Math.floor(Math.random() * 3) + 1);
    }
  };

  shoot() {
    if (!this.projectiles.length) {
      this.createProjectiles();
    }

    for (let i in this.projectiles) {
      this.projectiles[i].draw();
      this.projectiles[i].update();

      if (this.projectiles[i].dead == true) {
        this.projectile.y = this.position.y + (this.height/2);
        this.projectile.x = this.position.x + (this.width) - 67;
        this.projectiles.splice(i, 1);
        break;
      }
    }
  };

  updateHP() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.position.x - 33, this.position.y - 25, this.HP/4, 10);

    ctx.fillStyle = "red";
    ctx.fillRect(this.HP/4 + (this.position.x - 33), this.position.y - 25, 250 - this.HP/4, 10);
  };

  update() {
    // move
    if (this.position.y < 50)
      this.position.y += this.speed;

    // shoot
    if (this.position.y >= 50)
      this.shoot();

    // updates the HP bar
    this.updateHP();

    // monitors collision with player projectiles
    if (this.position.y >= 50)
      if ((player.projectile.position.x >= this.position.x) || (player.projectile.position.x2 >= this.position.x) && (player.pressedKeys.shoot == true))
        if ((player.projectile.position.x <= this.position.x + this.width) || (player.projectile.position.x2 <= this.position.x + this.width))
          if ((player.projectile.position.y >= this.position.y) && (player.projectile.position.y <= this.position.y + this.height)) {
            player.pressedKeys['shoot'] = false;
            this.HP -= 10;
          }

    // monitors collision with player
    if (((player.position.x <= this.position.x) && (this.position.x <= (player.position.x + player.width))) || ((this.position.x <= player.position.x) && (player.position.x <= (this.position.x + this.width))))
      if (((player.position.y <= this.position.y) && (this.position.y <= (player.position.y + player.height))) || ((this.position.y <= player.position.y) && (player.position.y <= (this.position.y + this.height)))) {
        player.HP -= 50;
      }
  };
}
