# Snake Game with Node.js

> โปรเจกต์ตัวอย่างสำหรับประยุกต์ความรู้จากหลักสูตร Node.js Learning Path โดยแยกงานเป็นขั้นตอนแบบโปรแกรมเมอร์มืออาชีพ

## เป้าหมายการเรียนรู้

เมื่อทำโปรเจกต์นี้จบ ผู้เรียนจะสามารถ:

- แยกหน้าที่ระหว่าง Node.js server และ browser game client ได้
- จัดโครงสร้างโปรเจกต์แบบ modular และ ESM-first
- ใช้ Express 5 ให้บริการ static files และ health endpoint
- สร้าง game loop, game state, collision detection และ scoring
- ใช้ Canvas API วาดเกมแบบ 2D
- เขียนโค้ดที่อ่านง่าย ทดสอบได้ และมีคำอธิบายภาษาไทย

## สถาปัตยกรรม

```text
Browser
├── index.html
├── styles.css
└── JavaScript modules
    ├── config.js
    ├── input.js
    ├── game-state.js
    ├── renderer.js
    └── main.js

Node.js
└── server.js
    ├── Express 5 static server
    ├── /api/health
    └── graceful shutdown
```

## โครงสร้างไฟล์

```text
projects/snake-game/
├── README.md
├── package.json
├── src/
│   └── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── config.js
│       ├── input.js
│       ├── game-state.js
│       ├── renderer.js
│       └── main.js
└── test/
    └── game-state.test.js
```

## ขั้นตอนการพัฒนา

### Step 1 — เตรียม Runtime

```bash
cd projects/snake-game
npm install
npm run dev
```

เปิดเว็บ:

```text
http://localhost:3000
```

### Step 2 — สร้าง Server

ไฟล์ `src/server.js` ใช้ Express 5 ให้บริการ static files และ health endpoint

### Step 3 — กำหนด Configuration

ไฟล์ `public/js/config.js` รวมค่าคงที่ เช่น ขนาดตาราง ความเร็ว และสีเชิงตรรกะ

### Step 4 — จัดการ Input

ไฟล์ `public/js/input.js` แปลงปุ่มลูกศร/WASD เป็นทิศทาง พร้อมป้องกันการย้อนกลับชนตัวเองทันที

### Step 5 — สร้าง Game State

ไฟล์ `public/js/game-state.js` ดูแล:

- ตำแหน่งงู
- ตำแหน่งอาหาร
- คะแนน
- การชนกำแพง
- การชนตัวเอง
- การรีเซ็ตเกม

### Step 6 — วาดภาพด้วย Canvas

ไฟล์ `public/js/renderer.js` รับผิดชอบการวาดพื้นหลัง งู อาหาร คะแนน และข้อความจบเกม

### Step 7 — เชื่อม Game Loop

ไฟล์ `public/js/main.js` ใช้ `requestAnimationFrame()` ร่วมกับ fixed update interval เพื่อให้ logic คงที่และ rendering ลื่นไหล

### Step 8 — ทดสอบ Logic

ไฟล์ `test/game-state.test.js` ใช้ built-in `node:test` ทดสอบการเคลื่อนที่ การกินอาหาร และการชน

## คำสั่งสำคัญ

```bash
npm run dev     # รันแบบ watch mode
npm start       # รัน production mode
npm test        # รันทดสอบ game logic
npm run check   # ตรวจ syntax
```

## หลักการออกแบบ

- Server ไม่รับผิดชอบ rendering
- Game state แยกจาก renderer เพื่อให้ทดสอบง่าย
- ใช้ pure functions กับ logic สำคัญเมื่อเหมาะสม
- จำกัด side effects ให้อยู่ใน input, renderer และ bootstrap
- ใช้ค่าคงที่จากไฟล์เดียว ลด magic numbers
- รองรับการต่อยอดเป็น leaderboard, multiplayer หรือ authoritative server

## แบบฝึกหัดต่อยอด

1. เพิ่มระดับความเร็วตามคะแนน
2. เพิ่มระบบ pause/resume
3. เพิ่ม high score ด้วย `localStorage`
4. เพิ่ม API บันทึกคะแนนผ่าน Node.js
5. เพิ่ม Socket.IO สำหรับโหมดแข่งขันหลายผู้เล่น
6. เพิ่มฐานข้อมูลสำหรับ leaderboard

## บทเรียนที่เกี่ยวข้อง

- Module 3 — ESM and npm
- Module 6 — Asynchronous Programming
- Module 8 — Express 5
- Module 10 — REST API
- Module 14 — Testing
- Module 15 — Project Structure
- Module 24 — Web APIs
- Module 27 — Event Loop
- Module 30 — Memory Management
