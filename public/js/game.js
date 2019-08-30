var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors;
var platforms;
var player;
var cameraAreas;

function preload ()
{
    this.load.image('floor', '../assets/floor.png');
    this.load.image('girl', '../assets/sprite_girl.png');
    this.load.image('ship', '../assets/intern.png');
    this.load.image('table', '../assets/table.png');
    this.load.image('plant', '../assets/plant.png');
    this.load.image('cat', '../assets/cat.png');
    this.load.spritesheet('greenwalker', '../assets/Greenwalking1.png', { frameWidth: 193, frameHeight: 250 });
    this.load.image('ship', '../assets/Turtle.png');
    this.load.image('triangle-left', '../assets/triangle-left.png');
    this.load.image('triangle-right', '../assets/triangle-right.png');
    this.load.image('stairs', '../assets/stairs.png');


}

function create ()
{
    this.add.image(400, 300, 'floor');

    //init player model
    player = this.physics.add.sprite(400, 300, 'greenwalker').setScale(0.25);

    player.setDamping(true);
    player.setDrag(0.1);
    player.setMaxVelocity(200);

    cursors = this.input.keyboard.createCursorKeys();

    platforms = this.physics.add.staticGroup();
    cameraAreas = this.physics.add.staticGroup();


    platforms.create(600, 500, 'table').setScale(0.4).refreshBody();
    platforms.create(120, 200, 'plant').setScale(0.3).refreshBody();
    platforms.create(400, 150, 'cat').setScale(0.09).refreshBody();
    platforms.create(250, 50, 'stairs').setScale(0.3).refreshBody();
    cameraAreas.create(150, 400, 'triangle-left').setScale(0.8).refreshBody();
    cameraAreas.create(650, 160, 'triangle-right').setScale(0.8).refreshBody();


    this.physics.add.collider(player, platforms);


    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('greenwalker',{ start: 0, end:2}),
        frameRate: 10,
        repeat: -1
        }
    );

    this.physics.add.overlap(player, cameraAreas);

}

function update ()
{
    if (cursors.up.isDown)
    {
        this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
    }
    else
    {
        player.setAcceleration(0);
    }

    if (cursors.left.isDown)
    {
        player.setAngularVelocity(-300);
    }
    else if (cursors.right.isDown)
    {
        player.setAngularVelocity(300);
    }
    else
    {
        player.setAngularVelocity(0);
    }


    this.physics.world.wrap(player, 32);

}
