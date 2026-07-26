# Node.js Repository Consolidation and Curriculum Audit

> Target: `PhuminDecOKnoi/nodejs-learning-path`  
> Audit date: 2026-07-26

## Consolidated source repositories

1. `PhuminDecOKnoi/my-first-node.js`
2. `PhuminDecOKnoi/my-express-node.js`
3. `PhuminDecOKnoi/my-ejs-node.js`
4. `PhuminDecOKnoi/Alison-Beginning-Node-JS-Using-a-Game-Project`
5. `PhuminDecOKnoi/Beginning-Node-JS-Using-a-Game-Project-Game-only-`
6. `PhuminDecOKnoi/nodejs-learning-path`

## Audited Markdown scope

ไฟล์สื่อสอน Module 1–15 และ `README.md` ได้รับการอ่าน ตรวจความถูกต้อง และปรับปรุงแล้ว:

- Node.js architecture and LTS policy
- environment setup and version management
- ESM/CommonJS and npm
- filesystem, JSON and CLI
- debugging and errors
- asynchronous programming
- HTTP/fetch
- Express 5
- EJS/static assets
- REST API design
- database integration
- authentication/security
- deployment/production
- testing/diagnostics
- project structure/best practices

## Version baseline after audit

| Technology | Baseline |
|---|---|
| Node.js | `24.18.0 LTS` |
| npm | `11.x` |
| Express | `5.x` |
| EJS | `6.x` |
| MongoDB Node.js Driver | `7.x` |
| MySQL client | `mysql2 3.x` |
| Socket.IO | `4.8.x` |
| Test runner | built-in `node:test` |
| Watch mode | built-in `node --watch` |
| License | MIT |

## Legacy content replaced or corrected

### Runtime and modules

- แก้คำอธิบาย `single-threaded` ให้แยก JavaScript main thread, OS asynchronous I/O, libuv worker pool และ `worker_threads`
- เปลี่ยนจาก CommonJS-first เป็น ESM-first แต่ยังอธิบาย CommonJS สำหรับ legacy maintenance
- ใช้ `node:` prefix กับ built-in modules
- ใช้ `.nvmrc`/`engines.node` แทน package ชื่อ `node`

### Asynchronous and HTTP

- เปลี่ยนจาก callback-first เป็น Promise/`async`–`await` first
- เพิ่ม microtask, `Promise.all()`, cancellation และ timeout
- ใช้ built-in `fetch()` และตรวจ `response.ok`
- แก้คำอธิบายที่เรียก Node.js asynchronous facilities ว่า browser “Web API”

### Express and templates

- เปลี่ยน Express `4.18.2` เป็น Express `5.x`
- ใช้ async error propagation ของ Express 5
- ใช้ `express.json()`/`express.urlencoded()` แทน `body-parser`
- เพิ่ม centralized error handling, payload limits และ 404 handler
- อัปเดต EJS พร้อมข้อควรระวัง `<%= %>` กับ `<%- %>` เพื่อป้องกัน XSS

### Database

- เปลี่ยน package `mysql` เป็น `mysql2`
- เพิ่ม Promise pool และ parameterized queries
- อัปเดต MongoDB official driver เป็นสาย `7.x`
- เพิ่ม Stable API, connection reuse, indexes และ backup/restore guidance

### Security and production

- เพิ่ม password hashing policy, secure cookie/session, token limitations, CSRF, rate limiting และ secret management
- เพิ่ม health/readiness, graceful shutdown, container baseline และ CI/CD gates
- ใช้ structured logs, metrics, traces และ diagnostic reports
- ใช้ built-in Node.js test runner เป็นตัวเลือกหลักของหลักสูตร

## Removed or discouraged dependencies

- `init`
- `inity`
- npm package `node` ใน application dependencies
- beta package `uppercase`
- legacy package `mysql`
- `body-parser` สำหรับ Express use case ทั่วไป
- nodemon สำหรับบทพื้นฐานที่ใช้ built-in `node --watch` ได้

Dependency เหล่านี้อาจยังพบใน history หรือ legacy repository แต่ไม่ควรเป็น baseline ของหลักสูตรใหม่

## License

Repository หลักเผยแพร่ภายใต้ MIT License ส่วน dependency และเนื้อหาจาก third parties ยังคงอยู่ภายใต้ License ของเจ้าของแต่ละรายการ การนำเนื้อหาจากแหล่งอื่นเข้ามาต้องมีสิทธิ์นำมาเผยแพร่ต่อ

## Legacy repository handling

หลังตรวจ content parity และยืนยันว่าไม่มี source code สำคัญตกหล่น สามารถ archive repository ต้นทาง 5 แห่งและแก้ README ให้ชี้มายัง `nodejs-learning-path` การ archive เหมาะกว่าการลบ เพราะรักษา commit history และลิงก์เดิม

## Remaining roadmap

- ตรวจและนำ source code ตัวอย่างจาก repository เดิมเข้ามาแบบ file-by-file
- เพิ่ม Module 16: Git and GitHub Workflow
- เพิ่ม Module 17: CI/CD Automation
- เพิ่ม Module 18: AI-Assisted Development Workflow
- เพิ่ม automated link check และ Markdown lint ใน GitHub Actions
