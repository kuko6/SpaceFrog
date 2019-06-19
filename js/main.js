let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 700;

window.onload = function() {
  let music_title = new Audio('Sounds/music_title.mp3');
  let music = new Audio('Sounds/music.mp3');

  music_title.play();

  player = new Player('spaceship', 50, 50, 8);

  scene = new Menu();
  scene.draw();

  let boss;
  let level = 0;

  let lastTime = 0;
  let enemies = level1();

  // main loop
  function gameLoop(time) {
    let delta = time - lastTime;
    lastTime = time;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // handles starting menu
    if (pressedKeys.enter) {
      scene = new Tutorial('tutorial', 700, 190);
      level = 0.5;
    }

    // handles player
    if (player.lives != 0 && (level != 0 && level <= 3)) {
      player.update(level);
      player.draw();
    }

    // handles tutorial
    if (level == 0 || level == 0.5) {
      scene.draw();
      if (player.pressedKeys.left && level == 0.5)
        scene = new Tutorial('tutorial_shoot', 400, 200);
      if (player.pressedKeys.shoot && level == 0.5) {
        level = 1;

        music.play();
        music_title.pause();
      }
    }

    // handles enemies
    if (level >= 1 && level <= 3) {
      for (let i in enemies) {
        enemies[i].update();
        enemies[i].draw();

        if (enemies[i].dead)
          enemies.splice(i, 1);

        // cleans up the scene when player dies
        if (player.lives == 0)
          enemies.splice(0, enemies.length);

        // spawns boss
        if (!enemies.length && player.lives != 0) {
          console.log("All enemies in level " + ('' + level) + " are dead.");
          if (level == 1)
            boss = new Boss1('boss1', 400, 320, 1);
          else if (level == 2)
            boss = new Boss2('boss2', 180, 210, 1);
          else if (level == 3)
            boss = new Boss3('boss3', 370, 210, 1)
        }
      };
    }

    // handles boss
    if (boss != undefined) {
      boss.update();
      boss.draw();

      if (player.lives == 0)
        boss = undefined;

      if (player.lives != 0 && boss.HP <= 0) {
        player.score += 1000;
        player.HP = 100;
        player.lives++;

        boss = undefined;
        level++;
        setTimeout(() => enemies = eval("level" + level + "();"), 3000);
      }
    }

    // handles Game Over screen
    if (player.lives == 0) {
      scene = new GameOver();

      music.pause();
      scene.draw();

      if (pressedKeys.escape) {
        scene = new Menu();
        level = 0;
        enemies = level1();

        music_title.load();
        music.load();
        music_title.play();

        player = new Player('spaceship', 50, 50, 8);
      }
      else if (pressedKeys.retry) {
        level = 1;
        enemies = level1();

        player = new Player('spaceship', 50, 50, 8);

        music.load();
        music.play();
      }
    }

    // handles Winning screen
    if (level > 3) {
      scene = new Win();
      scene.draw();

      if (pressedKeys.escape) {
        scene = new Menu();
        level = 0;
        enemies = level1();

        player = new Player('spaceship', 50, 50, 8);

        music_title.load();
        music_title.play();
      }
    }
    window.requestAnimationFrame(gameLoop);
  };
  window.requestAnimationFrame(gameLoop);
};
