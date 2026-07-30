import {assets} from "../assets/base64Assets.js";

export default class BootScene extends Phaser.Scene{
	constructor(){ super("BootScene"); }
	preload(){
		// keep base64 assets as fallback
		this.load.image("player", assets.player);
		this.load.image("crystal", assets.crystal);
		this.load.image("meteor", assets.meteor);
	}
	create(){
		// generate simple textures so visuals are always available
		const g = this.add.graphics();
		// player - cyan triangle
		g.clear();
		g.fillStyle(0x00ffff,1);
		g.beginPath();
		g.moveTo(50,10);
		g.lineTo(90,90);
		g.lineTo(10,90);
		g.closePath();
		g.fillPath();
		g.generateTexture('playerTriangle',100,100);
		// crystal - green diamond
		g.clear();
		g.fillStyle(0x00ff99,1);
		const points = [
			{x:50, y:10},
			{x:90, y:50},
			{x:50, y:90},
			{x:10, y:50}
		];
		g.beginPath();
		g.moveTo(points[0].x, points[0].y);
		for(let i=1;i<points.length;i++) g.lineTo(points[i].x, points[i].y);
		g.closePath();
		g.fillPath();
		g.generateTexture('crystalDiamond',100,100);
		// meteor - red circle
		g.clear();
		g.fillStyle(0xff3333,1);
		g.fillCircle(50,50,45);
		g.generateTexture('meteorCircle',100,100);
		g.destroy();

		this.scene.start("MenuScene");
	}
}