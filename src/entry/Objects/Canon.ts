class Canon extends Phaser.GameObjects.Sprite {
    constructor(scene: any, x: any, y: any) {
     //   const x = scene.player.x;
      //  const y = scene.player.y - 60;

        super(scene, x, y, "canon");

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -1000;
        scene.projectiles.add(this);
    }

    update() {
        if (this.y < 10) {
            this.destroy();
        }
    }
}

export default Canon;
