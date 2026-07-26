# Module 15: Project Structure and Best Practices

> Baseline: Node.js 24 LTS • Express 5.x • ESM-first • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะออกแบบโครงสร้างโครงการตาม responsibility, แยก transport/business/data layers และกำหนดมาตรฐานที่ช่วยให้โครงการทดสอบ บำรุงรักษา และขยายได้

## Recommended structure

```text
node-app/
├─ src/
│  ├─ app.js                 # สร้าง Express app
│  ├─ server.js              # เปิด port และ lifecycle
│  ├─ config/
│  │  └─ env.js
│  ├─ routes/
│  │  └─ user.routes.js
│  ├─ controllers/
│  │  └─ user.controller.js
│  ├─ services/
│  │  └─ user.service.js
│  ├─ repositories/
│  │  └─ user.repository.js
│  ├─ middleware/
│  │  ├─ error-handler.js
│  │  └─ request-id.js
│  └─ domain/
│     └─ user.js
├─ test/
│  ├─ unit/
│  └─ integration/
├─ public/
├─ views/
├─ .env.example
├─ .gitignore
├─ .nvmrc
├─ package.json
├─ package-lock.json
└─ README.md
```

โครงสร้างเป็นแนวทาง ไม่ใช่กฎตายตัว โครงการเล็กไม่ควรสร้าง layer จำนวนมากโดยไม่มีความจำเป็น

## Responsibility flow

```text
Route → Controller → Service → Repository → Database
```

- **Route:** HTTP path/middleware composition
- **Controller:** แปลง HTTP request/response
- **Service:** business rules และ use cases
- **Repository:** data access
- **Domain:** entity/value/rules ที่ไม่ผูกกับ framework

ห้ามวาง SQL, password hashing, authorization rule และ response formatting ทั้งหมดไว้ใน route เดียว

## App/server separation

```js
// app.js
import express from "express";
export const app = express();

// server.js
import { app } from "./app.js";
const server = app.listen(process.env.PORT ?? 3000);
```

รูปแบบนี้ช่วยให้ integration test import app ได้โดยไม่เปิด port อัตโนมัติ

## Configuration

- validate environment ตอน startup
- มี `.env.example` แต่ไม่ commit `.env`
- fail fast เมื่อ configuration สำคัญหาย
- อย่าอ่าน `process.env` กระจายทั่วโครงการ ให้รวมผ่าน config module

## Coding standards

- ใช้ ESM และ `node:` prefix สำหรับ built-in modules
- ใช้ `const` เป็นค่าเริ่มต้น
- ใช้ async/await และกำหนด timeout ที่ external boundary
- หลีกเลี่ยง global mutable state
- dependency injection แบบเรียบง่ายเพื่อทดสอบได้
- centralized error mapping
- structured logging และ request ID
- เขียน JSDoc/TypeScript เฉพาะเมื่อช่วย contract ไม่ใช่ comment ซ้ำ code

## Repository standards

ควรมี:

- `README.md`
- `LICENSE` (MIT สำหรับ repository นี้)
- `.gitignore`
- lockfile
- `CONTRIBUTING.md` เมื่อเปิดรับ contribution
- `SECURITY.md` เมื่อเป็น public application/library
- CI สำหรับ test และ dependency review

## Definition of done

- code ผ่าน test/lint/type-check ที่กำหนด
- input validation และ authorization ครบ
- ไม่มี secret หรือ generated dependencies ใน commit
- documentation และ migration note ถูกอัปเดต
- มี observability สำหรับ feature สำคัญ
- rollback หรือ remediation path ชัดเจน

## Checklist

- [ ] แยก app จาก server lifecycle ได้
- [ ] แยก route/controller/service/repository ตามความจำเป็นได้
- [ ] validate configuration ตอน startup ได้
- [ ] เขียนโครงการที่ทดสอบได้โดยไม่พึ่ง global state
- [ ] ตรวจมาตรฐาน repository และ definition of done ได้

## Official references

- Node.js package conventions: <https://nodejs.org/docs/latest-v24.x/api/packages.html>
- Express production practices: <https://expressjs.com/en/advanced/best-practice-performance.html>
- GitHub repository documentation: <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository>
