# Module 6: Asynchronous Programming

## 1. Overview
Module นี้อธิบายแนวคิดสำคัญของ Node.js คือ **Asynchronous Programming**
ซึ่งทำให้ Node.js สามารถทำงานหลายอย่างพร้อมกันได้โดยไม่ block

หัวข้อหลัก:
- synchronous vs asynchronous
- callback
- event loop
- setTimeout
- async workflow
- handling async errors

---

## 2. Synchronous vs Asynchronous

### Synchronous (ทำงานตามลำดับ)
```javascript
console.log("Start");
console.log("Process");
console.log("End");
```

Output
```
Start
Process
End
```

### Asynchronous
```javascript
console.log("Start");

setTimeout(() => {
    console.log("Async Task");
}, 2000);

console.log("End");
```

Output
```
Start
End
Async Task
```

---

## 3. setTimeout Example
```javascript
setTimeout(() => {
    console.log("2 seconds passed");
}, 2000);
```

---

## 4. Non-blocking Behavior
Node.js ไม่หยุดรอ async task

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

console.log("3");
```

Output
```
1
3
2
```

---

## 5. Callback Function
callback คือ function ที่ส่งเข้าไปให้เรียกภายหลัง

```javascript
const fetchData = (callback) => {
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
};

fetchData((data) => {
    console.log(data);
});
```

Output
```
Data loaded
```

---

## 6. Callback with Error Handling
```javascript
const fetchUser = (callback) => {
    const error = false;

    if (error) {
        callback("Error occurred");
    } else {
        callback(null, { name: "Phumin" });
    }
};

fetchUser((error, user) => {
    if (error) {
        return console.log(error);
    }

    console.log(user.name);
});
```

---

## 7. Async Example Simulation
```javascript
const getWeather = (city, callback) => {
    setTimeout(() => {
        callback(null, "Sunny in " + city);
    }, 1500);
};

getWeather("Bangkok", (error, result) => {
    console.log(result);
});
```

---

## 8. Event Loop Concept
Node.js ทำงานด้วย:
- Call Stack
- Callback Queue
- Event Loop

Flow:
1. code เข้า call stack
2. async ส่งไป Web API
3. callback เข้า queue
4. event loop ส่งกลับเข้า stack

---

## 9. Multiple Async Tasks
```javascript
setTimeout(() => {
    console.log("Task 1");
}, 3000);

setTimeout(() => {
    console.log("Task 2");
}, 1000);

console.log("Start");
```

Output
```
Start
Task 2
Task 1
```

---

## 10. Real Use Case: Async File Read
```javascript
const fs = require("fs");

fs.readFile("notes.txt", (err, data) => {
    if (err) {
        return console.log("Error reading file");
    }

    console.log(data.toString());
});

console.log("Reading file...");
```

---

## 11. Key Concepts
- Node.js เป็น non-blocking
- async code ไม่รอ
- callback ใช้รับผลลัพธ์
- event loop จัดการ async
- async ทำให้ server เร็ว

---

## 12. Learning Checklist
- [ ] เข้าใจ async vs sync
- [ ] ใช้ setTimeout ได้
- [ ] เข้าใจ callback
- [ ] อ่าน flow async ได้
- [ ] เข้าใจ event loop
- [ ] ใช้ async file read ได้

---

## 13. Next Module
Module 7: HTTP Server and Express Basics
