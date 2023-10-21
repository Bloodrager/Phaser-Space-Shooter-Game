class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image(
      "background",
      require("../../assets/sprites/game/Backgrounds/blue.png")
    );
    this.load.image(
      "meteor1",
      require("../../assets/sprites/game/Meteors/meteorBrown_big1.png")
    );
    this.load.image(
      "meteor2",
      require("../../assets/sprites/game/Meteors/meteorBrown_big3.png")
    );
    this.load.image(
      "meteor3",
      require("../../assets/sprites/game/Meteors/meteorBrown_med1.png")
    );
    this.load.image(
      "meteor4",
      require("../../assets/sprites/game/Meteors/meteorGrey_big2.png")
    );
    this.load.image(
      "meteor5",
      require("../../assets/sprites/game/Meteors/meteorGrey_big4.png")
    );
    this.load.image(
      "meteor6",
      require("../../assets/sprites/game/Meteors/meteorGrey_med1.png")
    );
    this.load.image(
      "star",
      require("../../assets/sprites/game/Power-ups/star_gold.png")
    );
    this.load.image(
      "player",
      require("../../assets/sprites/game/playerShip1_red.png")
    );
    this.load.image(
      "laser",
      require("../../assets/sprites/game/Lasers/laserBlue01.png")
    );
    this.load.image(
      "canon",
      require("../../assets/sprites/game/Lasers/laserRed01.png")
    );
    this.load.audio("audio_laser", [
      require("../../assets/sounds/sfx_laser1.ogg"),
      require("../../assets/sounds/sfx_laser1.mp3"),
    ]);
    this.load.audio("audio_lose", [
      require("../../assets/sounds/sfx_lose.ogg"),
      require("../../assets/sounds/sfx_lose.mp3"),
    ]);
    this.load.audio("audio_star", [
      require("../../assets/sounds/sfx_twoTone.ogg"),
      require("../../assets/sounds/sfx_twoTone.mp3"),
    ]);
    this.load.audio("audio_meteor", [
      require("../../assets/sounds/sfx_shieldDown.ogg"),
      require("../../assets/sounds/sfx_shieldDown.mp3"),
    ]);
    this.load.audio("music", [
      require("../../assets/music/background_loop.ogg"),
      require("../../assets/music/background_loop.mp3"),
    ]);
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}

export default Scene1;
