# Module 5: Debugging and Error Reading

## 1. Overview
Module นี้เน้นการหาและแก้ปัญหาใน Node.js ผ่าน 2 เรื่องหลัก:
- **Debugging** คือการตรวจสอบการทำงานของโปรแกรม
- **Error Reading** คือการอ่านและตีความ error message ให้เข้าใจ

ทักษะสองอย่างนี้สำคัญมาก เพราะต่อให้เขียนโค้ดได้ แต่ถ้าอ่าน error ไม่ออกหรือหา bug ไม่เจอ ก็จะพัฒนาได้ช้า

---

## 2. Why Debugging Matters
ในการพัฒนาโปรแกรม เรามักเจอปัญหาเช่น:
- ตัวแปรมีค่าผิด
- function ไม่ถูกเรียก
- path ของไฟล์ไม่ถูกต้อง
- syntax ผิด
- logic ผิด
- package ใช้งานไม่ตรงวิธี

ดังนั้น debugging ไม่ใช่เรื่องเสริม แต่เป็นทักษะหลักของ developer

---

## 3. Basic Debugging with `console.log()`
วิธีง่ายที่สุดคือใช้ `console.log()` เพื่อตรวจสอบค่าระหว่างทาง

### Example
```javascript
const name = "Phumin";
const age = 41;

console.log("name =", name);
console.log("age =", age);
```

### Output
```text
name = Phumin
age = 41
```

### Use Case
- ดูค่าตัวแปร
- ตรวจสอบว่า code วิ่งมาถึงจุดไหน
- เช็กผลลัพธ์ก่อน return

---

## 4. Debugging Execution Flow
เราสามารถใส่ log หลายจุดเพื่อดู flow การทำงาน

### Example
```javascript
console.log("Start");

const add = (a, b) => {
    console.log("Inside add()");
    return a + b;
};

const result = add(5, 3);

console.log("Result =", result);
console.log("End");
```

### Output
```text
Start
Inside add()
Result = 8
End
```

---

## 5. Using `debugger`
Node.js รองรับ keyword `debugger` เพื่อหยุดโปรแกรมในจุดที่ต้องการตรวจสอบ

### Example
```javascript
const user = {
    name: "Phumin",
    role: "HR"
};

debugger;

console.log(user);
```

รันด้วยคำสั่ง:
```bash
node inspect app.js
```

หรือใช้ debugger ผ่าน VS Code / Chrome DevTools

### จุดเด่น
- หยุดโปรแกรมเป็นจุด
- ดูค่าตัวแปร ณ เวลานั้น
- step over / step into ได้
- เหมาะกับ bug ที่ซับซ้อนกว่า `console.log()`

---

## 6. What is an Error Message?
Error message คือข้อความที่ Node.js หรือ V8 ส่งออกมาเมื่อโปรแกรมเกิดปัญหา

ตัวอย่างทั่วไป:
- `ReferenceError`
- `SyntaxError`
- `TypeError`
- `RangeError`

---

## 7. Example: ReferenceError
```javascript
console.log(username);
```

### Output Example
```text
ReferenceError: username is not defined
```

### Meaning
- มีการเรียกใช้ตัวแปร `username`
- แต่ตัวแปรนี้ยังไม่ถูกประกาศ

### Fix
```javascript
const username = "Phumin";
console.log(username);
```

---

## 8. Example: SyntaxError
```javascript
const name = "Phumin
console.log(name);
```

### Output Example
```text
SyntaxError: Invalid or unexpected token
```

### Meaning
- syntax ของโค้ดผิด
- ในตัวอย่างคือปิด `"` ไม่ครบ

### Fix
```javascript
const name = "Phumin";
console.log(name);
```

---

## 9. Example: TypeError
```javascript
const user = null;
console.log(user.name);
```

### Output Example
```text
TypeError: Cannot read properties of null
```

### Meaning
- พยายามเข้าถึง property ของ `null`

### Fix
```javascript
const user = { name: "Phumin" };
console.log(user.name);
```

