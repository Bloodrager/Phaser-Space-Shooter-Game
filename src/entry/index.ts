import "../../assets/html/style.css";
import * as Phaser from "phaser";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  width: 1920,
  height: 1080,
  scene: [Scene1, Scene2],
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
};

export default new Phaser.Game(config);
