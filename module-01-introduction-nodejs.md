# Module 1: Introduction to Node.js

> Production baseline: Node.js 24.18.0 LTS (Krypton) • Current evaluation: Node.js 26.5.0 • Audited: 2026-07-28

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะอธิบายบทบาทของ Node.js, event loop, libuv, worker pool และกรณีใช้งานที่เหมาะสมได้ รวมทั้งเลือกสาย Node.js ให้เหมาะกับ production และการทดลอง

## Node.js คืออะไร

Node.js คือ JavaScript runtime แบบ open source และ cross-platform ซึ่งใช้ V8 เป็น JavaScript engine และใช้ libuv จัดการ event loop, asynchronous I/O และ thread pool บางส่วน

Node.js เหมาะกับ:

- REST/GraphQL API และ backend-for-frontend
- real-time application เช่น chat และ notification
- CLI, automation และ developer tooling
- streaming, proxy และงาน I/O-bound

Node.js ไม่ได้หมายความว่า “ทำงานได้เพียง thread เดียวทั้งหมด” ตัว JavaScript โดยปกติรันบน main thread แต่ runtime สามารถใช้ operating-system APIs, libuv worker pool, `worker_threads` และ child processes ตามลักษณะงาน

## LTS กับ Current

- ใช้ **Node.js 24.18.0 LTS** สำหรับหลักสูตรและ production baseline
- ณ วันที่ 28 กรกฎาคม 2026 **Node.js 26.5.0** เป็นสาย Current ใช้สำหรับทดลองฟีเจอร์ใหม่และทดสอบ compatibility
- Node.js 26 ยังไม่ใช่ production baseline ของหลักสูตรจนกว่าจะเข้าสู่ LTS และผ่านการตรวจ dependency compatibility
- production ควรใช้สาย Active LTS หรือ Maintenance LTS ที่ยังได้รับ security update
- หลีกเลี่ยงการเริ่มโครงการใหม่ด้วย Node.js รุ่นที่เป็น EOL

ตรวจสอบเวอร์ชัน:

```bash
node --version
npm --version
```

Repository นี้กำหนด runtime ผ่าน `.nvmrc` และ `package.json#engines` เพื่อให้ผู้เรียนใช้สภาพแวดล้อมเดียวกัน

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

CommonJS (`require`, `module.exports`) ยังพบได้ในโครงการเดิมและจะอธิบายเพื่อรองรับการบำรุงรักษาระบบเก่า แต่ตัวอย่างใหม่ในหลักสูตรใช้ ESM เป็นค่าเริ่มต้น

## Mental model

```text
JavaScript → V8 → Node.js APIs → libuv / OS → callback, Promise หรือ event
```

Event loop ช่วยประสานงาน asynchronous callbacks แต่ไม่ได้ทำให้ CPU-bound JavaScript กลายเป็นงานขนานโดยอัตโนมัติ งาน CPU-bound ที่หนักควรพิจารณา `worker_threads`, child process หรือบริการแยกตามสถาปัตยกรรม

## Version-selection checklist

ก่อนเลือก Node.js ให้ตรวจ:

1. สถานะ LTS/Current/EOL
2. compatibility ของ framework และ native dependencies
3. security support window
4. CI matrix และ production image
5. release notes ของ major version

## Checklist

- [ ] แยก Node.js ออกจาก browser JavaScript ได้
- [ ] อธิบาย V8, libuv และ event loop ได้
- [ ] เข้าใจข้อจำกัดของคำว่า single-threaded
- [ ] แยก LTS, Current และ EOL ได้
- [ ] อธิบายเหตุผลที่หลักสูตรใช้ Node.js 24 LTS ได้
- [ ] รันไฟล์ JavaScript ด้วย Node.js ได้

## Official references

- Node.js 24 API documentation: <https://nodejs.org/docs/latest-v24.x/api/>
- Node.js current API documentation: <https://nodejs.org/api/>
- Node.js release schedule: <https://nodejs.org/en/about/previous-releases>
- Node.js license: MIT

ดูผลตรวจสอบรายบทเพิ่มเติมที่ [VERSION-AUDIT-2026-07-28.md](VERSION-AUDIT-2026-07-28.md)
