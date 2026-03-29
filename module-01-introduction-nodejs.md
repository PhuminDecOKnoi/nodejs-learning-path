# Module 1: Introduction to Node.js

## 1. What is Node.js
Node.js คือ runtime environment สำหรับรัน JavaScript นอก browser โดยใช้ V8 Engine ของ Google Chrome  
เหมาะสำหรับการพัฒนา Backend, API, CLI tools และระบบที่ต้องรองรับ I/O จำนวนมาก

คุณสมบัติหลัก:
- Event-driven architecture
- Non-blocking I/O
- Single-threaded แต่ scalable
- เหมาะกับ REST API และ real-time applications

---

## 2. Why use Node.js
ข้อดีของ Node.js
- ใช้ JavaScript ทั้ง frontend และ backend
- ประสิทธิภาพสูงสำหรับ I/O operations
- npm ecosystem ขนาดใหญ่
- เหมาะกับ Microservices และ API
- พัฒนาเร็ว

---

## 3. Node.js Architecture (Concept)
Browser JavaScript → V8 Engine  
Node.js → V8 + libuv + APIs  
Event Loop → จัดการ async operations

---

## 4. First Node.js Program

สร้างไฟล์ชื่อ

```
app.js
```

ตัวอย่าง code:

```javascript
console.log("Hello Node.js");
```

รันคำสั่ง:

```bash
node app.js
```

ผลลัพธ์:

```
Hello Node.js
```

---

## 5. Example: Basic Node.js Script

```javascript
const name = "Node Learning";

console.log("Welcome to", name);

const add = (a, b) => {
    return a + b;
};

console.log("Result:", add(5, 3));
```

Output:

```
Welcome to Node Learning
Result: 8
```

---

## 6. Example: Using Built-in Node Module

```javascript
const os = require("os");

console.log("Platform:", os.platform());
console.log("CPU:", os.cpus().length);
```

---

## 7. Key Concepts to Understand
- Runtime Environment
- Event Loop
- Non-blocking I/O
- Module System
- CLI Execution

---

## 8. Learning Checklist
- [ ] เข้าใจว่า Node.js คืออะไร
- [ ] ติดตั้ง Node.js ได้
- [ ] รันไฟล์ .js ได้
- [ ] ใช้ console.log ได้
- [ ] เข้าใจ basic script structure

---

## 9. Next Module
Module 2: Installing and Exploring Node.js
