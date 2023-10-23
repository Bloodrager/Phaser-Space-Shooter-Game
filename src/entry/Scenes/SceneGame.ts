import Laser from "../Objects/laser";
import Canon from "../Objects/canon";

class SceneGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  private playerSpeed = 700;
  private score = 0;
  private starsCount = 0;
  private scoreFormated = "";
  private background!: Phaser.GameObjects.TileSprite;
  private laserSound!: Phaser.Sound.BaseSound;
  private loseSound!: Phaser.Sound.BaseSound;
  private starSound!: Phaser.Sound.BaseSound;
  private meteorSound!: Phaser.Sound.BaseSound;
  private music!: Phaser.Sound.BaseSound;
  private meteor1!: Phaser.GameObjects.Image;
  private meteor2!: Phaser.GameObjects.Image;
  private meteor3!: Phaser.GameObjects.Image;
  private meteor4!: Phaser.GameObjects.Image;
  private meteor5!: Phaser.GameObjects.Image;
  private meteor6!: Phaser.GameObjects.Image;
  private meteors!: Phaser.GameObjects.Group;
  private stars!: Phaser.GameObjects.Group;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spacebar!: Phaser.Input.Keyboard.Key;
  private altbar!: Phaser.Input.Keyboard.Key;
  private laser!: Phaser.Physics.Arcade.Sprite;
  private projectiles!: Phaser.GameObjects.Group;
  private scoreLabel!: Phaser.GameObjects.Text;

  create() {
    this.background = this.add.tileSprite(0, 0, 1920, 1080, "background");
    this.background.setOrigin(0, 0);

    this.laserSound = this.sound.add("audio_laser");
    this.loseSound = this.sound.add("audio_lose");
    this.starSound = this.sound.add("audio_star");
    this.meteorSound = this.sound.add("audio_meteor");
    this.music = this.sound.add("music");
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.music.play(musicConfig);

    this.meteor1 = this.add.image(250, 450, "meteor1");
    this.meteor2 = this.add.image(700, 300, "meteor2");
    this.meteor3 = this.add.image(1350, 200, "meteor3");
    this.meteor4 = this.add.image(450, 180, "meteor4");
    this.meteor5 = this.add.image(950, 230, "meteor5");
    this.meteor6 = this.add.image(1600, 400, "meteor6");

    this.meteors = this.physics.add.group();
    this.meteors.add(this.meteor1);
    this.meteors.add(this.meteor2);
    this.meteors.add(this.meteor3);
    this.meteors.add(this.meteor4);
    this.meteors.add(this.meteor5);
    this.meteors.add(this.meteor6);

    this.meteor1.setInteractive();
    this.meteor2.setInteractive();
    this.meteor3.setInteractive();
    this.meteor4.setInteractive();
    this.meteor5.setInteractive();
    this.meteor6.setInteractive();

    this.input.on("gameobjectdown", this.destroyMeteor, this);

    this.stars = this.physics.add.group();
    let maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
      let star = this.physics.add.sprite(16, 16, "star");
      this.stars.add(star);
      star.setRandomPosition(0, 0, 1920, 1080);
      star.setVelocity(100, 100);
      star.setCollideWorldBounds(true);
      star.setBounce(1);
      this.starsCount++;
    }

    this.player = this.physics.add.sprite(960, 1000, "player");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.altbar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ALT
    );

    this.projectiles = this.add.group();
    this.physics.add.collider(
      this.projectiles,
      this.stars,
      function (projectile, star) {
        projectile.destroy();
      }
    );
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.pickStar,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.meteors,
      this.damagePlayer,
      null,
      this
    );
    this.physics.add.overlap(
      this.projectiles,
      this.meteors,
      this.damageMeteor,
      null,
      this
    );
    this.scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.text(60, 30, "SCORE", {
      fontFamily: "font1",
      fontSize: "36px",
    });
    this.scoreLabel.text = "SCORE " + this.scoreFormated;
  }

  spawnStar() {
    let star = this.physics.add.sprite(16, 16, "star");
    this.stars.add(star);
    star.setRandomPosition(0, 0, 1920, 1080);
    star.setVelocity(100, 100);
    star.setCollideWorldBounds(true);
    star.setBounce(1);
    this.starsCount++;
  }

  pickStar(player: any, star: any) {
    star.disableBody(true, true);
    this.score += 50;
    this.scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + this.scoreFormated;
    this.starSound.play();
    this.starsCount -= 1;
  }

  damagePlayer(player: any, meteor: any) {
    this.resetMeteorPos(meteor);
    if (this.player.alpha < 1) {
      return;
    }

    player.x = 960;
    player.y = 1000;
    player.disableBody(true, true);
    this.loseSound.play();

    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  }

  damageMeteor(projectile: any, meteor: any) {
    projectile.destroy();
    this.resetMeteorPos(meteor);
    this.score += 20;
    this.scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + this.scoreFormated;
    this.meteorSound.play();
  }

  moveMeteor(meteor: any, speed: number) {
    meteor.y += speed;
    if (meteor.y > 1200) {
      this.resetMeteorPos(meteor);
    }
  }

  resetPlayer() {
    var x = 960;
    var y = 1080;
    this.player.enableBody(true, x, y, true, true);
    this.player.alpha = 0.5;
    this.score = 0;
    this.scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + this.scoreFormated;

    var tween = this.tweens.add({
      targets: this.player,
      y: 1000,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        this.player.alpha = 1;
      },
      callbackScope: this,
    });
  }

  resetMeteorPos(meteor: any) {
    meteor.y = -100;
    var randomX = Phaser.Math.Between(150, 1830);
    meteor.x = randomX;
  }

  destroyMeteor(pointer: any, gameObject: any) {
    gameObject.destroy();
  }

  update(time: number, delta: number): void {
    this.moveMeteor(this.meteor1, 2.4);
    this.moveMeteor(this.meteor2, 2.3);
    this.moveMeteor(this.meteor3, 3.2);
    this.moveMeteor(this.meteor4, 2.1);
    this.moveMeteor(this.meteor5, 2.2);
    this.moveMeteor(this.meteor6, 3.3);

    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();
    if (this.starsCount < 5) {
      this.spawnStar();
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.shootLaser();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.altbar)) {
      if (this.player.active) {
        this.shootCanon();
      }
    }
  }

  movePlayerManager() {
    this.player.setVelocity(0);

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    }
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    }
  }

  shootLaser() {
    var laser = new Laser(this);
    this.laserSound.play();
  }

  shootCanon() {
    var canon = new Canon(this);
    this.laserSound.play();
  }

  zeroPad(number: number, size: number) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
}

export default SceneGame;
