import Player from "../objects/Player.js";

export default class GameScene extends Phaser.Scene{
constructor(){super("GameScene")}
create(){
let w=this.scale.width,h=this.scale.height;
this.score=0;this.lives=3;
this.scoreText=this.add.text(20,20,"Score: 0",{fontSize:"32px",color:"#fff"}).setDepth(100);
this.player=new Player(this,w/2,h-150);
this.player.setScale(.8);
this.crystals=this.physics.add.group();
this.meteors=this.physics.add.group();
this.cursors=this.input.keyboard.createCursorKeys();
// instructions and lives
this.livesText=this.add.text(20,60,"Lives: "+this.lives,{fontSize:"28px",color:"#fff"}).setDepth(100);
this.instructionText=this.add.text(w/2,h-40,"← → or tap buttons to move. Collect crystals, avoid meteors.",{fontSize:"20px",color:"#ffffaa",backgroundColor:'#000000',padding:6}).setOrigin(.5).setDepth(100);
// debugText removed for production

// spawn tuned to canvas size (keeps game difficulty proportional)
const crystalDelay = Math.max(600, Math.floor(900 * (720/w)));
const meteorDelay = Math.max(800, Math.floor(1200 * (720/w)));
this.time.addEvent({delay:crystalDelay,loop:true,callback:()=>{
	const cx = Phaser.Math.Between(40,w-40);
	const c = this.physics.add.image(cx, -50, 'crystalDiamond').setVelocityY(200).setScale(0.8).setDepth(1).setVisible(true);
	this.crystals.add(c);
}});
this.time.addEvent({delay:meteorDelay,loop:true,callback:()=>{
	const mx = Phaser.Math.Between(40,w-40);
	const m = this.physics.add.image(mx, -50, 'meteorCircle').setVelocityY(300).setScale(0.9).setDepth(1).setVisible(true);
	this.meteors.add(m);
}});

// overlaps
this.physics.add.overlap(this.player,this.crystals,(p,c)=>{
	c.destroy();
	this.score+=10;
	this.scoreText.setText("Score: "+this.score);
	if(this.score>=100) this.scene.start("EndScene",{win:true,score:this.score});
});
this.physics.add.overlap(this.player,this.meteors,(p,m)=>{
	m.destroy();
	this.lives--;
	this.livesText.setText("Lives: "+this.lives);
	if(this.lives<=0) this.scene.start("EndScene",{win:false,score:this.score});
});

// mobile / touch controls: two transparent buttons
const btnSize = Math.max(64, Math.floor(w*0.18));
this.leftBtn = this.add.rectangle(60,h-80,btnSize,btnSize,0x000000,0.15).setOrigin(0.5).setInteractive();
this.rightBtn = this.add.rectangle(w-60,h-80,btnSize,btnSize,0x000000,0.15).setOrigin(0.5).setInteractive();
this.leftBtnText = this.add.text(60,h-80,"◀",{fontSize:"32px",color:'#fff'}).setOrigin(.5);
this.rightBtnText = this.add.text(w-60,h-80,"▶",{fontSize:"32px",color:'#fff'}).setOrigin(.5);
this.leftPressed = false; this.rightPressed = false;
this.leftBtn.on('pointerdown',()=>this.leftPressed=true); this.leftBtn.on('pointerup',()=>this.leftPressed=false); this.leftBtn.on('pointerout',()=>this.leftPressed=false);
this.rightBtn.on('pointerdown',()=>this.rightPressed=true); this.rightBtn.on('pointerup',()=>this.rightPressed=false); this.rightBtn.on('pointerout',()=>this.rightPressed=false);
}
update(){
// keyboard movement
if(this.cursors.left.isDown) this.player.setVelocityX(-400);
else if(this.cursors.right.isDown) this.player.setVelocityX(400);
else if(this.leftPressed) this.player.setVelocityX(-360);
else if(this.rightPressed) this.player.setVelocityX(360);
else this.player.setVelocityX(0);

// cleanup offscreen crystals/meteors
const h=this.scale.height;
this.crystals.getChildren().forEach(c=>{ if(c.y>h+100) c.destroy(); });
this.meteors.getChildren().forEach(m=>{ if(m.y>h+120) m.destroy(); });
 // (no debug text in production)

// ensure falling velocity is applied (some bodies may lose velocity under certain builds)
// ensure falling velocity is applied for any body without expected velocity
this.crystals.getChildren().forEach(c=>{ if(c.body && c.body.velocity && Math.abs(c.body.velocity.y) < 1) c.body.setVelocityY(200); });
this.meteors.getChildren().forEach(m=>{ if(m.body && m.body.velocity && Math.abs(m.body.velocity.y) < 1) m.body.setVelocityY(300); });
}
}