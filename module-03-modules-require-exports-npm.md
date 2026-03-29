# Module 3: Modules, require, exports, npm

## 1. What are Modules?
ใน Node.js, **module** คือหน่วยของโค้ดที่แยกออกเป็นไฟล์หรือแพ็กเกจ เพื่อให้โค้ดเป็นระเบียบ นำกลับมาใช้ซ้ำได้ และดูแลง่าย

Node.js รองรับ 3 กลุ่มหลัก:
- **Built-in modules** เช่น `fs`, `path`, `os`, `http`
- **Custom modules** คือไฟล์ `.js` ที่เราสร้างเอง
- **Third-party modules** คือแพ็กเกจที่ติดตั้งผ่าน `npm`

---

## 2. Using `require()`
`require()` ใช้สำหรับโหลด module เข้ามาใช้งาน

### Example: Built-in Module
```javascript
const os = require("os");

console.log("Platform:", os.platform());
console.log("Home Directory:", os.homedir());
```

### Output Example
```text
Platform: darwin
Home Directory: /Users/yourname
```

---

## 3. Custom Modules with `module.exports`
เราสามารถแยก logic ไปไว้ในอีกไฟล์หนึ่ง แล้ว export ออกมาใช้งานได้

### File: `math.js`
```javascript
const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

module.exports = {
    add,
    subtract
};
```

### File: `app.js`
```javascript
const math = require("./math");

console.log("Add:", math.add(10, 5));
console.log("Subtract:", math.subtract(10, 5));
```

### Output
```text
Add: 15
Subtract: 5
```

---

## 4. Export Single Function
ถ้าต้องการ export แค่ function เดียว สามารถทำได้โดยตรง

### File: `greet.js`
```javascript
module.exports = (name) => {
    return `Hello, ${name}`;
};
```

### File: `app.js`
```javascript
const greet = require("./greet");

console.log(greet("Phumin"));
```

### Output
```text
Hello, Phumin
```

---

## 5. What is npm?
**npm** ย่อมาจาก Node Package Manager  
ใช้สำหรับติดตั้งและจัดการ third-party packages

npm จะช่วยให้เราสามารถ:
- ติดตั้ง package
- เก็บ dependency ของโปรเจกต์
- ใช้ scripts ใน `package.json`
- แชร์หรือ reuse project configuration ได้

---

## 6. Initialize Project with npm

```bash
npm init -y
```

คำสั่งนี้จะสร้างไฟล์ `package.json`

### Example: `package.json`
```json
{
  "name": "node-learning",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
```

---

## 7. Installing Third-party Packages

ตัวอย่างติดตั้ง package `validator`

```bash
npm install validator
```

เมื่อติดตั้งแล้ว จะได้:
- โฟลเดอร์ `node_modules`
- ไฟล์ `package-lock.json`
- dependency ใน `package.json`

### Example: Using `validator`
```javascript
const validator = require("validator");

console.log(validator.isEmail("test@example.com"));
console.log(validator.isURL("https://nodejs.org"));
```

### Output
```text
true
true
```

---

## 8. Running with npm Scripts

ถ้าใน `package.json` มี:

```json
"scripts": {
  "start": "node app.js"
}
```

เราสามารถรันได้ด้วยคำสั่ง:

```bash
npm start
```

แทนการใช้:

```bash
node app.js
```

---

## 9. Recommended Project Structure
```text
node-learning/
├─ app.js
├─ math.js
├─ greet.js
├─ package.json
├─ package-lock.json
└─ node_modules/
```

---

## 10. Key Concepts
- Module คือหน่วยของโค้ดที่แยกเป็นสัดส่วน
- `require()` ใช้โหลด built-in, custom, และ third-party modules
- `module.exports` ใช้ส่งออก function / object
- `npm` ใช้จัดการ package และ dependency
- `package.json` คือศูนย์กลางการตั้งค่าโปรเจกต์

---

## 11. Learning Checklist
- [ ] เข้าใจว่า module คืออะไร
- [ ] ใช้ `require()` ได้
- [ ] สร้าง custom module ได้
- [ ] ใช้ `module.exports` ได้
- [ ] รู้จัก `npm init -y`
- [ ] ติดตั้ง package ด้วย `npm install` ได้
- [ ] เข้าใจบทบาทของ `package.json`

---

## 12. Next Module
Module 4: File System, JSON, CLI Arguments
