# Module 1: Introduction to Node.js

> Baseline: Node.js 24 LTS (Krypton) • Updated: 2026-07-26

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะอธิบายบทบาทของ Node.js, event loop, libuv, worker pool และกรณีใช้งานที่เหมาะสมได้

## Node.js คืออะไร

Node.js คือ JavaScript runtime แบบ open source และ cross-platform ซึ่งใช้ V8 เป็น JavaScript engine และใช้ libuv จัดการ event loop, asynchronous I/O และ thread pool บางส่วน

Node.js เหมาะกับ:

- REST/GraphQL API และ backend-for-frontend
- real-time application เช่น chat และ notification
- CLI, automation และ developer tooling
- streaming, proxy และงาน I/O-bound

Node.js ไม่ได้หมายความว่า “ทำงานได้เพียง thread เดียวทั้งหมด” ตัว JavaScript โดยปกติรันบน main thread แต่ runtime สามารถใช้ operating-system APIs, libuv worker pool, `worker_threads` และ child processes ตามลักษณะงาน

## LTS กับ Current

- ใช้ **Node.js 24 LTS** สำหรับหลักสูตรและ production baseline
- Node.js 26 เป็นสาย Current ในเดือนกรกฎาคม 2026 และจะเข้าสู่ LTS ภายหลัง
- production ควรใช้สาย LTS ที่ยังได้รับ security update

ตรวจสอบเวอร์ชัน:

```bash
node --version
npm --version
```

## โปรแกรมแรก

สร้าง `app.js`:

```js
console.log("Hello Node.js 24 LTS");
```

รัน:

```bash
node app.js
```

## Built-in module แบบ ESM

หลักสูตรนี้ใช้ ECMAScript Modules (ESM) เป็นแนวทางหลัก:

```js
import os from "node:os";

console.log({
  platform: os.platform(),
  logicalCpuCount: os.availableParallelism(),
});
```

ให้กำหนดใน `package.json`:

```json
{
  "type": "module"
}
```

CommonJS (`require`, `module.exports`) ยังพบได้ในโครงการเดิมและจะอธิบายเพื่อรองรับการบำรุงรักษาระบบเก่า

## Mental model

```text
JavaScript → V8 → Node.js APIs → libuv / OS → callback, Promise หรือ event
```

Event loop ช่วยประสานงาน asynchronous callbacks แต่ไม่ได้ทำให้ CPU-bound JavaScript กลายเป็นงานขนานโดยอัตโนมัติ

## Checklist

- [ ] แยก Node.js ออกจาก browser JavaScript ได้
- [ ] อธิบาย V8, libuv และ event loop ได้
- [ ] เข้าใจข้อจำกัดของคำว่า single-threaded
- [ ] แยก LTS ออกจาก Current ได้
- [ ] รันไฟล์ JavaScript ด้วย Node.js ได้

## Official references

- Node.js documentation: <https://nodejs.org/docs/latest-v24.x/api/>
- Node.js release schedule: <https://github.com/nodejs/release>
- Node.js license: MIT
