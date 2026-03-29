# Module 12: Authentication and Security

## 1. Overview
Module นี้สอนการทำ Authentication และ Security สำหรับ Node.js API
เพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต

หัวข้อหลัก:
- authentication
- authorization
- password hashing
- JWT
- middleware security
- protected routes

---

## 2. Authentication vs Authorization
Authentication = ยืนยันตัวตน  
Authorization = กำหนดสิทธิ์

Example
- login = authentication
- admin access = authorization

---

## 3. Install Dependencies
```bash
npm install bcryptjs jsonwebtoken
```

---

## 4. Password Hashing
```javascript
const bcrypt = require("bcryptjs");

const password = "123456";

bcrypt.hash(password, 8, (error, hash) => {
    console.log(hash);
});
```

---

## 5. Compare Password
```javascript
bcrypt.compare("123456", hash, (error, result) => {
    console.log(result);
});
```

---

## 6. JSON Web Token (JWT)
```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign(
    { id: "user123" },
    "secretkey"
);

console.log(token);
```

---

## 7. Verify Token
```javascript
const decoded = jwt.verify(token, "secretkey");
console.log(decoded);
```

---

## 8. Login Route Example
```javascript
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {

        const token = jwt.sign({ username }, "secret");

        res.send({ token });
    } else {
        res.status(401).send("Invalid login");
    }

});
```

---

## 9. Auth Middleware
```javascript
const auth = (req, res, next) => {

    const token = req.header("Authorization");

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
};
```

---

## 10. Protected Route
```javascript
app.get("/dashboard", auth, (req, res) => {
    res.send("Protected data");
});
```

---

## 11. Authorization Role Example
```javascript
const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).send("Forbidden");
    }

    next();
};
```

---

## 12. Security Best Practices
- hash password
- use JWT
- use HTTPS
- validate input
- sanitize data
- use middleware

---

## 13. Learning Checklist
- [ ] hash password ได้
- [ ] compare password ได้
- [ ] create JWT ได้
- [ ] verify JWT ได้
- [ ] สร้าง auth middleware ได้
- [ ] protected route ได้
- [ ] เข้าใจ authorization

---

## 14. Next Module
Module 13: Deployment and Production
