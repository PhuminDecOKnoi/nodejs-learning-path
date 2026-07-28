import test from "node:test";
import assert from "node:assert/strict";

import { DIRECTIONS, GAME_CONFIG } from "../public/js/config.js";
import {
  createFoodPosition,
  createInitialState,
  isSelfCollision,
  isWallCollision,
  queueDirection,
  updateGameState,
} from "../public/js/game-state.js";

// ทดสอบว่าสถานะเริ่มต้นมีโครงสร้างสำคัญครบถ้วน
test("createInitialState creates a running game", () => {
  const state = createInitialState(() => 0);

  assert.equal(state.status, "running");
  assert.equal(state.score, 0);
  assert.equal(state.snake.length, 3);
  assert.deepEqual(state.direction, DIRECTIONS.right);
  assert.ok(state.food);
});

// ทดสอบว่าการเลือกทิศตรงข้ามทันทีจะถูกปฏิเสธ
test("queueDirection rejects an immediate opposite direction", () => {
  const state = createInitialState(() => 0);
  const nextState = queueDirection(state, DIRECTIONS.left);

  assert.deepEqual(nextState.pendingDirection, DIRECTIONS.right);
});

// ทดสอบว่าทิศที่ตั้งฉากกับทิศปัจจุบันได้รับอนุญาต
test("queueDirection accepts a valid turn", () => {
  const state = createInitialState(() => 0);
  const nextState = queueDirection(state, DIRECTIONS.up);

  assert.deepEqual(nextState.pendingDirection, DIRECTIONS.up);
});

// ทดสอบการเคลื่อนที่ปกติหนึ่งช่อง โดยความยาวงูต้องคงเดิม
test("updateGameState moves the snake one cell", () => {
  const state = {
    snake: [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ],
    food: { x: 10, y: 10 },
    direction: { ...DIRECTIONS.right },
    pendingDirection: { ...DIRECTIONS.right },
    score: 0,
    status: "running",
  };

  const nextState = updateGameState(state, () => 0);

  assert.deepEqual(nextState.snake[0], { x: 6, y: 5 });
  assert.equal(nextState.snake.length, 3);
  assert.equal(nextState.score, 0);
});

// ทดสอบการกินอาหาร: งูต้องยาวขึ้น คะแนนเพิ่ม และอาหารย้ายตำแหน่ง
test("updateGameState grows the snake after eating food", () => {
  const state = {
    snake: [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ],
    food: { x: 6, y: 5 },
    direction: { ...DIRECTIONS.right },
    pendingDirection: { ...DIRECTIONS.right },
    score: 0,
    status: "running",
  };

  const nextState = updateGameState(state, () => 0);

  assert.equal(nextState.snake.length, 4);
  assert.equal(nextState.score, GAME_CONFIG.pointsPerFood);
  assert.notDeepEqual(nextState.food, { x: 6, y: 5 });
});

// ทดสอบการชนขอบกระดาน
test("isWallCollision detects positions outside the board", () => {
  assert.equal(isWallCollision({ x: -1, y: 0 }), true);
  assert.equal(isWallCollision({ x: 0, y: -1 }), true);
  assert.equal(isWallCollision({ x: GAME_CONFIG.gridSize, y: 0 }), true);
  assert.equal(isWallCollision({ x: 0, y: GAME_CONFIG.gridSize }), true);
  assert.equal(isWallCollision({ x: 0, y: 0 }), false);
});

// ทดสอบการชนตัวเองจากตำแหน่งหัวและลำตัว
test("isSelfCollision detects matching body coordinates", () => {
  const body = [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ];

  assert.equal(isSelfCollision({ x: 2, y: 2 }, body), true);
  assert.equal(isSelfCollision({ x: 4, y: 2 }, body), false);
});

// ทดสอบว่าอาหารที่สุ่มได้ไม่ทับกับงู
test("createFoodPosition never places food on the snake", () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ];

  const food = createFoodPosition(snake, () => 0);

  assert.notDeepEqual(food, { x: 0, y: 0 });
  assert.notDeepEqual(food, { x: 1, y: 0 });
});
