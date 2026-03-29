# Module 7: HTTP Requests and APIs

## 1. Overview
Module นี้จะอธิบายการทำ HTTP Request จาก Node.js เพื่อเชื่อมต่อกับ API ภายนอก
ซึ่งเป็นพื้นฐานสำคัญของ:
- REST API
- Microservices
- External integrations
- Dashboard data fetching

หัวข้อหลัก:
- HTTP request
- REST API
- JSON response
- callback async request
- error handling

---

## 2. What is HTTP Request
HTTP request คือการส่งคำขอไปยัง server เพื่อขอข้อมูล

ตัวอย่าง:
- ขอ weather data
- ขอ user profile
- ขอ stock price
- ขอ database ผ่าน API

---

## 3. Install Request Library
```bash
npm install request
```

---

## 4. Basic HTTP Request
```javascript
const request = require("request");

const url = "https://jsonplaceholder.typicode.com/todos/1";

request({ url: url }, (error, response) => {
    console.log(response.body);
});
```

Output (JSON string)
```
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

---

## 5. Parse JSON Response
```javascript
const request = require("request");

const url = "https://jsonplaceholder.typicode.com/todos/1";

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.title);
});
```

---

## 6. Using json option
```javascript
const request = require("request");

const url = "https://jsonplaceholder.typicode.com/todos/1";

request({ url: url, json: true }, (error, response) => {
    console.log(response.body.title);
});
```

---

## 7. Handling Errors
```javascript
const request = require("request");

const url = "https://invalid-url";

request({ url: url, json: true }, (error, response) => {

    if (error) {
        return console.log("Unable to connect");
    }

    console.log(response.body);
});
```

---

## 8. Real Example: Weather API Simulation
```javascript
const request = require("request");

const url = "https://api.agify.io/?name=phumin";

request({ url: url, json: true }, (error, response) => {

    if (error) {
        return console.log("Error");
    }

    console.log("Name:", response.body.name);
    console.log("Age:", response.body.age);
});
```

---

## 9. HTTP Request Flow
1. send request
2. wait async
3. server respond JSON
4. callback executed
5. parse data
6. use data

---

## 10. Callback Pattern in API
```javascript
const getUser = (id, callback) => {

    const url = "https://jsonplaceholder.typicode.com/users/" + id;

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            return callback("Error", null);
        }

        callback(null, response.body);
    });
};

getUser(1, (error, user) => {

    if (error) {
        return console.log(error);
    }

    console.log(user.name);
});
```

---

## 11. Key Concepts
- HTTP request ใช้ดึงข้อมูล
- API ส่งข้อมูลแบบ JSON
- async callback รับผลลัพธ์
- ต้อง handle error
- ใช้ request library

---

## 12. Learning Checklist
- [ ] เข้าใจ HTTP request
- [ ] ใช้ request library ได้
- [ ] parse JSON response ได้
- [ ] handle error ได้
- [ ] เรียก API ภายนอกได้
- [ ] ใช้ callback กับ API ได้

---

## 13. Next Module
Module 8: Express.js Web Server
