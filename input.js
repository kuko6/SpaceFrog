// A = 65, D = 68, W = 87, S = 83, SPACE = 32
document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);

let keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down',
  32: 'shoot',
  13: 'enter',
  27: 'escape',
  82: 'retry',
};

let pressedKeys = {
  enter: false,
  escape: false,
  retry: false
};

function keydown(event) {
  let key = keyMap[event.keyCode];
  player.pressedKeys[key] = true;
  pressedKeys[key] = true;
};

function keyup(event) {
  let key = keyMap[event.keyCode];
  if (event.keyCode != 32) {
    player.pressedKeys[key] = false;
    pressedKeys[key] = false;
  }
};
