# Node.js Learning Path (Lessons 1–15)

สรุปฉบับย่อสำหรับการเรียน Node.js ตั้งแต่พื้นฐานจนถึงโครงสร้างโปรเจกต์ระดับ Production

---

## Overview
ชุดบทเรียนนี้ครอบคลุมเส้นทางการเรียนรู้ Node.js แบบครบลำดับ จากการติดตั้ง การเขียนสคริปต์แรก การใช้ modules และ npm ไปจนถึงการสร้าง REST API เชื่อมฐานข้อมูล ทำ authentication, deployment, testing และออกแบบ project structure ที่ขยายต่อได้

---

## Lesson Summary

### 1) Introduction to Node.js
- เข้าใจว่า Node.js คือ JavaScript Runtime ที่รันนอก browser
- รู้จัก V8, event-driven, non-blocking I/O
- เห็นภาพว่า Node.js เหมาะกับ backend, API, CLI และ real-time systems

### 2) Environment Setup and First Script
- ติดตั้ง Node.js และเครื่องมือพื้นฐาน
- ตรวจสอบเวอร์ชันด้วย `node -v` และ `npm -v`
- สร้างและรันไฟล์ `.js` แรกได้

### 3) Modules, require, exports, npm
- ใช้ `require()` โหลด built-in, custom และ third-party modules
- ใช้ `module.exports` แยก logic เป็นหลายไฟล์
- เริ่มต้นใช้งาน `npm` และ `package.json`

### 4) File System, JSON, CLI Arguments
- ใช้ `fs` อ่าน/เขียนไฟล์
- ใช้ `JSON.stringify()` และ `JSON.parse()`
- รับค่าจาก command line ผ่าน `process.argv`

### 5) Debugging and Error Reading
- ใช้ `console.log()` และ `debugger`
- อ่าน `ReferenceError`, `SyntaxError`, `TypeError`
- เข้าใจ stack trace และวิธีไล่ bug อย่างเป็นระบบ

### 6) Asynchronous Programming
- เข้าใจ sync vs async
- ใช้ `setTimeout()` และ callback
- เข้าใจ call stack, callback queue และ event loop
- มองเห็นแนวคิด non-blocking ของ Node.js

### 7) HTTP Requests and APIs
- ส่ง HTTP requests จาก Node.js
- ใช้งาน API ภายนอกและรับข้อมูล JSON
- parse response และ handle error ได้

### 8) Web Servers with Express
- สร้าง web server ด้วย Express
- สร้าง routes และส่ง response แบบ text / JSON
- ใช้ middleware และ serve static files ได้

### 9) HTML5, Static Assets, and Templating
- เชื่อม Express กับ HTML5
- serve CSS / JS / static assets
- ใช้ template engine เช่น Handlebars เพื่อ render dynamic HTML

### 10) REST API Design and Routing
- เข้าใจหลักการ REST และ HTTP methods
- ออกแบบ CRUD endpoints
- ใช้ Express Router แยก route ออกจากไฟล์หลัก
- วางโครงสร้าง API ให้ขยายง่าย

### 11) Database Integration
- เชื่อม Node.js กับฐานข้อมูล
- เรียนรู้ CRUD กับ MongoDB
- นำ database ไปใช้ร่วมกับ Express API
- เปลี่ยนจาก in-memory data ไปสู่ persistent storage

### 12) Authentication and Security
- เข้าใจ Authentication vs Authorization
- hash password ด้วย bcrypt
- ใช้ JWT สำหรับ token-based auth
- สร้าง auth middleware และ protected routes

### 13) Deployment and Production
- แยก development กับ production
- ใช้ environment variables ผ่าน `.env`
- ตั้งค่า start script และ process manager
- เข้าใจแนวคิด deployment ไปยัง cloud platform

### 14) Testing and Debugging in Production
- เขียน unit tests และ API tests
- ใช้ Jest และ Supertest
- เพิ่ม logging, error handling และ health check
- เตรียมระบบให้ตรวจสอบปัญหาใน production ได้ง่าย

### 15) Project Structure and Best Practices
- ออกแบบ project structure แบบ production-ready
- แยก routes, controllers, services, models, middleware
- ใช้ naming conventions ที่สม่ำเสมอ
- ทำ centralized error handling และรองรับ scalability

---

## Recommended Learning Sequence
```text
Node Basics
→ Setup
→ Modules / npm
→ File System / JSON / CLI
→ Debugging
→ Async Programming
→ HTTP Requests
→ Express Web Server
→ HTML + Templating
→ REST API Design
→ Database
→ Authentication
→ Deployment
→ Testing
→ Project Structure
```

---

## Core Skills You Will Gain
- เขียน Node.js script และ backend ได้
- จัดโครงสร้างโปรเจกต์อย่างเป็นระบบ
- สร้าง REST API ด้วย Express
- เชื่อม MongoDB และจัดการข้อมูลแบบ CRUD
- ทำระบบ login / token auth
- deploy และดูแลระบบ production ได้
- เขียน tests และ debug ได้อย่างมีหลักการ

---

## Final Outcome
เมื่อเรียนครบ Lesson 1–15 คุณจะสามารถ:
- สร้าง Node.js backend project ได้ตั้งแต่ต้นจน deploy
- วางโครงสร้างระบบสำหรับงานจริง
- ต่อฐานข้อมูลและระบบ auth ได้
- ทำ API สำหรับ dashboard, web app และ internal tools ได้
- พัฒนาต่อยอดสู่ GitHub workflow, CI/CD และ AI-assisted development ได้

---

## Suggested Next Step
ต่อยอดไปยัง:
- Git / GitHub workflow
- CI/CD automation
- Render / cloud deployment
- AI coding workflow
- real-world project portfolio
