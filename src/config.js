import Phaser from "phaser";
import BootScene from "./scenes/BootScene.js";
import MenuScene from "./scenes/MenuScene.js";
import GameScene from "./scenes/GameScene.js";
import EndScene from "./scenes/EndScene.js";

export default {
 type: Phaser.AUTO,
 parent:"game",
 width:720,
 height:1280,
 scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},
 physics:{default:"arcade",arcade:{gravity:{y:0}}},
 scene:[BootScene,MenuScene,GameScene,EndScene]
};