/*

// Charger le module socket.io
const socket = require('socket.io');

// Écouter les connexions entrantes sur le serveur
const io = socket(server);

// Quand un client se connecte, imprimer un message dans la console
io.on('connection', (socket) => {
  console.log('Un nouveau client est connecté !');
});

// Créer une fonction pour envoyer les messages des utilisateurs à tous les autres clients connectés
function broadcast(sender, message) {
  socket.broadcast.emit('chat message', { sender, message });
}

// Quand un client envoie un message, appeler la fonction broadcast
io.on('connection', (socket) => {
  socket.on('chat message', (message) => {
    broadcast(socket.id, message);
  });
});

function sendPlayerInfo(player) {
  socket.emit('player info', player);
}

*/



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
                y:  50 // Composante y de la gravité en pixels par seconde carrée
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

    player = {
        name:"character",
        x: 200,
        y: 200,
        collideWorldBounds: true,
        type: "joueur",
        id: 0,
    };

    this.display = {
        objects: [],
        character:[]
    };
    this.world = {
        name:"tuto",
        objects: [
            {
                name: "backgrounddonjon",
                x: 0,
                y: 0,
                allowGravity: false,
                immovable: true,
                collisions: false,
                originX: 0,
                originY: 0,
                size: 2.3,
                depth: 0,
            },
            {
                name:"mur_long_horizontal",
                x: 350,
                y: 713,
                allowGravity: false,
                immovable: true,
                collisions: true
            },
            {
                name:"mur_long_horizontal",
                x: 1046,
                y: 713,
                allowGravity: false,
                immovable: true,
                collisions: true
            },
            {
                name:"mur_long_vertical",
                x: 10,
                y: 5,
                originX: 0,
                originY: 0,
                allowGravity: false,
                immovable: true,
                collisions: true,
            },
            {
                name:"mur_long_vertical",
                x: 1260,
                y: 5,
                originX: 0,
                originY: 0,
                allowGravity: false,
                immovable: true,
                collisions: true,
            },
            {
                name:"mur_long_horizontal",
                x: 1200,
                y: 600,
                allowGravity: false,
                immovable: true,
                collisions: true
            },
            {
                name:"mur_long_horizontal",
                x: 800,
                y: 400,
                allowGravity: false,
                immovable: true,
                collisions: true
            },
        ],
        character: [
            player,
            {
            name:"zombie",
            x: 1000,
            y: 500,
            collisions: true,
            type: "pnj",
            ia: "simple",
            gauche: 1,
        }]
    };

    this.load.image('character', 'assets/character.png');
    this.load.image('zombie', 'assets/character.png');
    this.load.image('backgrounddonjon', 'assets/backgrounddonjon.png');
    this.load.image('mur_long_horizontal', 'assets/mur_long_horizontal.png');
    this.load.image('mur_long_vertical', 'assets/mur_long_vertical.png');
}

