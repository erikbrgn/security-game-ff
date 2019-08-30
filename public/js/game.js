var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;
var platforms;

function preload ()
{
    this.load.image('floor', '../assets/floor.png');
    this.load.image('girl', '../assets/sprite_girl.png');
    this.load.image('chair', '../assets/icon.png');
    this.load.image('ship', '../assets/Turtle.png');

}

function create ()
{
    this.add.image(400, 300, 'floor');

    //init player model
    player = this.matter.add.image(400, 300, 'ship')

    cursors = this.input.keyboard.createCursorKeys();

    platforms = this.physics.add.staticGroup();

    platforms.create(600, 400, 'icon');
    platforms.create(50, 250, 'icon');
    platforms.create(750, 220, 'icon');

    this.physics.add.collider(player, platforms);
}

function update ()
{


    if (cursors.left.isDown)
    {
        player.setAngularVelocity(-0.1);
    }
    else if (cursors.right.isDown)
    {
        player.setAngularVelocity(0.1);
    }

    if (cursors.up.isDown)
    {
        player.thrust(0.08);
    }


}