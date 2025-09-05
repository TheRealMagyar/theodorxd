"use client";
import Head from "next/head";
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import FilmEffect from "../components/FilmEffect";
import styles from "../home.module.css";

export default function ShitGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef(0);
  const isGameOverRef = useRef(false);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Game settings
    const gravity = 0.5;
    const jumpStrength = -10;
    const playerSize = 40;
    const obstacleWidth = 20;
    const obstacleHeight = 40;
    const obstacleSpeed = 4;
    const spawnInterval = 2000; // ms

    // Player (poop emoji)
    const player = {
      x: 50,
      y: canvas.height - playerSize,
      vy: 0,
      width: playerSize,
      height: playerSize,
    };

    // Obstacles
    const obstacles: { x: number; y: number; width: number; height: number }[] = [];
    let lastSpawn = 0;

    // Handle jump
    const jump = () => {
      if (player.y === canvas.height - playerSize && !isGameOverRef.current) {
        player.vy = jumpStrength;
      }
    };

    // Keyboard input
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        jump();
      }
      if (e.code === "Enter" && isGameOverRef.current) {
        resetGame();
      }
    };

    // Touch input for mobile
    const handleTouch = () => {
      if (!isGameOverRef.current) {
        jump();
      } else {
        resetGame();
      }
    };

    // Reset game
    const resetGame = () => {
      scoreRef.current = 0;
      isGameOverRef.current = false;
      obstacles.length = 0;
      player.y = canvas.height - playerSize;
      player.vy = 0;
      lastSpawn = 0;
    };

    // Game loop
    const gameLoop = (time: number) => {
      if (!ctx || isGameOverRef.current) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update player
      player.vy += gravity;
      player.y += player.vy;
      if (player.y > canvas.height - playerSize) {
        player.y = canvas.height - playerSize;
        player.vy = 0;
      }

      // Spawn obstacles
      if (time - lastSpawn > spawnInterval) {
        obstacles.push({
          x: canvas.width,
          y: canvas.height - obstacleHeight,
          width: obstacleWidth,
          height: obstacleHeight,
        });
        lastSpawn = time;
      }

      // Update obstacles
      obstacles.forEach((obstacle, index) => {
        obstacle.x -= obstacleSpeed;
        if (obstacle.x + obstacleWidth < 0) {
          obstacles.splice(index, 1);
          scoreRef.current += 10;
        }
      });

      // Collision detection
      obstacles.forEach((obstacle) => {
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y
        ) {
          isGameOverRef.current = true;
        }
      });

      // Draw player (poop emoji)
      ctx.font = `${playerSize}px Arial`;
      ctx.fillText("💩", player.x, player.y + playerSize);

      // Draw obstacles (scam coins)
      ctx.fillStyle = "#FFD700"; // Gold for coins
      obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw score
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);

      // Draw game over
      if (isGameOverRef.current) {
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText(
          "Press Enter or Tap to Restart",
          canvas.width / 2,
          canvas.height / 2 + 40
        );
      }

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    // Start game
    requestRef.current = requestAnimationFrame(gameLoop);

    // Event listeners
    window.addEventListener("keydown", handleKeyPress);
    canvas.addEventListener("touchstart", handleTouch);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      canvas.removeEventListener("touchstart", handleTouch);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Odor | $ODOR</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <FilmEffect />

      <div className={styles.fade} aria-hidden="true"></div>

      <Navbar />

      <main className={styles.wrap_xd}>
        <section className={`${styles.panel} ${styles.shitGame}`}>
          <div className={`${styles.center}`}>
            <h1>$ODOR Shit Run</h1>
            <p>Dodge the scam coins as the mighty 💩! Spacebar or tap to jump.</p>
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className={styles.gameCanvas}
            />
          </div>
        </section>
      </main>
    </>
  );
}