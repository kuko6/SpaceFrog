class Menu {
  constructor() {
    this.title = document.getElementById('title');
  }

  draw() {
    ctx.drawImage(this.title, 350, 100, 450, 200);
    ctx.fillStyle = "white";
    ctx.font = '30px pixel';
    ctx.fillText('Press Enter...', 500, 400);
  };
}
