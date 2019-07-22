class Win {
  constructor() {
    this.title = document.getElementById('win');
    this.frog = document.getElementById('frog');
  }

  draw() {
    ctx.drawImage(this.frog, 300, 150, 600, 560);
    ctx.drawImage(this.title, 310, 120, 600, 130);

    ctx.fillStyle = "#ff7c44";
    ctx.font = '30px pixel';
    ctx.fillText('Press Escape to go back to Menu...', 380, 500);

    ctx.fillStyle = "white";
    ctx.font = '30px pixel';
    ctx.fillText('score: ', 530, 450);
    ctx.fillText(player.sc, 630, 450)
    player.sc = '' + player.score;
  };
}
