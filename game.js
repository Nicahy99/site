// create a new Phaser game
var game = new Phaser.Game({
  width: 400,
  height: 300,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
});

// define some variables to keep track of the player's position and velocity
var player;
var cursors;

// define some constants for the player's size and speed
var PLAYER_SIZE = 20;
var PLAYER_SPEED = 150;
var JUMP_SPEED = 300;

// define some platforms for the player to land on
var platforms;

// define some constants for the platform colors
var PLATFORM_FILL_COLOR = 0x96beff;
var PLATFORM_STROKE_COLOR = 0x323232;

function preload() {
  // nothing to preload in this example
}

function create() {
  // create the player
  player = this.add.rectangle(100, 100, PLAYER_SIZE, PLAYER_SIZE, 0xff0000);

  // create the platforms
  platforms = this.add.group();
  platforms.add(this.add.rectangle(50, 150, 200, 20, PLATFORM_FILL_COLOR, PLATFORM_STROKE_COLOR));
  platforms.add(this.add.rectangle(100, 100, 100, 20, PLATFORM_FILL_COLOR, PLATFORM_STROKE_COLOR));
  platforms.add(this.add.rectangle(150, 50, 50, 20, PLATFORM_FILL_COLOR, PLATFORM_STROKE_COLOR));

  // enable physics for the player and platforms
  this.physics.world.enable([player, platforms]);

  // set the player's bounciness
  player.setBounce(0.2);

  // set the player's gravity
  player.body.gravity.y = 600;

  // set the platforms to be immovable
  platforms.getChildren().forEach(function(platform) {
    platform.body.immovable = true;
  });

  // enable cursor keys for player movement
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // make the player and platforms collide
  this.physics.collide(player, platforms);

  // move the player left and right
  if (cursors.left.isDown) {
    player.setVelocityX(-PLAYER_SPEED);
  } else if (cursors.right.isDown) {
    player.setVelocityX(PLAYER_SPEED);
  } else {
    player.setVelocityX(0);
  }

  // make the player jump
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-JUMP_SPEED);
  }
}
