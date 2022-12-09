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
                y: 50 // Composante y de la gravité en pixels par seconde carrée
            },
        },
    },
};

let sol;

let perso;
let cursors;

var map = {
    name: "tuto",
    background: "",
};
var game = new Phaser.Game(config);

function preload ()
{
    this.display = {
        objects: [],
        character:[]
    };
    this.world = {
        name:"tuto",
        objects: [
            {
                name:"mur_long",
                x: 350,
                y: 713,
                allowGravity: false,
                immovable: true,
                collisions: true
            },
            {
                name:"mur_long",
                x: 1046,
                y: 713,
                allowGravity: false,
                immovable: true,
                collisions: true
            },
            {
                name:"mur_long",
                x: 1200,
                y: 600,
                allowGravity: false,
                immovable: true,
                collisions: true
            },
        ],
        character: [{}]
    };

    this.load.image('character', 'assets/character.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('mur_long', 'assets/mur_long.png');
}

function create ()
{   
    //      Personnage
    
    this.display.character.push(this.physics.add.image(200, 200, 'character'));
    //this.display.character[this.display.character.length - 1].setScale(5, 5);
    this.display.character[this.display.character.length - 1].body.collideWorldBounds = true;

    //this.physics.add.collider(perso, ground);


    //      Envirenoment
    for (let i = 0; i < this.world.character.length; i++) {

    }
    for (let i = 0; i < this.world.objects.length; i++) {
        this.display.objects.push (this.physics.add.image(this.world.objects[i].x, this.world.objects[i].y, this.world.objects[i].name));
        if ("collisions" in this.world.objects[i] && this.world.objects[i].collisions)
            for(let j = 0; j < this.display.character.length; j++){
                this.physics.add.collider(this.display.character[j], this.display.objects[i]);
            }
        if ("allowGravity" in this.world.objects[i])
            this.display.objects[this.display.objects.length - 1].body.allowGravity = this.world.objects[i].allowGravity;
        if ("immovable" in this.world.objects[i])
            this.display.objects[this.display.objects.length - 1].body.immovable = this.world.objects[i].immovable;
    }

    //ground.body.setFriction(1, 1);
    //ground.body.setBounce(2, 2);

    //      Input

    cursors = this.input.keyboard.createCursorKeys();
    //console.log(Phaser.Input.Keyboard.KeyCodes);
    cursors.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    console.log(this);
    //console.log(ground);
    //this.physics.add.collider(this.display.character[0], this.world.objects[0]);
    console.log(this.display.character[0]);
    console.log(this.world.objects[0]);
    console.log(cursors);
}

//  The update function is passed 2 values:
//  The current time (in ms)
//  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

function update (time, delta)
{   
    //        Gravite et Deplacement
    perso = this.display.character[0];
    perso.body.velocity.y += this.physics.world.gravity.y;
    
    perso.setVelocityX(0);

    if ((cursors.up.isDown && perso.body.touching.down) || cursors.ctrl.isDown){
        perso.setVelocityY(-1000);
    }
    
    if (cursors.down.isDown){
        perso.setVelocityY(500);
    }
    
    if (cursors.left.isDown){
        perso.setVelocityX(-500);
        perso.setFlipX(true);
    }
    
    if (cursors.right.isDown){
        perso.setVelocityX(500);
        perso.setFlipX(false);
    }


}
