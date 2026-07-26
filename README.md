# Node.js Learning Path

> Consolidated learning repository for Node.js fundamentals, Express, EJS, database integration, real-time applications, testing, deployment and modern development workflow.

[![Node.js](https://img.shields.io/badge/Node.js-24.18.0%20LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0.0-orange.svg)](package.json)

## ภาพรวม

Repository นี้รวมและปรับปรุงเนื้อหาจากโครงการ Node.js เดิมของ `PhuminDecOKnoi` ให้เป็นแหล่งเรียนรู้หลักเพียงแห่งเดียว ตั้งแต่พื้นฐาน Node.js ไปจนถึง Express, EJS, MySQL, Socket.IO, REST API, authentication, testing, deployment และโครงการฝึกปฏิบัติ

## Repository ที่นำมารวม

- `my-first-node.js`
- `my-express-node.js`
- `my-ejs-node.js`
- `Alison-Beginning-Node-JS-Using-a-Game-Project`
- `Beginning-Node-JS-Using-a-Game-Project-Game-only-`
- `nodejs-learning-path`

รายละเอียดการย้ายและ dependency ที่ปรับปรุงอยู่ใน [MIGRATION.md](MIGRATION.md)

## Technology baseline

| Component | Version / Policy |
|---|---|
| Node.js | `24.18.0 LTS` |
| npm | `>=11` |
| Express | `5.x` |
| EJS | `6.x` |
| Socket.IO | `4.8.x` |
| MySQL client | `mysql2` |
| Development runner | `nodemon 3.1.x` |
| License | MIT |

> สำหรับหลักสูตรและตัวอย่างที่ต้องการความเสถียร ใช้ Node.js LTS เป็นฐาน ส่วน Node.js Current ใช้เพื่อทดลองฟีเจอร์ใหม่เท่านั้น

## โครงสร้างหลัก

```text
nodejs-learning-path/
├── README.md
├── LICENSE
├── MIGRATION.md
├── package.json
├── .nvmrc
├── module-01-*.md ... module-18-*.md
└── examples/
    ├── express-ejs/
    │   ├── src/app.js
    │   └── views/index.ejs
    ├── mysql-crud/
    └── realtime-game/
```

## เริ่มต้นใช้งาน

```bash
# ใช้ Node.js รุ่นที่กำหนดใน .nvmrc
nvm use

# ติดตั้ง dependencies
npm install

# รันตัวอย่าง Express + EJS
npm run dev
```

เปิดเบราว์เซอร์ที่:

```text
http://localhost:3000
```

ตรวจสอบ health endpoint:

```text
http://localhost:3000/api/health
```

## Learning path

1. Introduction to Node.js
2. Environment Setup and First Script
3. Modules, ESM, CommonJS and npm
4. File System, JSON and CLI Arguments
5. Debugging and Error Reading
6. Asynchronous Programming and Event Loop
7. HTTP Requests, Fetch and APIs
8. Web Servers with Express 5
9. HTML, Static Assets and EJS
10. REST API Design and Routing
11. Database Integration with MySQL2 and MongoDB
12. Authentication and Security
13. Deployment and Production Configuration
14. Testing, Logging and Production Debugging
15. Project Structure and Best Practices
16. Git and GitHub Workflow
17. CI/CD Automation
18. Modern AI-Assisted Development Workflow

## สิ่งที่ปรับปรุงจาก Repository เดิม

- เปลี่ยน Express `4.18.2` เป็น Express `5.x`
- เปลี่ยน EJS `3.1.9` เป็น EJS `6.x`
- เปลี่ยนแพ็กเกจ `mysql` เป็น `mysql2`
- ย้าย `nodemon` ไปเป็น `devDependency`
- เลิกใช้แพ็กเกจ `uppercase` และใช้ `toUpperCase()` ของ JavaScript
- เลิกติดตั้งแพ็กเกจ `node` ภายในโครงการ และใช้ `.nvmrc` กับ `engines.node`
- ตัด `init`, `inity`, `json` และ dependency ที่ไม่จำเป็น
- ใช้ built-in middleware ของ Express แทน `body-parser` ในตัวอย่างใหม่
- เพิ่ม health check และ centralized error handling
- กำหนด Version ของ repository เป็น `2.0.0`

## License

โครงการนี้เผยแพร่ภายใต้ [MIT License](LICENSE) สามารถนำไปใช้ ศึกษา แก้ไข และเผยแพร่ต่อได้ตามเงื่อนไขของ License

Third-party packages retain their respective licenses.
