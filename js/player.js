class Player extends GameObject {
  constructor(id, width, height, speed) {
    super(id, width, height, speed);

    this.position = {
      x: (GAME_WIDTH - this.width) / 2,
      y: (GAME_HEIGHT - this.height) - 40
    };

    this.pressedKeys = {
      left: false,
      right: false,
      up: false,
      down: false,
      shoot: false
    };

    this.img = document.getElementById('spaceship');
    this.bar = document.getElementById('hpbar');
    this.lives = 3;
    this.HP = 100;

    this.score = 0;
    this.sc = '' + this.score;
    this.projectile = new Projectile(this.position.x, this.position.y);
  }

  shoot() {
    if (this.pressedKeys.shoot) {
      this.projectile.draw();
      this.projectile.update();
    }
    if (!this.pressedKeys.shoot) {
      this.projectile = new Projectile(this.position.x, this.position.y);
    }
  };

  updateLive() {
    let a;
    if (this.HP <= 0)
    {
      this.lives--;
      this.HP = 100;
    }
    for (a = 0; a < this.lives; a++)
      ctx.drawImage(this.img, 5 + (a * 40), 10, 40, 40);
  };

  updateHP() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(10, 60, this.HP, 10);

    ctx.fillStyle = "red";
    ctx.fillRect(this.HP + 10, 60, 100 - this.HP, 10);

    ctx.drawImage(this.bar, 7, 57.5, 106, 15);
  };

  updateScore() {
    ctx.fillStyle = "white";
    ctx.font = '30px pixel';
    ctx.fillText('score: ', GAME_WIDTH - 200, 30);
    ctx.fillText(this.sc, GAME_WIDTH - 100, 30)
    this.sc = '' + this.score;
  };

  update(level) {
    // move
    if (this.pressedKeys.left) {
      this.position.x -= this.speed;
    }
    if (this.pressedKeys.right) {
      this.position.x += this.speed;
    }
    if (this.pressedKeys.up) {
      this.position.y -= this.speed;
    }
    if (this.pressedKeys.down) {
      this.position.y += this.speed;
    }

    // shoot
    this.shoot();

    if (level >= 1) {
      // updates score
      this.updateScore();

      // updates lives
      this.updateLive();

      // updates the HP bar
      this.updateHP();
    }

    // border testing
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > GAME_WIDTH) {
      this.position.x = GAME_WIDTH - this.width;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    if (this.position.y + this.height > GAME_HEIGHT) {
      this.position.y = GAME_HEIGHT - this.height;
    }
  };
}
