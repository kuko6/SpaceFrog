class UFO extends Invader {
  constructor(id, width, height, x, y, speed) {
    super(id, width, height, x, y, speed);

    this.beam = {
      img: document.getElementById('beam'),
      active: false,
      mode: 0,
      x: x,
      y: y
    };

    this.HP = 20;

    this.tmp = 0;
  }

  drawProjectile() {
    ctx.drawImage(this.beam.img, this.position.x + 8, this.position.y + 35, 40, 25);
  };

  updateProjectile() {};

  activateBeam() {
    player.pressedKeys['up'] = false;
    player.pressedKeys['down'] = false;
    player.pressedKeys['right'] = false;
    player.pressedKeys['left'] = false;
    player.pressedKeys['shoot'] = false;

    this.position.y -= this.speed/4;
    player.position.y -= this.speed/4;

    if (this.beam.x > GAME_WIDTH/2 && this.beam.mode != 2) {
      this.position.x -= this.speed;
      player.position.x = this.position.x;
      this.beam.mode = 1;
    }
    else if (this.beam.x < GAME_WIDTH/2 && this.beam.mode != 1) {
      this.position.x += this.speed;
      player.position.x = this.position.x;
      this.beam.mode = 2;
    }
  };

  shoot() {
    this.drawProjectile();
    this.activateBeam();
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

    if (this.position.y < player.position.y - 60) {
      this.position.y += 5;
    }
    else if (this.position.y >= player.position.y - 60) {
      this.beam.active = true;
      if (this.tmp++ == 0) {
        this.beam.x = this.position.x;
        this.beam.y = this.position.y;
      }
    }
  };

  update() {
    // move
    if (!this.beam.active)
      this.move();

    // shoot
    if (this.beam.active)
      this.shoot();

    // monitors collision with player projectiles
    if ((player.projectile.position.x >= this.position.x) || (player.projectile.position.x2 >= this.position.x) && (player.pressedKeys.shoot == true))
      if ((player.projectile.position.x <= this.position.x + this.width) || (player.projectile.position.x2 <= this.position.x + this.width))
        if ((player.projectile.position.y >= this.position.y) && (player.projectile.position.y <= this.position.y + this.height)) {
          player.pressedKeys['shoot'] = false;
          this.HP -= 10;
          if (this.HP == 0) {
            player.score += 150;
            this.dead = true;
          }
        }

    // monitors collision with player
    if (((player.position.x <= this.position.x) && (this.position.x <= (player.position.x + player.width))) || ((this.position.x <= player.position.x) && (player.position.x <= (this.position.x + this.width))))
      if (((player.position.y <= this.position.y) && (this.position.y <= (player.position.y + player.height))) || ((this.position.y <= player.position.y) && (player.position.y <= (this.position.y + this.height)))) {
        this.dead = true;
        player.HP -= 50;
        player.score += 150;
      }

    // tests for borders
    if (this.position.x > GAME_WIDTH) {
      this.beam.active = false;
      this.dead = true;
    }
    if (this.position.x < 0) {
      this.beam.active = false;
      this.dead = true;
    }
  };
}
