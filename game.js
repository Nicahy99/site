/*var config = {
    // Paramètres généraux
    type: Phaser.AUTO, // Type de rendu à utiliser
    width: 1280, // Largeur du jeu en pixels
    height: 720, // Hauteur du jeu en pixels
    parent: 'phaser-example', // Élément HTML parent dans lequel afficher le jeu
    backgroundColor: '#000000', // Couleur d'arrière-plan du jeu
    useTicker: true, // Activer le moteur de physique
    fps: 60, // Nombre d'images par seconde souhaité
    pixelArt: true, // Activer le rendu pixelisé
    scene:{
        preload: preload,
        create: create,
        update: update
    },
    audio: { // Paramètres audio
        noAudio: false, // Désactiver la prise en charge audio
        disableWebAudio: false, // Désactiver Web Audio API
        audioMute: false, // Démarrer le jeu avec le son désactivé
        context: null, // Contexte audio personnalisé à utiliser
        mute: false, // Démarrer le jeu avec le son désactivé
        volume: 1, // Volume global du jeu (entre 0 et 1)
        rate: 1, // Vitesse de lecture des fichiers audio (entre 0 et 2)
        detune: 0, // Décalage en cents des fichiers audio (entre -1200 et 1200)
        seek: 0, // Position de lecture initiale des fichiers audio en millisecondes
        loop: false, // Activer la boucle sur les fichiers audio
        delay: 0, // Délai avant la lecture des fichiers audio en millisecondes
        webaudio: { // Paramètres Web Audio API
            context: null, // Contexte audio personnalisé à utiliser
        },
    },
    physics: { // Paramètres du moteur de physique
        default: 'arcade', // Type de moteur de physique à utiliser
        arcade: { // Paramètres du moteur de physique arcade
            gravity: { // Gravité à utiliser
                x: 0, // Composante x de la gravité en pixels par seconde carrée
                y: 300 // Composante y de la gravité en pixels par seconde carrée
            },
            checkCollision: { // Paramètres de collision
                up: true, // Activer les collisions en haut
                down: true, // Activer les collisions en bas
                left: true, // Activer les collisions à gauche
                right: true, // Activer les collisions à droite
            },
            maxObjects: 10, // Nombre maximal d'objets en mémoire pour chaque type de collision
            maxLevels: 4, // Niveau maximal de la hiérarchie de collision
            overlapBias: 4, // Biais de recouvrement pour la détection de collision
        },
    },
}*/

var config = {
    // Paramètres généraux
    type: Phaser.AUTO, // Type de rendu à utiliser
    width: 1280, // Largeur du jeu en pixels
    height: 720, // Hauteur du jeu en pixels
    backgroundColor: '#000000', // Couleur d'arrière-plan du jeu
    fps: 120, // Nombre d'images par seconde souhaité
    scene:{
        preload: preload,
        create: create,
        update: update
    },
    physics: { // Paramètres du moteur de physique
        default: 'arcade', // Type de moteur de physique à utiliser
        arcade: { // Paramètres du moteur de physique arcade
            gravity: { // Gravité à utiliser
                x: 0, // Composante x de la gravité en pixels par seconde carrée
                y: 200 // Composante y de la gravité en pixels par seconde carrée
            },
        },
    },
};


let perso;
let cursors;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('character', 'assets/character.png');
}

function create ()
{   
    //      Input

    cursors = this.input.keyboard.createCursorKeys();

    //      Personnage
    
    perso = this.physics.add.image(200, 200, 'character');
    perso.setScale(0.2, 0.2);
    perso.body.collideWorldBounds = true;
}

//  The update function is passed 2 values:
//  The current time (in ms)
//  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

function update (time, delta)
{   
    perso.body.velocity.y += this.physics.world.gravity.y;
    perso.setVelocityX(0);

    if (cursors.up.isDown){
        perso.setVelocityY(-500);
    }
    
    if (cursors.down.isDown){
        perso.setVelocityY(500);
    }
    
    if (cursors.left.isDown){
        perso.setVelocityX(-500);
    }
    
    if (cursors.right.isDown){
        perso.setVelocityX(500);
    }
}
