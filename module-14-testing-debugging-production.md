# Module 14: Testing and Debugging in Production

> Baseline: Node.js 24 LTS • Built-in test runner • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะเขียน unit/integration tests ด้วย `node:test`, ตรวจ coverage, ทดสอบ HTTP API และวิเคราะห์ production incident จาก logs, metrics และ diagnostic reports ได้

## Built-in test runner

Node.js มี test runner ในตัว:

```js
import test from "node:test";
import assert from "node:assert/strict";

function add(a, b) {
  return a + b;
}

test("add returns the sum", () => {
  assert.equal(add(2, 3), 5);
});
```

รัน:

```bash
node --test
```

Watch และ coverage:

```bash
node --test --watch
node --test --experimental-test-coverage
```

ตรวจเอกสารเวอร์ชันที่ใช้งานก่อนนำ experimental flag ไปใช้ใน production workflow

## Async test

```js
import test from "node:test";
import assert from "node:assert/strict";

test("loads user", async () => {
  const user = await userService.findById("u-1");
  assert.equal(user.id, "u-1");
});
```

## Test pyramid

- **Unit:** function/service แยกส่วน รวดเร็ว
- **Integration:** database, filesystem, queue หรือ API boundary
- **End-to-end:** user flow สำคัญผ่านระบบจริง

ไม่ควรพึ่ง E2E อย่างเดียว เพราะช้าและวิเคราะห์ root cause ยาก

## HTTP integration testing

แนวทางที่ทดสอบง่ายคือ export app โดยไม่ `listen()` ใน module เดียวกัน:

```js
// app.js
export const app = express();

// server.js
import { app } from "./app.js";
app.listen(process.env.PORT ?? 3000);
```

จากนั้นใช้ HTTP test client เช่น Supertest หรือสร้าง temporary server ใน test

## Production debugging

ใช้สามสัญญาณหลัก:

1. **Logs:** structured event, request ID, error cause
2. **Metrics:** rate, errors, duration, saturation
3. **Traces:** request flow ข้าม service

ห้าม debug production ด้วยการแก้ source สดบน server ควร reproduce, patch ผ่าน version control, test และ deploy artifact ใหม่

## Diagnostic tools

```bash
node --trace-warnings src/server.js
node --report-on-fatalerror src/server.js
node --cpu-prof src/server.js
node --heap-prof src/server.js
```

CPU/heap profiles อาจมีข้อมูลระบบหรือข้อมูลผู้ใช้ ต้องจัดเก็บและแชร์อย่างระมัดระวัง

## Incident workflow

```text
Detect → Triage → Mitigate → Diagnose → Fix → Verify → Post-incident review
```

แยก mitigation เช่น rollback/disable feature ออกจาก permanent fix และเพิ่ม regression test หลังเหตุการณ์

## Checklist

- [ ] เขียน unit และ async tests ด้วย `node:test` ได้
- [ ] แยก unit/integration/E2E ได้
- [ ] ทดสอบ Express app โดยแยก app/server ได้
- [ ] ใช้ logs, metrics และ traces วิเคราะห์ปัญหาได้
- [ ] สร้าง CPU/heap/diagnostic report อย่างปลอดภัยได้

## Official references

- Test runner: <https://nodejs.org/docs/latest-v24.x/api/test.html>
- Diagnostics: <https://nodejs.org/en/learn/diagnostics>
- Report API: <https://nodejs.org/docs/latest-v24.x/api/report.html>
