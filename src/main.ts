import Phaser from "phaser";
import { GameScene } from "./GameScene";

// Get the current window width and height
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  backgroundColor: "#ababab",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);

// Function to handle window resizing
function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  game.scale.resize(newWidth, newHeight);
}

// Add a resize event listener to the window
window.addEventListener("resize", onWindowResize);
