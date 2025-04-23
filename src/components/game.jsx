import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import BootScene from "../game/scenes/BootScene";
import MainScene from "../game/scenes/MainScene";
import BattleScene from "../game/scenes/BattleScene";

export default function Game() {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      scene: [BootScene, MainScene, BattleScene],
      backgroundColor: "#87ceeb",
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div
      ref={gameContainer}
      style={{ 
        width: '100%', 
        height: '100vh', 
        margin: '0 auto', 
        display: 'block' 
      }}
    />
  );
}
