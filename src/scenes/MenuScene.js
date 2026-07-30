export default class MenuScene extends Phaser.Scene{
constructor(){super("MenuScene")}
create(){
let w=this.scale.width,h=this.scale.height;
this.add.text(w/2,h*.3,"NEON\nCOLLECTOR RUSH",{fontSize:"60px",color:"#00ffff",align:"center"}).setOrigin(.5);
let b=this.add.text(w/2,h*.7,"START GAME",{fontSize:"40px",color:"#ffff00",backgroundColor:"#222",padding:20}).setOrigin(.5);
b.setInteractive(); b.on("pointerdown",()=>this.scene.start("GameScene"));
// small instruction on menu
this.add.text(w/2,h*.5,"Collect crystals (+10). Avoid meteors. Reach 100 to win.",{fontSize:"18px",color:"#fff"}).setOrigin(.5);
}}
