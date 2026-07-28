import { DIRECTIONS, GAME_CONFIG } from "./config.js";
import { isOppositeDirection } from "./input.js";

// สร้างตำแหน่งอาหารแบบสุ่ม โดยต้องไม่ทับกับลำตัวงู
export function createFoodPosition(snake, random = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const availableCells = [];

  // สร้างรายการช่องว่างทั้งหมดบนกระดาน
  for (let y = 0; y < GAME_CONFIG.gridSize; y += 1) {
    for (let x = 0; x < GAME_CONFIG.gridSize; x += 1) {
      const key = `${x},${y}`;

      if (!occupied.has(key)) {
        availableCells.push({ x, y });
      }
    }
  }

  // กรณีงูเต็มทั้งกระดาน ถือว่าผู้เล่นชนะและไม่มีตำแหน่งอาหารใหม่
  if (availableCells.length === 0) {
    return null;
  }

  // จำกัด index ให้อยู่ภายในช่วง แม้ random function ที่ใช้ทดสอบคืนค่าใกล้ 1 มาก
  const index = Math.min(
    Math.floor(random() * availableCells.length),
    availableCells.length - 1,
  );

  return availableCells[index];
}

// สร้างสถานะเริ่มต้นของเกม
export function createInitialState(random = Math.random) {
  const center = Math.floor(GAME_CONFIG.gridSize / 2);
  const snake = [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
  ];

  return {
    snake,
    food: createFoodPosition(snake, random),
    direction: { ...DIRECTIONS.right },
    pendingDirection: { ...DIRECTIONS.right },
    score: 0,
    status: "running",
  };
}

// รับทิศทางใหม่จาก input และเก็บเป็น pendingDirection
// จะยังไม่เคลื่อนที่ทันที จนกว่า game tick ถัดไปจะทำงาน
export function queueDirection(state, nextDirection) {
  if (state.status !== "running") {
    return state;
  }

  // เปรียบเทียบกับ direction ล่าสุดที่รอใช้งาน ไม่ใช่เพียง direction เดิม
  // ช่วยป้องกันการกดหลายปุ่มเร็วมากแล้วทำให้งูย้อนกลับภายใน tick เดียว
  if (isOppositeDirection(state.pendingDirection, nextDirection)) {
    return state;
  }

  return {
    ...state,
    pendingDirection: { ...nextDirection },
  };
}

// ตรวจว่าตำแหน่งหนึ่งอยู่นอกขอบกระดานหรือไม่
export function isWallCollision(position) {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= GAME_CONFIG.gridSize ||
    position.y >= GAME_CONFIG.gridSize
  );
}

// ตรวจว่าหัวงูชนกับ segment ใดในลำตัวหรือไม่
export function isSelfCollision(head, body) {
  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}

// อัปเดต game state หนึ่งรอบแบบ deterministic
// ฟังก์ชันรับ state เดิมและคืน state ใหม่โดยไม่แก้ object เดิมโดยตรง
export function updateGameState(state, random = Math.random) {
  if (state.status !== "running") {
    return state;
  }

  const direction = state.pendingDirection;
  const currentHead = state.snake[0];

  // คำนวณตำแหน่งหัวงูถัดไปจากทิศทางที่กำลังใช้
  const nextHead = {
    x: currentHead.x + direction.x,
    y: currentHead.y + direction.y,
  };

  // ตรวจว่าหัวใหม่ตรงกับอาหารหรือไม่
  const ateFood =
    state.food !== null &&
    nextHead.x === state.food.x &&
    nextHead.y === state.food.y;

  // ถ้าไม่ได้กินอาหาร หางจะถูกตัดออกใน tick นี้
  // ดังนั้นการตรวจชนตัวเองไม่ควรรวมหางเดิม เพราะหัวสามารถเข้าไปแทนช่องนั้นได้อย่างถูกต้อง
  const collisionBody = ateFood ? state.snake : state.snake.slice(0, -1);

  if (isWallCollision(nextHead) || isSelfCollision(nextHead, collisionBody)) {
    return {
      ...state,
      direction: { ...direction },
      status: "game-over",
    };
  }

  // สร้าง array ใหม่โดยเพิ่มหัวไว้ด้านหน้า
  const nextSnake = [nextHead, ...state.snake];

  if (!ateFood) {
    // ไม่ได้กินอาหารจึงตัดส่วนหางหนึ่งช่อง เพื่อรักษาความยาวเดิม
    nextSnake.pop();
  }

  const nextScore = ateFood
    ? state.score + GAME_CONFIG.pointsPerFood
    : state.score;

  const nextFood = ateFood
    ? createFoodPosition(nextSnake, random)
    : state.food;

  return {
    ...state,
    snake: nextSnake,
    food: nextFood,
    direction: { ...direction },
    pendingDirection: { ...direction },
    score: nextScore,
    // ถ้าไม่มีช่องว่างเหลือ แสดงว่าผู้เล่นเติมเต็มกระดานและชนะเกม
    status: nextFood === null ? "won" : "running",
  };
}
