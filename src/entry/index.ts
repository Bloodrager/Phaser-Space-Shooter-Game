import "../../assets/html/style.css";
import * as Phaser from "phaser";
import ScenePreload from "./Scenes/ScenePreload";
import SceneGame from "./Scenes/SceneGame";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  width: 1920,
  height: 1080,
  scene: [ScenePreload, SceneGame],
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
};

export default new Phaser.Game(config);
