# Module 8: Web Servers with Express

## 1. Overview
Module นี้จะสอนการสร้าง Web Server ด้วย Express.js
ซึ่งเป็น framework ยอดนิยมของ Node.js

Express ใช้สำหรับ:
- REST API
- Web server
- Backend service
- Dashboard backend
- Microservices

---

## 2. Install Express
```bash
npm install express
```

---

## 3. Basic Express Server
```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

Run
```bash
node app.js
```

Open Browser
```
http://localhost:3000
```

---

## 4. Multiple Routes
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

app.listen(3000);
```

---

## 5. Send JSON
```javascript
app.get("/api", (req, res) => {
    res.send({
        name: "Phumin",
        role: "Node Learner"
    });
});
```

---

## 6. Route Parameters
```javascript
app.get("/user/:id", (req, res) => {
    res.send("User ID: " + req.params.id);
});
```

URL
```
http://localhost:3000/user/100
```

---

## 7. Query String
```javascript
app.get("/search", (req, res) => {
    res.send("Keyword: " + req.query.q);
});
```

URL
```
http://localhost:3000/search?q=node
```

---

## 8. Static Files
```javascript
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
```

Folder structure
```
project
 ├── app.js
 └── public
     └── index.html
```

---

## 9. Middleware
```javascript
app.use((req, res, next) => {
    console.log("Request received");
    next();
});
```

---

## 10. REST API Example
```javascript
app.get("/api/users", (req, res) => {
    res.send([
        { id: 1, name: "John" },
        { id: 2, name: "Jane" }
    ]);
});
```

---

## 11. Key Concepts
- express server
- routes
- middleware
- JSON response
- static files
- REST API

---

## 12. Learning Checklist
- [ ] ติดตั้ง Express ได้
- [ ] สร้าง server ได้
- [ ] สร้าง route ได้
- [ ] ส่ง JSON ได้
- [ ] ใช้ params ได้
- [ ] ใช้ query string ได้
- [ ] ใช้ middleware ได้
- [ ] serve static files ได้

---

## 13. Next Module
Module 9: REST API Design