หรือเช็กก่อนใช้งาน
```javascript
if (user) {
    console.log(user.name);
}
```

---

## 10. How to Read an Error Message
เวลาอ่าน error message ให้ดูตามลำดับนี้:

### 1) ประเภทของ error
เช่น:
- `ReferenceError`
- `SyntaxError`
- `TypeError`

### 2) ข้อความอธิบาย
เช่น:
```text
ReferenceError: username is not defined
```

### 3) ไฟล์และบรรทัด
เช่น:
```text
/app.js:3
```

### 4) Stack Trace
Stack trace จะบอกว่า error เกิดจาก function ไหน เรียกต่อมาจากจุดไหน

---

## 11. Example: Reading Stack Trace
```javascript
const printUser = () => {
    const user = undefined;
    console.log(user.name);
};

const start = () => {
    printUser();
};

start();
```

### Output Example
```text
TypeError: Cannot read properties of undefined (reading 'name')
    at printUser (/project/app.js:3:22)
    at start (/project/app.js:7:5)
    at Object.<anonymous> (/project/app.js:10:1)
```

### How to Read
- error หลักคือ `TypeError`
- จุดเกิด error จริงอยู่ที่ `printUser`
- บรรทัดสำคัญคือ `/project/app.js:3:22`

---

## 12. Common Debugging Workflow
แนวทางที่แนะนำ:
1. อ่าน error type
2. อ่านข้อความ error
3. ดูบรรทัดที่เกิดปัญหา
4. ใช้ `console.log()` ตรวจค่าตัวแปร
5. ถ้ายังซับซ้อน ใช้ `debugger`
6. แก้แล้วรันใหม่
7. ทดสอบ edge cases

---

## 13. Example: Debugging CLI Input
```javascript
const command = process.argv[2];

console.log("Command =", command);

if (command === "add") {
    console.log("Adding...");
} else {
    console.log("Unknown command");
}
```

Run:
```bash
node app.js remove
```

### Output
```text
Command = remove
Unknown command
```

จุดนี้ช่วยให้เห็นชัดว่าค่าที่รับเข้ามาคืออะไร

---

## 14. Debugging JSON Read
```javascript
const fs = require("fs");

const dataBuffer = fs.readFileSync("user.json");
const dataJSON = dataBuffer.toString();

console.log("Raw JSON =", dataJSON);

const user = JSON.parse(dataJSON);
console.log("Parsed user =", user);
```

วิธีนี้ช่วยแยกได้ว่า bug อยู่ที่:
- การอ่านไฟล์
- รูปแบบ JSON
- หรือขั้นตอน parse

---

## 15. Best Practices
- ใช้ `console.log()` อย่างเป็นระบบ
- log เฉพาะจุดสำคัญ
- ตั้งชื่อ log ให้อ่านง่าย
- อ่าน error จากบนลงล่าง
- อย่าเดาสุ่ม ให้ดูค่าจริง
- ทดสอบทีละส่วน
- แยก syntax error ออกจาก logic error

---

## 16. Key Concepts
- `console.log()` คือเครื่องมือ debug ขั้นพื้นฐาน
- `debugger` ใช้หยุดโปรแกรมเพื่อตรวจสอบค่า
- Error message ต้องอ่านทั้งประเภทและรายละเอียด
- Stack trace ช่วยย้อนหาต้นตอของปัญหา
- การ debug ที่ดีคือการตรวจสอบอย่างเป็นขั้นตอน

---

## 17. Learning Checklist
- [ ] ใช้ `console.log()` เพื่อตรวจค่าตัวแปรได้
- [ ] เข้าใจการใช้ `debugger`
- [ ] อ่าน `ReferenceError` ได้
- [ ] อ่าน `SyntaxError` ได้
- [ ] อ่าน `TypeError` ได้
- [ ] ดูบรรทัดและไฟล์จาก error message ได้
- [ ] อ่าน stack trace เบื้องต้นได้
- [ ] มี workflow ในการ debug อย่างเป็นระบบ

---

## 18. Next Module
Module 6: Asynchronous Programming Basics
