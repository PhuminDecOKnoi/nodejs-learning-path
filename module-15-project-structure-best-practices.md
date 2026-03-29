# Module 15: Project Structure and Best Practices

## 1. Overview
Module นี้สรุปโครงสร้างโปรเจกต์ Node.js แบบ Production-ready
และ Best Practices เพื่อให้โค้ดอ่านง่าย ขยายง่าย และดูแลระยะยาวได้

หัวข้อหลัก:
- project structure
- separation of concerns
- folder organization
- coding standards
- scalability
- maintainability

---

## 2. Recommended Project Structure
```
project
 ├── src
 │   ├── app.js
 │   ├── server.js
 │   ├── routes
 │   ├── controllers
 │   ├── models
 │   ├── middleware
 │   ├── services
 │   └── utils
 ├── tests
 ├── public
 ├── .env
 ├── package.json
 └── README.md
```

---

## 3. Separation of Concerns

| Layer | Responsibility |
|-------|---------------|
| routes | endpoint definition |
| controllers | request handling |
| services | business logic |
| models | database schema |
| middleware | auth / logging |
| utils | helper functions |

---

## 4. Example Flow
```
Route → Controller → Service → Model → Database
```

---

## 5. Route Example
```javascript
router.get("/users", userController.getUsers);
```

Controller
```javascript
exports.getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.send(users);
};
```

Service
```javascript
exports.getUsers = () => {
    return User.find();
};
```

---

## 6. Environment Config
```
src/config
 ├── database.js
 ├── auth.js
 └── server.js
```

---

## 7. Naming Conventions
- use camelCase for variables
- use PascalCase for classes
- use kebab-case for files
- use plural for routes

Examples
```
userController.js
authMiddleware.js
users.routes.js
```

---

## 8. Error Handling Pattern
```javascript
try {
    const data = await service();
    res.send(data);
} catch (error) {
    next(error);
}
```

---

## 9. Central Error Middleware
```javascript
app.use((err, req, res, next) => {
    res.status(500).send({
        error: err.message
    });
});
```

---

## 10. Best Practices Checklist
- แยก routes
- แยก controllers
- แยก services
- ใช้ environment variables
- ใช้ middleware
- centralized error handling
- consistent naming
- logging
- testing

---

## 11. Scalable Structure
```
modules
 ├── users
 │   ├── users.routes.js
 │   ├── users.controller.js
 │   ├── users.service.js
 │   └── users.model.js
```

---

## 12. Key Concepts
- scalable architecture
- separation of concerns
- maintainable code
- production structure
- clean code

---

## 13. Learning Checklist
- [ ] ใช้ project structure ได้
- [ ] แยก layers ได้
- [ ] ใช้ naming convention ได้
- [ ] ทำ centralized error ได้
- [ ] สร้าง scalable architecture ได้

---

## 14. Course Completed
คุณได้เรียนครบ Node.js Learning Path:
- Core Node.js
- Express
- REST API
- Database
- Auth
- Deployment
- Testing
- Production Structure

Ready for:
- Real project
- Enterprise backend
- Dashboard system
- AI integration
