import { GAME_CONFIG } from "./config.js";
import { createInitialState, queueDirection, updateGameState } from "./game-state.js";
import { createInputController } from "./input.js";
import { createRenderer } from "./renderer.js";

// ค้นหา DOM elements ที่จำเป็นต่อการเริ่มเกม
const canvas = document.querySelector("#game-canvas");
const scoreElement = document.querySelector("#score-value");
const statusElement = document.querySelector("#status-message");

// ตรวจ dependency ของหน้าเว็บตั้งแต่ต้น เพื่อให้ error ชัดเจนหาก HTML ถูกแก้ผิด
if (!canvas || !scoreElement || !statusElement) {
  throw new Error("ไม่พบ DOM element ที่จำเป็นสำหรับเริ่ม Snake Game");
}

// สร้าง renderer หนึ่งครั้งและใช้ซ้ำทุก frame
const renderer = createRenderer({ canvas, scoreElement, statusElement });

// state เป็นแหล่งข้อมูลจริงเพียงแห่งเดียวของเกม
let state = createInitialState();

// เก็บเวลาของ frame ก่อนหน้า เพื่อคำนวณ elapsed time
let previousFrameTime = performance.now();

// accumulator ใช้สะสมเวลาจนถึงรอบ update logic ถัดไป
// แนวทาง fixed timestep ทำให้ความเร็วเกมไม่ขึ้นกับ refresh rate ของหน้าจอ
let accumulatedTime = 0;

// ป้องกันการอัปเดตเกมจำนวนมากเกินไปหลัง browser tab ถูกพักไว้นาน
const maximumAccumulatedTime = GAME_CONFIG.tickIntervalMs * 5;

function restartGame() {
  // อนุญาตให้เริ่มใหม่เมื่อเกมจบหรือชนะแล้วเท่านั้น
  if (state.status === "running") {
    return;
  }

  state = createInitialState();
  accumulatedTime = 0;
  renderer.render(state);
}

// สร้าง input controller และส่ง callback ที่เปลี่ยน state ผ่าน pure transition function
const destroyInputController = createInputController({
  onDirection(nextDirection) {
    state = queueDirection(state, nextDirection);
  },
  onRestart: restartGame,
});

function gameLoop(currentFrameTime) {
  // คำนวณระยะเวลาที่ผ่านไปจาก frame ก่อนหน้า
  const elapsedTime = currentFrameTime - previousFrameTime;
  previousFrameTime = currentFrameTime;

  // จำกัดเวลาสะสม ป้องกัน spiral of death เมื่อ frame ค้างหรือ tab กลับมาทำงาน
  accumulatedTime = Math.min(
    accumulatedTime + elapsedTime,
    maximumAccumulatedTime,
  );

  // อัปเดต logic ตาม fixed interval อาจทำหลายครั้งในหนึ่ง frame หากจำเป็น
  while (
    accumulatedTime >= GAME_CONFIG.tickIntervalMs &&
    state.status === "running"
  ) {
    state = updateGameState(state);
    accumulatedTime -= GAME_CONFIG.tickIntervalMs;
  }

  // Rendering ทำทุก animation frame เพื่อให้ UI ลื่นไหลและตอบสนองดี
  renderer.render(state);

  // ขอให้ browser เรียก gameLoop อีกครั้งใน frame ถัดไป
  requestAnimationFrame(gameLoop);
}

// วาดสถานะเริ่มต้นก่อนเริ่ม animation loop
renderer.render(state);
requestAnimationFrame(gameLoop);

// ถอด event listeners เมื่อหน้าเว็บกำลังถูกปิด
// แม้ browser จะจัดการให้ได้ แต่แสดง pattern ที่เหมาะสำหรับ component lifecycle
window.addEventListener(
  "pagehide",
  () => {
    destroyInputController();
  },
  { once: true },
);
