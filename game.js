// create a new Phaser game with a canvas that is the size of the screen
var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
});

// define the main game state
var mainState = {
  // define some variables to keep track of the player's position and velocity
  playerX: 100,
  playerY: 100,
  playerVX: 0,
  playerVY: 0,

  // define some constants for the player's size and speed
  PLAYER_SIZE: 20,
  PLAYER_SPEED: 2,
  JUMP_SPEED: 10,

  // define some platforms for the player to land on
  platforms: [
    {x: 50, y: 150, width: 200, height: 20},
    {x: 100, y: 100, width: 100, height: 20},
    {x: 150, y: 50, width: 50, height: 20},
  ],

  // define some constants for the platform colors
  PLATFORM_FILL_COLOR: "rgb(150, 190, 255)",
  PLATFORM_STROKE_COLOR: "rgb(50, 50, 50)",

  // define a function to create the game world
  create: function() {
    // create a graphics object to draw the platforms with
    this.platformsGraphics = game.add.graphics();

    // create a graphics object to draw the player with
    this.playerGraphics = game.add.graphics();

    // create the game controls
    this.cursors = game.input.keyboard.createCursorKeys();
  },

  // define a function to draw a platform
  drawPlatform: function(platform) {
    this.platformsGraphics.fillStyle(this.PLATFORM_FILL_COLOR);
    this.platformsGraphics.strokeStyle(this.PLATFORM_STROKE_COLOR);
    this.platformsGraphics.lineWidth = 2;

    this.platformsGraphics.fillRect(platform.x, platform.y, platform.width, platform.height);
    this.platformsGraphics.strokeRect(platform.x, platform.y, platform.width, platform.height);
  },

  // define a function to draw the player
  drawPlayer: function() {
    this.playerGraphics.fillStyle(Phaser.Color.RED);
    this.playerGraphics.strokeStyle(Phaser.Color.BLACK);
    this.playerGraphics.lineWidth = 2;

    this.playerGraphics.fillRect(this.playerX - this.PLAYER_SIZE / 2, this.playerY - this.PLAYER_SIZE / 2, this.PLAYER_SIZE, this.PLAYER_SIZE);
    this.playerGraphics.strokeRect(this.playerX - this.PLAYER_SIZE / 2, this.playerY - this.PLAYER_SIZE / 2, this.PLAYER_SIZE, this.PLAYER_SIZE);
  },
};
