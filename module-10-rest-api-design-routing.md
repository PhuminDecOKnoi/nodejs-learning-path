# Module 10: REST API Design and Routing

## 1. Overview
Module นี้อธิบายการออกแบบ REST API และการจัด routing
เพื่อสร้าง backend ที่เป็นมาตรฐานและขยายต่อได้

หัวข้อหลัก:
- REST principles
- HTTP methods
- route design
- API structure
- router separation
- CRUD operations

---

## 2. REST API Concept
REST = Representational State Transfer

หลักการ:
- ใช้ HTTP methods
- ใช้ URL แทน resource
- ส่งข้อมูลเป็น JSON
- stateless

Example
```
GET /users
GET /users/1
POST /users
PUT /users/1
DELETE /users/1
```

---

## 3. HTTP Methods
| Method | Purpose |
|--------|---------|
| GET | Read data |
| POST | Create |
| PUT | Update |
| DELETE | Remove |

---

## 4. Basic REST API
```javascript
const express = require("express");
const app = express();

app.use(express.json());

let users = [];

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", (req, res) => {
    users.push(req.body);
    res.send("User added");
});

app.listen(3000);
```

---

## 5. Route Parameters
```javascript
app.get("/users/:id", (req, res) => {
    res.send("User " + req.params.id);
});
```

---

## 6. CRUD Example
```javascript
app.post("/users", (req, res) => {
    users.push(req.body);
    res.send(users);
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.put("/users/:id", (req, res) => {
    users[req.params.id] = req.body;
    res.send("Updated");
});

app.delete("/users/:id", (req, res) => {
    users.splice(req.params.id, 1);
    res.send("Deleted");
});
```

---

## 7. Express Router
สร้าง router แยกไฟล์

routes/users.js
```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User list");
});

module.exports = router;
```

app.js
```javascript
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);
```

---

## 8. REST API Structure
```
project
 ├── app.js
 ├── routes
 │   └── users.js
 ├── controllers
 └── models
```

---

## 9. JSON Response Standard
```javascript
res.send({
    status: "success",
    data: users
});
```

---

## 10. Query Filtering
```javascript
app.get("/users", (req, res) => {
    const role = req.query.role;
    res.send("Filter role " + role);
});
```

---

## 11. Key Concepts
- REST design
- CRUD
- routing
- router separation
- JSON API
- scalable structure

---

## 12. Learning Checklist
- [ ] เข้าใจ REST
- [ ] ใช้ HTTP methods ได้
- [ ] สร้าง CRUD ได้
- [ ] ใช้ router แยกไฟล์ได้
- [ ] ออกแบบ API structure ได้
- [ ] ใช้ query filtering ได้

---

## 13. Next Module
Module 11: Database Integration
