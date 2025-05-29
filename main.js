const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const countDisplay = document.getElementById('count');

// Utility
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Ball constructor
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls) {
    for (let ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          this.color = ball.color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
        }
      }
    }
  }
}

// Create initial balls
const balls = [];

for (let i = 0; i < 15; i++) {
  balls.push(new Ball(
    random(0, canvas.width),
    random(0, canvas.height),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
    random(10, 20)
  ));
}

// Animation loop
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls);
  }

  countDisplay.textContent = balls.length;
  requestAnimationFrame(loop);
}

loop();

// Add ball on canvas click
canvas.addEventListener('click', () => {
  balls.push(new Ball(
    random(0, canvas.width),
    random(0, canvas.height),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
    random(10, 20)
  ));
});
