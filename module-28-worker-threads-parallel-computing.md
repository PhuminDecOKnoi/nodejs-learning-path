# Module 28: Worker Threads and Parallel Computing

> Moving CPU-bound work away from the main JavaScript thread

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะสามารถเลือกใช้ `worker_threads`, ส่งข้อความระหว่าง threads, จัดการ lifecycle และออกแบบ worker pool อย่างปลอดภัย

## 1. When to use worker threads

เหมาะกับงาน CPU-bound เช่น:

- image or document processing
- cryptographic calculation
- large data transformation
- simulation
- parsing หรือ compression ที่หนัก

ไม่จำเป็นสำหรับ asynchronous I/O ทั่วไป เพราะ Node.js และ libuv จัดการงานเหล่านั้นอยู่แล้ว

## 2. Basic worker

ไฟล์ `worker.js`:

```js
import { parentPort, workerData } from "node:worker_threads";

function fibonacci(value) {
  if (value < 2) return value;
  return fibonacci(value - 1) + fibonacci(value - 2);
}

const result = fibonacci(workerData.value);
parentPort.postMessage({ result });
```

ไฟล์ `main.js`:

```js
import { Worker } from "node:worker_threads";

function runWorker(value) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.js", import.meta.url), {
      workerData: { value },
    });

    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

console.log(await runWorker(40));
```

## 3. Structured clone and transfer lists

Messages are cloned by default. Large `ArrayBuffer` values can be transferred to avoid copying:

```js
worker.postMessage(buffer, [buffer]);
```

หลัง transfer ฝั่งผู้ส่งจะไม่สามารถใช้ buffer เดิมได้ตามปกติ

## 4. Shared memory

`SharedArrayBuffer` และ `Atomics` รองรับ shared-memory coordination แต่เพิ่มความซับซ้อนสูง ควรใช้เฉพาะเมื่อ measurement แสดงว่าจำเป็น

```js
const shared = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const counter = new Int32Array(shared);

Atomics.add(counter, 0, 1);
```

## 5. Worker pools

การสร้าง worker ใหม่ทุก request มี overhead ควรใช้ pool สำหรับงานที่เกิดซ้ำ

แนวคิดสำคัญ:

- กำหนดจำนวน worker ตาม CPU และ workload
- จำกัด queue length
- กำหนด timeout
- รองรับ cancellation
- เก็บ metrics ของ queue time และ execution time

## 6. Error and lifecycle handling

ต้องจัดการ:

- `message`
- `messageerror`
- `error`
- `exit`
- graceful shutdown
- resource limits

## Common mistakes

- ใช้ worker thread กับ I/O-bound task โดยไม่จำเป็น
- สร้าง worker ใหม่ไม่จำกัด
- ส่ง object ขนาดใหญ่จนเสียเวลา clone
- ไม่มี timeout หรือ queue limit
- ใช้ shared memory โดยไม่มี synchronization design

## Workshop

สร้าง worker pool สำหรับคำนวณรายงานขนาดใหญ่ โดยมี:

1. concurrency limit
2. queue limit
3. job timeout
4. structured error response
5. shutdown method
6. benchmark เทียบกับ main-thread execution

## Checklist

- [ ] แยก CPU-bound กับ I/O-bound ได้
- [ ] สร้างและสื่อสารกับ Worker ได้
- [ ] เข้าใจ structured clone และ transfer list
- [ ] อธิบายประโยชน์ของ worker pool ได้
- [ ] จัดการ error, timeout และ shutdown ได้

## Official references

- <https://nodejs.org/api/worker_threads.html>
- <https://nodejs.org/api/async_context.html>
- <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer>
