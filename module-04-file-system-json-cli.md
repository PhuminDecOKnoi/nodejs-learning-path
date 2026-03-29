# Module 4: File System, JSON, CLI Arguments

## 1. Overview
Module นี้จะพาไปรู้จักการทำงานกับ:
- **File System (fs)** สำหรับอ่าน/เขียนไฟล์
- **JSON** สำหรับเก็บและแปลงข้อมูล
- **CLI Arguments** สำหรับรับค่าจาก command line

หัวข้อเหล่านี้เป็นพื้นฐานสำคัญของการสร้าง Node.js tools, notes app และ automation scripts

---

## 2. File System with `fs`
Node.js มี built-in module ชื่อ `fs` สำหรับจัดการไฟล์

### Example: Write File
```javascript
const fs = require("fs");

fs.writeFileSync("notes.txt", "Hello from Node.js");
console.log("File created");
```

### Output
```text
File created
```

### Result
จะมีไฟล์ `notes.txt` ถูกสร้างขึ้นในโฟลเดอร์โปรเจกต์

---

## 3. Append Data to File
```javascript
const fs = require("fs");

fs.appendFileSync("notes.txt", "\nNew line added");
console.log("File updated");
```

### Output
```text
File updated
```

---

## 4. Read File
```javascript
const fs = require("fs");

const dataBuffer = fs.readFileSync("notes.txt");
const dataString = dataBuffer.toString();

console.log(dataString);
```

### Output Example
```text
Hello from Node.js
New line added
```

---

## 5. What is JSON?
**JSON (JavaScript Object Notation)** คือรูปแบบข้อมูลแบบข้อความที่นิยมใช้มากในการเก็บข้อมูลและส่งข้อมูลระหว่างระบบ

### Example Object to JSON
```javascript
const user = {
    name: "Phumin",
    age: 41
};

const userJSON = JSON.stringify(user);
console.log(userJSON);
```

### Output
```text
{"name":"Phumin","age":41}
```

---

## 6. JSON to Object
```javascript
const userJSON = '{"name":"Phumin","age":41}';
const userObject = JSON.parse(userJSON);

console.log(userObject.name);
console.log(userObject.age);
```

### Output
```text
Phumin
41
```

---

## 7. Save JSON to File
```javascript
const fs = require("fs");

const book = {
    title: "Node.js Guide",
    author: "Phumin"
};

const bookJSON = JSON.stringify(book);
fs.writeFileSync("book.json", bookJSON);

console.log("JSON file saved");
```

### Output
```text
JSON file saved
```

---

## 8. Read JSON from File
```javascript
const fs = require("fs");

const dataBuffer = fs.readFileSync("book.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

console.log(data.title);
console.log(data.author);
```

### Output
```text
Node.js Guide
Phumin
```

---

## 9. CLI Arguments with `process.argv`
Node.js สามารถรับค่าจาก command line ผ่าน `process.argv`

### Example
```javascript
console.log(process.argv);
```

Run:
```bash
node app.js add --title="Learn Node"
```

### Output Example
```text
[
  '/usr/local/bin/node',
  '/project/app.js',
  'add',
  '--title=Learn Node'
]
```

---

## 10. Using CLI Arguments
```javascript
const command = process.argv[2];

if (command === "add") {
    console.log("Adding note...");
} else if (command === "remove") {
    console.log("Removing note...");
} else {
    console.log("Unknown command");
}
```

Run:
```bash
node app.js add
```

### Output
```text
Adding note...
```

---

## 11. Combined Example: Save Note from CLI
```javascript
const fs = require("fs");

const title = process.argv[2];
const body = process.argv[3];

const note = {
    title: title,
    body: body
};

fs.writeFileSync("note.json", JSON.stringify(note));
console.log("Note saved");
```

Run:
```bash
node app.js "Meeting" "Discuss Node.js roadmap"
```

### Output
```text
Note saved
```

Saved JSON:
```json
{"title":"Meeting","body":"Discuss Node.js roadmap"}
```

---

## 12. Recommended Practice
ควรฝึกทำ mini project เช่น:
- note saver
- todo CLI
- config reader
- JSON profile manager

---

## 13. Key Concepts
- `fs` ใช้จัดการไฟล์
- `writeFileSync()` ใช้เขียนไฟล์
- `appendFileSync()` ใช้เพิ่มข้อมูลในไฟล์
- `readFileSync()` ใช้อ่านไฟล์
- `JSON.stringify()` แปลง object เป็น JSON string
- `JSON.parse()` แปลง JSON string เป็น object
- `process.argv` ใช้รับค่าจาก command line

---

## 14. Learning Checklist
- [ ] ใช้ `fs` ได้
- [ ] สร้างและแก้ไขไฟล์ได้
- [ ] อ่านข้อมูลจากไฟล์ได้
- [ ] เข้าใจ JSON
- [ ] ใช้ `JSON.stringify()` ได้
- [ ] ใช้ `JSON.parse()` ได้
- [ ] ใช้ `process.argv` ได้
- [ ] รับ command จาก CLI ได้

---

## 15. Next Module
Module 5: Debugging and Error Reading
