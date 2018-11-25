let gameScore = 0,
	lives = 3,
	livesLeft = document.querySelector('.lives > span'),
	score = document.querySelector('.score > span');


// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    livesLeft.innerText = lives;

    if (this.x > 505) {
        this.x = -150;
        this.speed = 150 + Math.floor(Math.random() * 800);
    }

//collision between player & enemies
if (player.x < this.x + 60 &&
    player.x + 37 > this.x &&
    player.y < this.y + 25 &&
    30 + player.y > this.y) {
    player.x = 200;
    player.y = 380;
    lives--;
    livesLeft.innerText = lives;
    if (lives === 0) {
      //Will replace with modal
      confirm(`Game Over, dude! Do you wish to play again?`);
      lives = 3;
      gameScore = 0;
      livesLeft.innerText = lives;
      score.innerText = '';
    }
 }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    // this.speed = speed;
    this.player = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a constiable called player
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    if (this.y < 0) {
        setTimeout (function () {
            player.x = 202;
            player.y = 405;
        }, 600);
  // When player reaches the water, 100 points will be added to their game score
        gameScore++;
        score.innerText = gameScore * 100;
        if (gameScore === 10 && lives > 0) {
          confirm('You have won the game!');
          lives = 3;
          gameScore = 0;
          livesLeft.innerText = lives;
          score.innerText = '';
        }
    }
}

const allEnemies = [];
const enemyLocation = [63, 147, 230];

enemyLocation.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

const player = new Player (202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }

    player.handleInput(allowedKeys[e.keyCode]);

});
