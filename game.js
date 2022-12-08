// Créer une nouvelle instance de Phaser
const game = new Phaser.Game({
  width: 640,
  height: 480,
  scene: {
    // Définir la logique de la scène
    create: function() {
      // Créer un personnage en utilisant un sprite
      const character = this.add.sprite(100, 100, "character");
      // Définir la gravité pour le personnage
      character.body.gravity.y = 500;
    },
    // Définir la boucle de jeu principale
    update: function() {
      // Récupérer les entrées du joueur
      const cursors = this.input.keyboard.createCursorKeys();
      // Récupérer le personnage
      const character = this.children.entries[0];
      // Mettre à jour la vélocité du personnage en fonction des entrées du joueur
      if (cursors.left.isDown) {
        character.body.velocity.x = -200;
      } else if (cursors.right.isDown) {
        character.body.velocity.x = 200;
      } else {
        character.body.velocity.x = 0;
      }
      // Permettre au personnage de sauter en appuyant sur la touche "espace"
      if (cursors.space.isDown && character.body.touching.down) {
        character.body.velocity.y = -500;
      }
    }
  }
});
