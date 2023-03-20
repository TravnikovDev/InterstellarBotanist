import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private tilemap: Phaser.Tilemaps.Tilemap;

  private levelWidth = 50;
  private levelHeight = 50;
  private tileWidth = 256; // Replace with the width of your tiles
  private tileHeight = 256; // Replace with the height of your tiles

  private levelData = new Array(this.levelHeight)
    .fill(null)
    .map(() => new Array(this.levelWidth).fill(0));

  private tileProbabilities = {
    0: 0.4, // Grass
    1: 0.15, // Dirt
    2: 0.1, // Water
    3: 0.1, // Rock
    4: 0.1, // Sand
    5: 0.03, // Tree
    6: 0.02, // Bush
    7: 0.05, // Path
    8: 0.05, // Flower
  };

  private generateTerrain(
    levelData: number[][],
    tileProbabilities: { [index: number | string]: number }
  ): void {
    const tileTypes = Object.keys(tileProbabilities);

    for (let y = 0; y < levelData.length; y++) {
      for (let x = 0; x < levelData[y].length; x++) {
        const randomValue = Math.random();
        let cumulativeProbability = 0;

        for (const tileType of tileTypes) {
          cumulativeProbability += tileProbabilities[tileType];
          if (randomValue < cumulativeProbability) {
            levelData[y][x] = parseInt(tileType);
            break;
          }
        }
      }
    }
  }

  preload() {
    this.load.spritesheet("character", "assets/images/phaser_char.png", {
      frameWidth: 64, // Width of each frame in the sprite sheet
      frameHeight: 64, // Height of each frame in the sprite sheet
    });
    this.load.image("tileset", "assets/images/tileset-image.png");
  }

  private createTilemap(): void {
    // Create a blank tilemap with the given tile dimensions
    this.tilemap = this.make.tilemap({
      width: this.levelWidth,
      height: this.levelHeight,
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
    });

    // Add the tileset image to the tilemap
    const tileset = this.tilemap.addTilesetImage(
      "tileset",
      undefined,
      this.tileWidth,
      this.tileHeight
    );

    // Create a new tilemap layer using the tileset image
    const terrainLayer = this.tilemap.createBlankLayer("terrainLayer", tileset);

    // Adding tiles to the map
    terrainLayer.putTilesAt(this.levelData, 0, 0);

    // Add collision
    // this.tilemap.setCollision([2, 5]); // Assuming water tiles have an index of 2
    // this.physics.add.collider(this.player, terrainLayer);
  }

  create() {
    this.generateTerrain(this.levelData, this.tileProbabilities);
    this.createTilemap();

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels
    );
    this.player = this.physics.add
      .sprite(100, 100, "character")
      .setOrigin(0.5, 0.5);
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
