export default class Crystal extends Phaser.Physics.Arcade.Sprite{
constructor(scene,x,y){super(scene,x,y,"crystal");scene.add.existing(this);scene.physics.add.existing(this);this.setVelocityY(200)}
}