import { CELL_SIZE, GAME_CONFIG } from "./config.js";

// สร้าง renderer สำหรับวาดเกมลงบน Canvas
// แยก renderer ออกจาก game state เพื่อให้ logic ทดสอบได้โดยไม่ต้องใช้ DOM หรือ Canvas
export function createRenderer({ canvas, scoreElement, statusElement }) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("canvas ต้องเป็น HTMLCanvasElement");
  }

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Browser นี้ไม่รองรับ Canvas 2D context");
  }

  // วาดพื้นหลังและเส้นตาราง
  function drawBoard() {
    context.fillStyle = "#06101c";
    context.fillRect(0, 0, GAME_CONFIG.canvasSize, GAME_CONFIG.canvasSize);

    context.strokeStyle = "rgba(255, 255, 255, 0.045)";
    context.lineWidth = 1;

    for (let index = 0; index <= GAME_CONFIG.gridSize; index += 1) {
      const position = index * CELL_SIZE;

      context.beginPath();
      context.moveTo(position, 0);
      context.lineTo(position, GAME_CONFIG.canvasSize);
      context.stroke();

      context.beginPath();
      context.moveTo(0, position);
      context.lineTo(GAME_CONFIG.canvasSize, position);
      context.stroke();
    }
  }

  // วาดอาหารเป็นวงกลมกลางช่อง
  function drawFood(food) {
    if (!food) {
      return;
    }

    const centerX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const centerY = food.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE * 0.32;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fillStyle = "#ff6b6b";
    context.fill();
  }

  // วาดงูทีละ segment โดยหัวใช้สีเด่นกว่าส่วนลำตัว
  function drawSnake(snake) {
    snake.forEach((segment, index) => {
      const inset = index === 0 ? 2 : 4;
      const size = CELL_SIZE - inset * 2;

      context.fillStyle = index === 0 ? "#8ef0a8" : "#36c56f";
      context.fillRect(
        segment.x * CELL_SIZE + inset,
        segment.y * CELL_SIZE + inset,
        size,
        size,
      );
    });
  }

  // วาด overlay เมื่อตัวเกมหยุด เพราะแพ้หรือชนะ
  function drawStatusOverlay(status) {
    if (status === "running") {
      return;
    }

    context.fillStyle = "rgba(3, 9, 20, 0.76)";
    context.fillRect(0, 0, GAME_CONFIG.canvasSize, GAME_CONFIG.canvasSize);

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#ffffff";
    context.font = "700 48px system-ui, sans-serif";

    const title = status === "won" ? "คุณชนะ!" : "Game Over";
    context.fillText(title, GAME_CONFIG.canvasSize / 2, GAME_CONFIG.canvasSize / 2 - 24);

    context.fillStyle = "#b7c9dc";
    context.font = "400 22px system-ui, sans-serif";
    context.fillText(
      "กด Space เพื่อเริ่มใหม่",
      GAME_CONFIG.canvasSize / 2,
      GAME_CONFIG.canvasSize / 2 + 34,
    );
  }

  // อัปเดตข้อความสถานะสำหรับผู้ใช้และ screen reader
  function updateInterface(state) {
    scoreElement.textContent = String(state.score);

    const messages = {
      running: "เกมกำลังดำเนินอยู่",
      "game-over": `เกมจบ คะแนน ${state.score}`,
      won: `คุณชนะ คะแนน ${state.score}`,
    };

    statusElement.textContent = messages[state.status] ?? "สถานะไม่ทราบค่า";
  }

  // ฟังก์ชันหลักสำหรับวาดหนึ่ง frame
  function render(state) {
    drawBoard();
    drawFood(state.food);
    drawSnake(state.snake);
    drawStatusOverlay(state.status);
    updateInterface(state);
  }

  return Object.freeze({ render });
}
