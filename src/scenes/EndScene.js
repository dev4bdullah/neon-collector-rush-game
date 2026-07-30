export default class EndScene extends Phaser.Scene{
constructor(){super("EndScene")}
init(d){this.d=d}
create(){
let w=this.scale.width,h=this.scale.height;
this.add.text(w/2,h*.35,this.d.win?"YOU WIN":"GAME OVER",{fontSize:"70px",color:"#fff"}).setOrigin(.5);
this.add.text(w/2,h*.5,`Score: ${this.d.score}`,{fontSize:"30px",color:"#fff"}).setOrigin(.5);
let b=this.add.text(w/2,h*.72,"RESTART",{fontSize:"40px",color:"#ffff00",backgroundColor:"#222",padding:12}).setOrigin(.5);
b.setInteractive();b.on("pointerdown",()=>this.scene.start("GameScene"));
let m=this.add.text(w/2,h*.85,"BACK TO MENU",{fontSize:"20px",color:"#00ffff"}).setOrigin(.5);
m.setInteractive();m.on('pointerdown',()=>this.scene.start('MenuScene'));
}
}