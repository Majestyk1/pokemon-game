import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

// A minimal “Scene” to initialize Phaser
class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }
  preload() {
    // here’s where you’d load assets later
    this.load.tilemapTiledJSON("map", "assets/map.json");
    this.load.image("tiles", "assets/tileset.png");
    this.load.image("player", "assets/player.png"),
      {
        frameWidth: 32,
        frameHeight: 32,
      };
  }
  create() {
    // switch to main scene once booted (we’ll add MainScene soon)
    this.scene.start("MainScene");
  }
}

// A placeholder main scene
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }
  create() {
    // draw a simple rectangle so we know it’s working
    this.add.rectangle(400, 300, 200, 100, 0x00ff00);
  }
}

export default function Game() {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current, // mount point
      scene: [BootScene, MainScene],
      backgroundColor: "#87ceeb", // sky‐blue background
    };

    const game = new Phaser.Game(config);

    // clean up on unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div
      ref={gameContainer}
      style={{ width: 800, height: 600, margin: "0 auto", display: "block" }}
    />
  );
}
