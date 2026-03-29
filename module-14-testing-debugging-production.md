# Module 14: Testing and Debugging in Production

## 1. Overview
Module นี้สอนการทดสอบและ debugging สำหรับ production
เพื่อให้ระบบมีความเสถียรและตรวจสอบปัญหาได้ง่าย

หัวข้อหลัก:
- testing strategy
- unit testing
- integration testing
- logging
- debugging production
- monitoring

---

## 2. Why Testing Important
- ลด bug
- ป้องกัน regression
- เพิ่มความมั่นใจ deploy
- maintain code ง่าย

---

## 3. Install Jest
```bash
npm install --save-dev jest
```

package.json
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Run
```bash
npm test
```

---

## 4. Basic Unit Test
math.js
```javascript
const sum = (a, b) => a + b;
module.exports = sum;
```

math.test.js
```javascript
const sum = require("./math");

test("adds 1 + 2", () => {
    expect(sum(1,2)).toBe(3);
});
```

---

## 5. Testing API (Supertest)
```bash
npm install --save-dev supertest
```

example
```javascript
const request = require("supertest");
const app = require("../app");

test("GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
});
```

---

## 6. Logging
ติดตั้ง
```bash
npm install morgan
```

ใช้งาน
```javascript
const morgan = require("morgan");
app.use(morgan("combined"));
```

---

## 7. Error Handling Middleware
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
```

---

## 8. Debugging Production
เทคนิค:
- log error
- log request
- use monitoring
- track performance

---

## 9. Health Check Endpoint
```javascript
app.get("/health", (req, res) => {
    res.send({
        status: "ok",
        uptime: process.uptime()
    });
});
```

---

## 10. Monitoring Tools
นิยมใช้:
- PM2 monitor
- Grafana
- Datadog
- New Relic
- LogRocket

---

## 11. Production Testing Checklist
- [ ] unit test
- [ ] API test
- [ ] logging enabled
- [ ] error middleware
- [ ] health endpoint
- [ ] monitoring setup

---

## 12. Next Module
Module 15: Project Structure and Best Practices
