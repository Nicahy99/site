var config = {
    // Paramètres généraux
    type: Phaser.AUTO, // Type de rendu à utiliser
    width: 1280, // Largeur du jeu en pixels
    height: 720, // Hauteur du jeu en pixels
    parent: 'phaser-example', // Élément HTML parent dans lequel afficher le jeu
    backgroundColor: '#9adaea', // Couleur d'arrière-plan du jeu
    useTicker: true, // Activer le moteur de physique
    fps: 60, // Nombre d'images par seconde souhaité
    pixelArt: true, // Activer le rendu pixelisé
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
            ...
        },
        ...
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
            ...
        },
        ...
    },
}


var bullet1;
var bullet2;

var speed1;
var speed2;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bullet', 'assets/bullet-bill.png');
    this.load.image('cannon', 'assets/cannon.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('character', 'assets/character.png');
}

function create ()
{
    //   Bullet 1 (600px in 6 seconds)

    this.add.image(0, 200, 'ground').setOrigin(0);

    bullet1 = this.add.image(64, 76, 'bullet').setOrigin(0);

    speed1 = Phaser.Math.GetSpeed(600, 6);

    this.add.image(64, 72, 'cannon').setOrigin(0);

    this.add.text(64, 50, '600px / 6 secs', { fill: '#000' });

    //   Bullet 2 (600px in 3 seconds)

    this.add.image(0, 500, 'ground').setOrigin(0);

    bullet2 = this.add.image(64, 376, 'bullet').setOrigin(0);

    speed2 = Phaser.Math.GetSpeed(600, 3);

    this.add.image(64, 500, 'cannon').setOrigin(0, 1);

    this.add.text(64, 350, '600px / 3 secs', { fill: '#000' });
    
    //      Personnage
    
    perso = this.physics.add.image(0, 0, 'character').setOrigin(0);
    
    perso.setScale(0.5, 0.5);
    
    perso.body.enable = true;
}

//  The update function is passed 2 values:
//  The current time (in ms)
//  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

function update (time, delta)
{
    bullet1.x += speed1 * delta;

    if (bullet1.x > 864)
    {
        bullet1.x = 64;
    }

    bullet2.x += speed2 * delta;

    if (bullet2.x > 864)
    {
        bullet2.x = 64;
    }
    
    this.perso.body.velocity.y += this.physics.world.gravity.y;
}
