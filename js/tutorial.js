class Tutorial {
  constructor(id, width, height) {
    this.tutorial = document.getElementById(id);

    this.width = width;
    this.heigh = height;
  }

  draw() {
    ctx.drawImage(this.tutorial, 200, 100, this.width, this.heigh);
  };
}
