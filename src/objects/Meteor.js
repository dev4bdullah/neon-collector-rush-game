export default class Meteor extends Phaser.Physics.Arcade.Sprite{
constructor(scene,x,y){super(scene,x,y,"meteor");scene.add.existing(this);scene.physics.add.existing(this);this.setVelocityY(300)}
}