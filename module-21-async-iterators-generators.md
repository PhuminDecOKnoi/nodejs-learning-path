# Module 21: Async Iterators and Generators

> Baseline: Node.js 24 LTS • ESM-first • Updated: 2026-07-28

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะสามารถใช้ iterator, generator, async iterator และ `for await...of` เพื่อจัดการข้อมูลแบบตามลำดับและแบบ streaming ได้ พร้อมเข้าใจเรื่อง backpressure, cancellation และ error propagation

## 1. Iterator protocol

Iterator ต้องมี method `next()` ซึ่งคืน object รูปแบบ `{ value, done }`

```js
function createRangeIterator(start, end) {
  let current = start;

  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }

      return { value: undefined, done: true };
    },
  };
}

const iterator = createRangeIterator(1, 3);
console.log(iterator.next());
console.log(iterator.next());
```

## 2. Iterable protocol

Object ที่ iterable ต้องมี `[Symbol.iterator]()`

```js
const auditItems = {
  items: ["contract", "payroll", "time-record"],

  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  },
};

for (const item of auditItems) {
  console.log(item);
}
```

## 3. Generator function

Generator ช่วยสร้าง iterator ด้วย syntax ที่อ่านง่าย

```js
function* createSequence(start, end) {
  for (let current = start; current <= end; current += 1) {
    yield current;
  }
}

for (const value of createSequence(1, 5)) {
  console.log(value);
}
```

## 4. ส่งค่าเข้า generator

```js
function* approvalWorkflow() {
  const managerApproved = yield "รอผู้จัดการอนุมัติ";

  if (!managerApproved) {
    return "ยุติกระบวนการ";
  }

  const hrApproved = yield "รอ HR อนุมัติ";
  return hrApproved ? "อนุมัติครบถ้วน" : "HR ไม่อนุมัติ";
}

const workflow = approvalWorkflow();
console.log(workflow.next());
console.log(workflow.next(true));
console.log(workflow.next(true));
```

## 5. Async generator

```js
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function* streamAuditEvents() {
  const events = ["started", "checking", "completed"];

  for (const event of events) {
    await delay(20);
    yield { event, timestamp: new Date().toISOString() };
  }
}

for await (const event of streamAuditEvents()) {
  console.log(event);
}
```

## 6. อ่านไฟล์แบบ streaming

```js
import { createReadStream } from "node:fs";

const stream = createReadStream("./large-file.txt", {
  encoding: "utf8",
  highWaterMark: 64 * 1024,
});

for await (const chunk of stream) {
  console.log("received bytes:", Buffer.byteLength(chunk));
}
```

`for await...of` จะรอแต่ละ chunk ตามจังหวะของ stream จึงช่วยรักษา backpressure ได้ดีกว่าการอ่านไฟล์ทั้งหมดเข้าหน่วยความจำ

## 7. Pagination ด้วย async generator

```js
async function* fetchAllPages(fetchPage, signal) {
  let page = 1;

  while (true) {
    signal?.throwIfAborted();

    const result = await fetchPage(page, signal);

    for (const item of result.items) {
      yield item;
    }

    if (!result.nextPage) {
      return;
    }

    page = result.nextPage;
  }
}
```

ตัวอย่างใช้งาน:

```js
const controller = new AbortController();

for await (const item of fetchAllPages(fetchPage, controller.signal)) {
  console.log(item);
}
```

## 8. Error propagation

```js
async function* safeSource() {
  try {
    yield "first";
    throw new Error("source failed");
  } finally {
    console.log("cleanup completed");
  }
}

try {
  for await (const value of safeSource()) {
    console.log(value);
  }
} catch (error) {
  console.error(error.message);
}
```

## 9. Iterator helper design

ออกแบบ generator ให้ทำหน้าที่เดียว เช่น filter, transform หรือ pagination และหลีกเลี่ยงการผูก business logic หลายชั้นไว้ใน generator เดียว

```js
async function* mapAsync(source, transform) {
  for await (const value of source) {
    yield transform(value);
  }
}
```

## Common mistakes

- เก็บผลลัพธ์ทั้งหมดใน array ทั้งที่ควร stream
- ไม่จัดการ cancellation ด้วย `AbortSignal`
- ไม่ใช้ `finally` สำหรับ cleanup resource
- ทำงานหนักแบบขนานใน loop โดยไม่จำกัด concurrency
- เข้าใจผิดว่า async generator ทำให้ CPU-bound task เร็วขึ้น

## Workshop

สร้างระบบอ่านไฟล์ CSV ขนาดใหญ่แบบ streaming โดย:

1. อ่านข้อมูลทีละ chunk
2. แปลงแต่ละบรรทัดเป็น object
3. กรอง record ที่ไม่ผ่าน validation
4. รองรับ cancellation
5. สรุปจำนวน record ที่ผ่านและไม่ผ่าน

## Checklist

- [ ] อธิบาย iterator และ iterable protocol ได้
- [ ] เขียน generator function ได้
- [ ] ใช้ async generator และ `for await...of` ได้
- [ ] เข้าใจ backpressure และ memory efficiency
- [ ] จัดการ cancellation และ cleanup ได้

## Official references

- ECMAScript iteration: <https://tc39.es/ecma262/>
- MDN iteration protocols: <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols>
- Node.js streams: <https://nodejs.org/docs/latest-v24.x/api/stream.html>
- Node.js file system streams: <https://nodejs.org/docs/latest-v24.x/api/fs.html>
