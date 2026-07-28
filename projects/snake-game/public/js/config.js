// รวมค่าคงที่ของเกมไว้ในไฟล์เดียว เพื่อหลีกเลี่ยง magic numbers กระจายทั่วโปรเจกต์
// การแยก configuration ออกจาก logic ทำให้ปรับสมดุลเกมและทดสอบได้ง่ายขึ้น
export const GAME_CONFIG = Object.freeze({
  // จำนวนช่องของกระดานในแนวนอนและแนวตั้ง
  gridSize: 20,

  // ขนาด Canvas จริงเป็นพิกเซล
  canvasSize: 600,

  // ระยะเวลาระหว่างการอัปเดตสถานะเกมแต่ละครั้ง หน่วยเป็นมิลลิวินาที
  // ค่าน้อยลงจะทำให้งูเคลื่อนที่เร็วขึ้น
  tickIntervalMs: 120,

  // จำนวนแต้มที่ได้รับเมื่อกินอาหารหนึ่งชิ้น
  pointsPerFood: 10,
});

// คำนวณขนาดของหนึ่งช่องจากขนาด Canvas หารด้วยจำนวนช่อง
// ตัวอย่าง: 600 / 20 = ช่องละ 30 พิกเซล
export const CELL_SIZE = GAME_CONFIG.canvasSize / GAME_CONFIG.gridSize;

// เก็บเวกเตอร์ของแต่ละทิศทางไว้เป็น object ที่ไม่อนุญาตให้แก้ไข
// x คือแนวนอน และ y คือแนวตั้ง
export const DIRECTIONS = Object.freeze({
  up: Object.freeze({ x: 0, y: -1 }),
  down: Object.freeze({ x: 0, y: 1 }),
  left: Object.freeze({ x: -1, y: 0 }),
  right: Object.freeze({ x: 1, y: 0 }),
});

// Mapping ระหว่างปุ่มคีย์บอร์ดกับชื่อทิศทางภายในระบบ
// รองรับทั้ง Arrow Keys และ W A S D
export const KEY_TO_DIRECTION = Object.freeze({
  ArrowUp: "up",
  w: "up",
  W: "up",
  ArrowDown: "down",
  s: "down",
  S: "down",
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
});
