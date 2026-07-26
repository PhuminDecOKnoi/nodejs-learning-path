# Module 6: Asynchronous Programming

> Baseline: Node.js 24 LTS • Promise/async–await first • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะอธิบาย event loop, microtask queue, callback, Promise, `async`/`await` และการยกเลิกงานด้วย `AbortController` ได้

## Synchronous vs asynchronous

Synchronous code ทำงานต่อเนื่องบน call stack ส่วน asynchronous API คืน control ให้ event loop และแจ้งผลภายหลัง

```js
console.log("A");
setTimeout(() => console.log("timer"), 0);
queueMicrotask(() => console.log("microtask"));
console.log("B");
```

ผลโดยทั่วไป:

```text
A
B
microtask
timer
```

Promise callbacks และ `queueMicrotask()` อยู่ใน microtask queue ซึ่งถูกประมวลผลก่อน timer phase ถัดไป

## Promise and async/await

```js
import { readFile } from "node:fs/promises";

async function loadUser() {
  const raw = await readFile("user.json", "utf8");
  return JSON.parse(raw);
}

try {
  const user = await loadUser();
  console.log(user);
} catch (error) {
  console.error("Load failed", error);
}
```

`async` function คืน Promise เสมอ และ `await` ใช้ได้ใน async function หรือ top-level ESM

## Parallel independent work

```js
const [profile, permissions] = await Promise.all([
  loadProfile(),
  loadPermissions()
]);
```

ใช้ `Promise.all()` เมื่อทุกงานต้องสำเร็จ หากต้องการผลทุกงานแม้บางงานล้มเหลว ใช้ `Promise.allSettled()`

## Cancellation and timeout

```js
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5_000);

try {
  const response = await fetch("https://example.com/api", {
    signal: controller.signal
  });
  console.log(await response.json());
} finally {
  clearTimeout(timeout);
}
```

## Event loop accuracy

- Node.js ไม่ได้ส่ง async operation ทุกชนิดไป “Web API” แบบ browser
- network I/O มักใช้ OS event notification
- file system, DNS บางรูปแบบ และ crypto บางงานใช้ libuv worker pool
- CPU-bound JavaScript ยัง block event loop ได้

สำหรับ CPU-heavy work ให้พิจารณา `worker_threads`, child process หรือ job queue

## Common mistakes

- ลืม `await`
- ใช้ `forEach(async () => ...)` แล้วคาดว่าจะรอครบ
- ทำงานอิสระแบบเรียงทีละงานแทน `Promise.all()`
- ไม่กำหนด timeout/cancellation
- กลืน error ด้วย `catch` ที่ไม่ log หรือไม่ rethrow

## Checklist

- [ ] อธิบาย callback, Promise และ async/await ได้
- [ ] แยก microtask ออกจาก timer ได้
- [ ] ใช้ `Promise.all()` อย่างถูกต้อง
- [ ] ใช้ AbortController เพื่อยกเลิกงานได้
- [ ] รู้ว่า CPU-bound work กระทบ event loop อย่างไร

## Official references

- Asynchronous context: <https://nodejs.org/docs/latest-v24.x/api/async_context.html>
- Timers: <https://nodejs.org/docs/latest-v24.x/api/timers.html>
- Worker threads: <https://nodejs.org/docs/latest-v24.x/api/worker_threads.html>