function create ()
{   
    //      Personnage
    //this.display.character.push(this.physics.add.image(character.x, character.y, character.name));
    //this.display.character[this.display.character.length - 1].setScale(5, 5);
    //this.display.character[this.display.character.length - 1].body.collideWorldBounds = true;

    //this.physics.add.collider(perso, ground);


    //      Envirenoment
    for (let i = 0; i < this.world.character.length; i++) {
        this.display.character.push (this.physics.add.image(this.world.character[i].x, this.world.character[i].y, this.world.character[i].name));
        this.display.character[this.display.character.length - 1].depth = 100;
        if ("collideWorldBounds" in this.world.character[i]){
            this.display.character[this.display.character.length - 1].body.collideWorldBounds = this.world.character[i].collideWorldBounds;
        }
    }

    for (let i = 0; i < this.world.objects.length; i++) {
        this.display.objects.push (this.physics.add.image(this.world.objects[i].x, this.world.objects[i].y, this.world.objects[i].name));
        if ("collisions" in this.world.objects[i] && this.world.objects[i].collisions)
            for(let j = 0; j < this.display.character.length; j++){
                this.physics.add.collider(this.display.character[j], this.display.objects[i]);
            }
        if ("allowGravity" in this.world.objects[i])
            this.display.objects[this.display.objects.length - 1].body.allowGravity = this.world.objects[i].allowGravity;
        if ("originX" in this.world.objects[i] && "originY" in this.world.objects[i]){
            this.display.objects[this.display.objects.length - 1].setOrigin(this.world.objects[i].originX, this.world.objects[i].originY);
            //this.display.objects[this.display.objects.length - 1]._displayOriginX = this.world.objects[i].originX
            //this.display.objects[this.display.objects.length - 1]._displayOriginY =this.world.objects[i].originY;
        }
        if ("size" in this.world.objects[i])
            this.display.objects[this.display.objects.length - 1].setScale(this.world.objects[i].size);
        if ("depth" in this.world.objects[i])
            this.display.objects[this.display.objects.length - 1].depth = this.world.objects[i].depth;
        if ("angle" in this.world.objects[i]){
            this.display.objects[this.display.objects.length - 1].setAngle(this.world.objects[i].angle);
            //this.display.objects[this.display.objects.length - 1].w = 90;
        }
        if ("immovable" in this.world.objects[i]){
            this.display.objects[this.display.objects.length - 1].body.immovable = this.world.objects[i].immovable;
        }
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
    //console.log(this.display.character[0]);
    //console.log(this.world.objects[0]);
    //console.log(cursors);
}

//  The update function is passed 2 values:
//  The current time (in ms)
//  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

function update (time, delta)
{   

    //        Gravite et Deplacement

    for (let i = 0; i < this.world.character.length; i++) {
            if(true){
                this.display.character[i].body.velocity.y += this.physics.world.gravity.y;
            }
                if (("type" in this.world.character[i] && this.world.character[i].type == "pnj" && "ia" in this.world.character[i] && this.world.character[i].ia == "simple")){
                    if (this.world.character[i].gauche == 1){
                        this.display.character[i].setVelocityX(-50);
                        this.display.character[i].setFlipX(true);
                    }
                    else{
                        this.display.character[i].setVelocityX(50);
                        this.display.character[i].setFlipX(false);
                    }
                    if (this.display.character[i].body.blocked.left){
                        this.world.character[i].gauche = 0;
                    }
                    else if (this.display.character[i].body.blocked.right){
                        this.world.character[i].gauche = 1;
                    }
                }
                /*if ("type" in this.world.character[i] && this.world.character[i].type == "joueur"){
                    for (let j = 0; j < 20; j++){
                        if (lst_player[j].id > this.world.character[i].id){
                            j = 20;
                        }
                        if (lst_player[j].id == this.world.character[i].id){
                            this.display.character[i].x = lst_player[j].x
                            this.display.character[i].y = lst_player[j].y
                            this.display.character[i].setFlipX(lst_player[j].FlipX)
                        }
                    }
                }*/
    }
    perso = this.display.character[0];
    
    if (perso.body.touching.down)
        perso.setVelocityX(0);
    /*if (cursors.up.isDown && ((cursors.left.isDown && perso.body.touching.left) || (cursors.right.isDown && perso.body.touching.right))){
        perso.setVelocityY(-750);
        perso.setVelocityX(-1750);
    }*/
    if (cursors.up.isDown && perso.body.touching.right) {
        perso.setVelocityY(-1200);
        perso.setVelocityX(-400);
        perso.setFlipX(true);
    }

    if (cursors.up.isDown && perso.body.touching.left) {
        perso.setVelocityY(-1200);
        perso.setVelocityX(400);
        perso.setFlipX(false);
    }

    if ((cursors.up.isDown && perso.body.touching.down) || cursors.ctrl.isDown){
        perso.setVelocityY(-1000);
    }
    
    if (cursors.down.isDown){
        perso.setVelocityY(500);
    }
    
    if (cursors.left.isDown && perso.body.touching.down){
        perso.setVelocityX(-500);
        perso.setFlipX(true);
    }
    
    if (cursors.right.isDown && perso.body.touching.down){
        perso.setVelocityX(500);
        perso.setFlipX(false);
    }

    //      Envoie des information du joueur

    //send_player_info(this.display.character[0]);
}
