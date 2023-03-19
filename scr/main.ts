import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

function preload(this: Phaser.Scene) {
  this.load.image("logo", "assets/phaser-logo.png");
}

function create(this: Phaser.Scene) {
  const logo = this.add.image(400, 300, "logo");
}
