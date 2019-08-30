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
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;

function preload ()
{
    this.load.image('floor', '../assets/floor.png');
    this.load.image('girl', '../assets/sprite_girl.png');

}

function create ()
{
    this.add.image(400, 300, 'floor');
    //init player model
    player = this.physics.add.sprite(100, 100, 'girl');

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });


    cursors = this.input.keyboard.createCursorKeys();

}

function update ()
{


    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }

    if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }




}