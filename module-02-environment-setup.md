# Module 2: Environment Setup and First Script

## 1. Environment Setup
ก่อนเริ่มใช้งาน Node.js ต้องติดตั้งเครื่องมือหลัก:

- Node.js
- npm (ติดมากับ Node.js)
- Code Editor (แนะนำ VS Code)
- Terminal / Command Prompt

ตรวจสอบเวอร์ชัน

```bash
node -v
npm -v
```

หากแสดง version แสดงว่าพร้อมใช้งาน

---

## 2. Creating First Project

สร้างโฟลเดอร์โปรเจกต์

```bash
mkdir node-learning
cd node-learning
```

สร้างไฟล์

```bash
touch app.js
```

---

## 3. First Script

ไฟล์ app.js

```javascript
console.log("My First Node.js Script");
```

Run

```bash
node app.js
```

Output

```
My First Node.js Script
```

---

## 4. Using Variables

```javascript
const message = "Node.js Environment Ready";
console.log(message);
```

---

## 5. Using Arguments

```javascript
const name = process.argv[2];

console.log("Hello", name);
```

Run

```bash
node app.js Phumin
```

Output

```
Hello Phumin
```

---

## 6. Using Node REPL

เปิด REPL

```bash
node
```

ทดลอง

```javascript
2 + 3
```

Exit

```bash
.exit
```

---

## 7. Key Concepts

- Node runtime
- Terminal execution
- process.argv
- REPL
- Script execution

---

## 8. Learning Checklist

- [ ] ติดตั้ง Node.js ได้
- [ ] ตรวจสอบ version ได้
- [ ] สร้างไฟล์ .js ได้
- [ ] รัน script ได้
- [ ] ใช้ process.argv ได้
- [ ] ใช้ REPL ได้

---

## 9. Next Module

Module 3: Node.js Module System
