class Boss1 extends GameObject {
  constructor(id, width, height, speed) {
    super(id, width, height, speed);

    // original position
    this.x = (GAME_WIDTH - this.width) / 2;
    this.y = -(this.height + 200);

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
      speed: 8
    };

    this.younglings = [];

    this.HP = 1000;
  }

  spawnYoungling() {
    if (this.HP == 500 && this.younglings.length == 0) {
      this.younglings.push(new Youngling('boss1', 80, 65, 7, this.position.x, this.position.y));
    }
  };

  updateYounglings() {
    for (let i in this.younglings) {
      if (this.younglings[i].speed.x == 0) {
        this.younglings[i].position.x = this.position.x - 120;
      }
      this.younglings[i].update();
      this.younglings[i].draw();
      if (this.younglings[i].HP <= 0) {
        this.younglings.splice(i, 1);
        player.score += 200;
      }
    };
  };

  createProjectiles() {
    for (let a = 0; a < 8; a++) {
      this.projectile.y = this.position.y + (this.height/2);
      this.projectile.x = this.position.x + (this.width) - 67;
      this.projectiles.push(new ProjectileBoss1(15, 15, this.projectile.speed, this.projectile.x, this.projectile.y, a, this.projectile.mode))
    }

    if (this.projectile.mode == 1) {
      this.projectile.mode = 2;
    }
    else if (this.projectile.mode == 2) {
      this.projectile.mode = 1;
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
    ctx.fillRect(this.position.x + 73, this.position.y - 15, this.HP/4, 10);

    ctx.fillStyle = "red";
    ctx.fillRect(this.HP/4 + (this.position.x + 73), this.position.y - 15, 250 - this.HP/4, 10);
  };

  move() {
    this.position.x += this.speed;

    // tests for borders
    if (this.position.x + this.width >= this.x + 600)
      this.speed *= -1;
    if (this.position.x <= this.x - 200)
      this.speed *= -1;
  };

  update(){
    // move
    if (this.position.y < 25)
      this.position.y += this.speed;
    if (this.position.y >= 25)
      this.move();

    // shoot
    if (this.position.y >= 25)
      this.shoot();

    // spawns small ship
    this.spawnYoungling();
    this.updateYounglings();

    // updates the HP bar
    this.updateHP();

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
        player.HP -= 50;
      }
  };
}
