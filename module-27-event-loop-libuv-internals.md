# Module 27: Event Loop and libuv Internals

> Understanding scheduling, asynchronous I/O and responsiveness in Node.js

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะอธิบาย event loop phases, microtasks, libuv thread pool, blocking behavior และแนวทางป้องกัน event-loop starvation ได้

## 1. Runtime mental model

```text
JavaScript main thread
  ↕
Node.js APIs
  ↕
libuv event loop / OS async I/O / worker pool
```

JavaScript callback จะกลับมาทำงานบน main thread เมื่อ event loop จัดคิวให้

## 2. Event loop phases

ภาพรวมเชิงแนวคิด:

```text
timers
  → pending callbacks
  → idle/prepare
  → poll
  → check
  → close callbacks
```

รายละเอียดภายในอาจเปลี่ยนตาม Node.js และ libuv version จึงควรยึด official documentation เป็นหลัก

## 3. Microtasks

Promise reactions และ `queueMicrotask()` ทำงานก่อน event loop เดินไปยัง phase ถัดไปหลัง JavaScript stack ว่าง

```js
console.log("A");

setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
queueMicrotask(() => console.log("microtask"));

console.log("B");
```

ลำดับโดยทั่วไป:

```text
A
B
promise
microtask
timeout
```

## 4. process.nextTick

```js
process.nextTick(() => {
  console.log("next tick");
});
```

`process.nextTick()` มี priority สูงและอาจทำให้ I/O ไม่ได้รับโอกาสหากเรียกต่อเนื่องจำนวนมาก ควรใช้เท่าที่จำเป็น

## 5. libuv worker pool

งานบางชนิดใช้ worker pool เช่น:

- filesystem operations บางส่วน
- DNS บาง API
- compression
- cryptographic operations บางชนิด

Worker pool ไม่ได้หมายความว่า JavaScript ทั้งหมดทำงานขนานโดยอัตโนมัติ

## 6. Blocking example

```js
import { pbkdf2Sync } from "node:crypto";

// ตัวอย่างเพื่อแสดง blocking เท่านั้น ไม่ควรใช้ใน request handler
pbkdf2Sync("password", "salt", 100_000, 64, "sha512");
```

การใช้ synchronous CPU-heavy API ใน HTTP handler จะทำให้ request อื่นรอ

## 7. Event-loop delay measurement

```js
import { monitorEventLoopDelay } from "node:perf_hooks";

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  console.log({
    meanMs: histogram.mean / 1e6,
    maxMs: histogram.max / 1e6,
  });
  histogram.reset();
}, 5_000);
```

## 8. Best practices

- หลีกเลี่ยง synchronous I/O ใน request path
- แบ่ง loop ขนาดใหญ่เป็นช่วงหรือใช้ worker threads
- จำกัด concurrency ของงานหนัก
- monitor event-loop delay และ latency percentile
- ใช้ `setImmediate()` เมื่อจำเป็นต้องคืน control ให้ event loop

## Workshop

สร้าง HTTP server ที่มี endpoint CPU-heavy จากนั้น:

1. วัด latency ก่อนแก้ไข
2. ตรวจ event-loop delay
3. ย้ายงานไป worker thread
4. เปรียบเทียบ throughput และ responsiveness

## Checklist

- [ ] อธิบาย event loop phases ได้
- [ ] แยก microtask, nextTick, timer และ immediate ได้
- [ ] อธิบายบทบาทของ libuv worker pool ได้
- [ ] ตรวจ event-loop delay ได้
- [ ] ระบุ blocking code ใน request path ได้

## Official references

- <https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick>
- <https://nodejs.org/api/perf_hooks.html>
- <https://docs.libuv.org/>
