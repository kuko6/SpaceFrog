// spawns enemies for level 1
function level1() {
  let enemies = [], a, type, posX, posY;

  for (let i = 0; i < 20; i++) {
    a = '' + (Math.floor(Math.random() * 3) + 1);
    type = 'invader' + a;

    posX = (Math.floor(Math.random() * 1000));
    posY = (Math.floor(Math.random() * -100)) * (i+5);
    if (i == 0)
      posY = -100;

    enemies.push(new Invader(type, 45, 35, posX, posY, 5));
  };
  return enemies;
};

// spawns enemies for level 2
function level2() {
  let enemies = [], a, type, posX, posY;

  for (let i = 0; i < 30; i++) {
    posX = (Math.floor(Math.random() * 1000));
    posY = (Math.floor(Math.random() * -100)) * (i+20);
    if (i == 0)
      posY = -100;

    if (i % 5 == 0 && i != 0) {
      a = '' + (Math.floor(Math.random() * 3) + 4);
      type = 'invader' + a;
      enemies.push(new Copycat(type, 50, 50, posX, posY, 4));
    }
    else {
      a = '' + (Math.floor(Math.random() * 3) + 1);
      type = 'invader' + a;
      enemies.push(new Invader(type, 45, 35, posX, posY, 6));
    }
  };
  return enemies;
};

// spawns enemies for level 3
function level3() {
  let enemies = [], a, type, posX, posY;

  for (let i = 0; i < 40; i++) {
    a = '' + (Math.floor(Math.random() * 3) + 1);
    type = 'invader' + a;

    posX = (Math.floor(Math.random() * 1000));
    posY = (Math.floor(Math.random() * -100)) * (i+5);
    if (i == 0)
      posY = -100;

    if (i % 5 == 0 && i != 0) {
      a = '' + (Math.floor(Math.random() * 3) + 4);
      type = 'invader' + a;
      enemies.push(new Copycat(type, 50, 50, posX, posY, 5));
    }
    else if (i % 6 == 0 && i != 0) {
      enemies.push(new UFO('ufo', 60, 30, posX, posY - (300*i), 8));
    }
    else {
      a = '' + (Math.floor(Math.random() * 3) + 1);
      type = 'invader' + a;
      enemies.push(new Invader(type, 45, 35, posX, posY, 7));
    }
  };
  return enemies;
};
