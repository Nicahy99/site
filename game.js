// Créer une nouvelle instance de Phaser
const game = new Phaser.Game({
  width: 640,
  height: 480,
  scene: {
    // Définir la logique de la scène
    create: function() {
      // Dessiner le sol et le personnage avec des formes géométriques
      this.add.rectangle(320, 440, 640, 80, 0x999999);
      this.add.circle(100, 100, 20, 0xffffff);
    },
    // Fonction appelée après le chargement des ressources de la scène
    onCreate: function() {
      // Récupérer le personnage
      const character = this.add.getChildren().find(child => child.type === "Circle");
      // Définir la gravité pour le personnage
      character.body.gravity.y = 500;
    },
    // Définir la boucle de jeu principale
    update: function() {
      // Récupérer les entrées du clavier
      const cursor = this.input.keyboard.createCursorKeys();
      // Récupérer le personnage
      const character = this.add.getChildren().find(child => child.type === "Circle");
      // Déplacer le personnage selon les entrées du clavier
      if (cursor.left.isDown) {
        character.x -= 5;
      }
      if (cursor.right.isDown) {
        character.x += 5;
      }
      // Faire sauter le personnage
      if (cursor.up.isDown) {
        character.body.velocity.y = -400;
      }
    }
  }
});



