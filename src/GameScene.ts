import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private tilemap: Phaser.Tilemaps.Tilemap;

  preload() {
    this.load.spritesheet("character", "assets/images/phaser_char.png", {
      frameWidth: 64, // Width of each frame in the sprite sheet
      frameHeight: 64, // Height of each frame in the sprite sheet
    });
    this.load.image("tileset", "assets/images/tileset-image.png");
  }

  private createTilemap(): void {
    const tileWidth = 256; // Replace with the width of your tiles
    const tileHeight = 256; // Replace with the height of your tiles

    // Create a blank tilemap with the given tile dimensions
    this.tilemap = this.make.tilemap({
      tileWidth: tileWidth,
      tileHeight: tileHeight,
      width: 100, // Set the desired width of the tilemap (in tiles)
      height: 100, // Set the desired height of the tilemap (in tiles)
    });

    // Add the tileset image to the tilemap
    const tilesetImage = this.tilemap.addTilesetImage(
      "tileset",
      undefined,
      tileWidth,
      tileHeight
    );

    // Create a new tilemap layer using the tileset image
    const layer = this.tilemap.createBlankLayer("background", tilesetImage);

    // Fill the tilemap layer with tiles using the tile indices from your tileset
    layer.fill(0, 0, 0, 100, 100); // Fill with grass tiles (assuming grass is the first tile in your tileset)

    const tileIndices = [0, 1, 3]; // Grass, dirt, and rock tile indices
    layer.randomize(0, 0, 20, 20, tileIndices);
  }

  create() {
    this.createTilemap();
    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels
    );
    this.player = this.physics.add.sprite(100, 100, "character").setOrigin(0.5, 0.5);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

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

    // Set up the camera to follow the player
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels
    );
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
