import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  private player: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    this.load.image("background", "assets/images/background.png");
    this.load.spritesheet("character", "assets/images/phaser_char.png", {
      frameWidth: 64, // Width of each frame in the sprite sheet
      frameHeight: 64, // Height of each frame in the sprite sheet
    });
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    this.player = this.add.sprite(10, 10, "character").setOrigin(0.5, 0.5);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("character", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(time: number, delta: number) {
    const speed = 200;

    if (this.cursors.left.isDown) {
      this.player.x -= (speed * delta) / 1000;
      this.player.anims.play("walk-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.x += (speed * delta) / 1000;
      this.player.anims.play("walk-right", true);
    }

    if (this.cursors.up.isDown) {
      this.player.y -= (speed * delta) / 1000;
      this.player.anims.play("walk-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.y += (speed * delta) / 1000;
      this.player.anims.play("walk-down", true);
    }
  }
}
