# Module 11: Database Integration

## 1. Overview
Module นี้สอนการเชื่อม Node.js กับ Database
เพื่อเก็บข้อมูลแบบถาวรแทน array ใน memory

Database ที่นิยม:
- MongoDB
- MySQL
- PostgreSQL
- SQLite

ใน module นี้จะใช้ MongoDB เป็นตัวอย่าง

---

## 2. Why Database
ปัญหาของการใช้ array:
- restart server ข้อมูลหาย
- ไม่รองรับหลาย user
- ไม่สามารถ query ซับซ้อน

Database แก้ปัญหา:
- persistent storage
- query data
- scalable
- production ready

---

## 3. Install MongoDB Driver
```bash
npm install mongodb
```

---

## 4. Connect to MongoDB
```javascript
const { MongoClient } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "node-app";

MongoClient.connect(connectionURL, {}, (error, client) => {

    if (error) {
        return console.log("Unable to connect");
    }

    const db = client.db(databaseName);

    console.log("Connected to database");
});
```

---

## 5. Insert Document
```javascript
db.collection("users").insertOne({
    name: "Phumin",
    age: 41
});
```

---

## 6. Insert Multiple
```javascript
db.collection("users").insertMany([
    { name: "John", age: 25 },
    { name: "Jane", age: 30 }
]);
```

---

## 7. Find Data
```javascript
db.collection("users").find().toArray((error, users) => {
    console.log(users);
});
```

---

## 8. Find One
```javascript
db.collection("users").findOne({ name: "Phumin" }, (error, user) => {
    console.log(user);
});
```

---

## 9. Update Document
```javascript
db.collection("users").updateOne(
    { name: "Phumin" },
    {
        $set: {
            age: 42
        }
    }
);
```

---

## 10. Delete Document
```javascript
db.collection("users").deleteOne({ name: "John" });
```

---

## 11. Using with Express
```javascript
app.get("/users", (req, res) => {

    db.collection("users").find().toArray((error, users) => {
        res.send(users);
    });

});
```

---

## 12. Project Structure
```
project
 ├── app.js
 ├── db
 │   └── mongo.js
 ├── routes
 └── controllers
```

---

## 13. Key Concepts
- database connection
- collection
- document
- CRUD database
- persistence
- backend storage

---

## 14. Learning Checklist
- [ ] ติดตั้ง MongoDB driver
- [ ] connect database ได้
- [ ] insert data ได้
- [ ] query data ได้
- [ ] update data ได้
- [ ] delete data ได้
- [ ] ใช้กับ Express ได้

---

## 15. Next Module
Module 12: Authentication and Security
