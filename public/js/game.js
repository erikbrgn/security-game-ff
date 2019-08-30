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

function preload ()
{
    this.load.image('floor', '../assets/floor.png');
    this.load.image('girl', '../assets/sprite_girl.png');
    this.load.image('table', '../assets/table.png');
    this.load.image('plant', '../assets/plant.png');
    this.load.image('cat', '../assets/cat.png');
    this.load.image('ship', '../assets/Turtle.png');

}

function create ()
{
    this.add.image(400, 300, 'floor');

    //init player model
    player = this.physics.add.image(400, 300, 'ship');

    player.setDamping(true);
    player.setDrag(0.99);
    player.setMaxVelocity(200);

    cursors = this.input.keyboard.createCursorKeys();

    platforms = this.physics.add.staticGroup();

    platforms.create(600, 400, 'table').setScale(0.4).refreshBody();
    platforms.create(120, 250, 'plant').setScale(0.3).refreshBody();
    platforms.create(750, 220, 'cat').setScale(0.1).refreshBody();


    this.physics.add.collider(player, platforms);
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
