import { DIRECTIONS, KEY_TO_DIRECTION } from "./config.js";

// ตรวจว่าทิศทางใหม่เป็นทิศตรงข้ามกับทิศปัจจุบันหรือไม่
// เกมงูทั่วไปไม่อนุญาตให้กลับหลังทันที เพราะหัวงูจะชนลำตัวของตนเอง
export function isOppositeDirection(currentDirection, nextDirection) {
  return (
    currentDirection.x + nextDirection.x === 0 &&
    currentDirection.y + nextDirection.y === 0
  );
}

// สร้างตัวจัดการ input แบบแยกจาก game state
// callback onDirection จะถูกเรียกเมื่อผู้เล่นเลือกทิศทางที่ถูกต้อง
export function createInputController({ onDirection, onRestart }) {
  if (typeof onDirection !== "function") {
    throw new TypeError("onDirection ต้องเป็นฟังก์ชัน");
  }

  // แปลงชื่อทิศทาง เช่น "left" เป็นเวกเตอร์ { x, y }
  function emitDirection(directionName) {
    const direction = DIRECTIONS[directionName];

    if (direction) {
      // ส่ง object ใหม่แทนการส่ง reference ตรง ๆ
      // เพื่อป้องกันผู้เรียกแก้ไขค่าคงที่ของระบบโดยไม่ตั้งใจ
      onDirection({ ...direction });
    }
  }

  // รับคำสั่งจากคีย์บอร์ด
  function handleKeyboard(event) {
    const directionName = KEY_TO_DIRECTION[event.key];

    if (directionName) {
      // ป้องกัน browser เลื่อนหน้าเมื่อกดปุ่มลูกศร
      event.preventDefault();
      emitDirection(directionName);
      return;
    }

    // Space ใช้เริ่มเกมใหม่หลังเกมจบ
    if (event.code === "Space" && typeof onRestart === "function") {
      event.preventDefault();
      onRestart();
    }
  }

  // รองรับปุ่มควบคุมบนมือถือหรือแท็บเล็ตผ่าน data-direction
  function handleControlButton(event) {
    const button = event.target.closest("[data-direction]");

    if (!button) {
      return;
    }

    emitDirection(button.dataset.direction);
  }

  // ผูก event listeners เมื่อเริ่มเกม
  window.addEventListener("keydown", handleKeyboard);

  const controlsElement = document.querySelector(".controls");
  controlsElement?.addEventListener("click", handleControlButton);

  // คืน cleanup function เพื่อให้สามารถถอด listener ได้อย่างเป็นระบบ
  // รูปแบบนี้สำคัญเมื่อระบบมีการ mount/unmount UI หลายครั้ง
  return function destroyInputController() {
    window.removeEventListener("keydown", handleKeyboard);
    controlsElement?.removeEventListener("click", handleControlButton);
  };
}
