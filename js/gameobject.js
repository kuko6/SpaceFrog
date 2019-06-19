class GameObject {
  constructor(name, height, width, speed) {

    this.img = document.getElementById(name);

    this.width = height;
    this.height = width;

    this.speed = speed;
  }

  draw() {
    ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
  };

}
