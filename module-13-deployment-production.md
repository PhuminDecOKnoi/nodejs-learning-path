# Module 13: Deployment and Production

## 1. Overview
Module นี้สอนการ deploy Node.js application ไป production
เพื่อให้ระบบสามารถใช้งานผ่าน Internet ได้

หัวข้อหลัก:
- production environment
- environment variables
- start scripts
- deployment platforms
- process manager
- best practices

---

## 2. Development vs Production
Development
- ใช้ local machine
- debug enabled
- auto reload

Production
- live server
- optimized
- secure
- stable

---

## 3. Environment Variables
ติดตั้ง dotenv

```bash
npm install dotenv
```

สร้างไฟล์ .env
```
PORT=3000
JWT_SECRET=mysecret
DB_URL=mongodb://127.0.0.1:27017/app
```

ใช้งาน
```javascript
require("dotenv").config();

const port = process.env.PORT;

app.listen(port);
```

---

## 4. Production Start Script
package.json

```json
{
  "scripts": {
    "start": "node app.js"
  }
}
```

Run
```bash
npm start
```

---

## 5. Using Process Manager (PM2)
ติดตั้ง
```bash
npm install -g pm2
```

Run app
```bash
pm2 start app.js
```

List processes
```bash
pm2 list
```

Restart
```bash
pm2 restart app
```

---

## 6. Deployment Platforms
นิยมใช้:
- Render
- Railway
- Vercel
- Heroku
- DigitalOcean
- AWS

---

## 7. Example: Deploy to Render
ขั้นตอน:
1. push code ไป GitHub
2. create Web Service
3. connect repository
4. set start command

Start command
```
npm start
```

---

## 8. Production Folder Structure
```
project
 ├── app.js
 ├── package.json
 ├── .env
 ├── routes
 ├── controllers
 └── models
```

---

## 9. Security in Production
- ใช้ HTTPS
- hide .env
- validate input
- disable debug logs
- use helmet middleware

ติดตั้ง helmet
```bash
npm install helmet
```

ใช้
```javascript
const helmet = require("helmet");
app.use(helmet());
```

---

## 10. Production Checklist
- [ ] environment variables
- [ ] start script
- [ ] error handling
- [ ] logging
- [ ] security middleware
- [ ] database connection
- [ ] deployment config

---

## 11. Next Module
Module 14: Testing and Debugging in Production
