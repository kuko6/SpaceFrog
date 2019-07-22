class GameOver {
  constructor() {
    this.title = document.getElementById('gameover');
  }

  draw() {
    ctx.drawImage(this.title, 300, 200, 600, 100);

    ctx.fillStyle = "#88ff44";
    ctx.font = '30px pixel';
    ctx.fillText('Press R to try again...', 450, 430);

    ctx.fillStyle = "#ff7c44";
    ctx.font = '30px pixel';
    ctx.fillText('Press Escape to go back to Menu...', 350, 460);

    ctx.fillStyle = "white";
    ctx.font = '30px pixel';
    ctx.fillText('score: ', 530, 380);
    ctx.fillText(player.sc, 630, 380)
    player.sc = '' + player.score;
  };
}
