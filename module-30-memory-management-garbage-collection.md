# Module 30: Memory Management and Garbage Collection

> Understanding heap usage, leaks and garbage collection in Node.js

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะอธิบาย stack, heap, garbage collection, memory leak patterns และวิธีตรวจสอบปัญหาหน่วยความจำใน production ได้

## 1. Memory model overview

```text
Stack        → function frames และ local execution state
Heap         → objects, arrays, closures และ dynamic data
External     → Buffer และ native allocations บางส่วน
RSS          → memory ทั้งหมดที่ process ใช้
```

ตรวจสถานะเบื้องต้น:

```js
console.log(process.memoryUsage());
```

ค่าที่พบบ่อย:

- `rss`
- `heapTotal`
- `heapUsed`
- `external`
- `arrayBuffers`

## 2. Garbage collection

V8 ใช้ generational garbage collection โดยแบ่ง object ตามอายุและรูปแบบการใช้งาน

แนวคิดสำคัญ:

- object อายุสั้นมักอยู่ใน young generation
- object ที่ยังถูกอ้างอิงต่อเนื่องอาจถูกเลื่อนไป old generation
- garbage collector เก็บ object ที่ไม่สามารถเข้าถึงได้จาก root references

## 3. Common leak patterns

### Unbounded cache

```js
const cache = new Map();

export function remember(key, value) {
  cache.set(key, value); // ไม่มี limit หรือ expiration
}
```

ควรเพิ่ม TTL, size limit หรือใช้ cache system ที่เหมาะสม

### Forgotten timers

```js
const timer = setInterval(() => {
  refreshData();
}, 60_000);

// ต้อง clearInterval(timer) เมื่อ component ปิดตัว
```

### Event listener accumulation

```js
emitter.on("data", handler);
```

หากสร้าง listener ซ้ำโดยไม่ remove อาจเกิด leak และ warning

### Closure retention

Closure อาจรักษาการอ้างอิง object ขนาดใหญ่ไว้นานกว่าที่ตั้งใจ

```js
function createHandler(largeDataset) {
  return () => largeDataset.length;
}
```

## 4. Heap snapshots

```bash
node --inspect app.js
```

จากนั้นใช้ DevTools เพื่อเก็บ heap snapshot และเปรียบเทียบ object retention ระหว่างช่วงเวลา

สามารถใช้ diagnostic report:

```bash
node --report-on-signal app.js
```

## 5. Tracking memory over time

```js
setInterval(() => {
  const usage = process.memoryUsage();

  console.log({
    rssMb: Math.round(usage.rss / 1024 / 1024),
    heapUsedMb: Math.round(usage.heapUsed / 1024 / 1024),
    externalMb: Math.round(usage.external / 1024 / 1024),
  });
}, 10_000);
```

การเพิ่มขึ้นช่วงสั้นไม่ใช่ leak เสมอ ต้องดูแนวโน้มหลัง GC และภายใต้ workload ที่ควบคุมได้

## 6. Resource cleanup

ใช้ `try...finally`, `AbortSignal`, explicit close methods และ disposable resources เมื่อ API รองรับ

```js
const connection = await database.connect();

try {
  await connection.query("SELECT 1");
} finally {
  await connection.close();
}
```

## 7. Production guidance

- กำหนด memory limit ให้เหมาะกับ container
- monitor RSS, heap usage, GC pauses และ restart count
- ทดสอบ workload ระยะยาว
- ใช้ streaming สำหรับข้อมูลขนาดใหญ่
- จำกัด cache, queue และ in-memory session
- เก็บ heap snapshot อย่างระมัดระวัง เพราะอาจมีข้อมูลสำคัญ

## Common mistakes

- บังคับ GC เพื่อแก้ leak โดยไม่แก้ root cause
- ดูเฉพาะ `heapUsed` และละเลย RSS/external memory
- เก็บ heap snapshot ใน production โดยไม่คำนึงถึงข้อมูลลับ
- เพิ่ม memory limit แทนการแก้ retention
- สรุปว่า memory สูงคือ leak โดยไม่ดูแนวโน้มหลัง GC

## Workshop

สร้าง application จำลอง memory leak แล้วดำเนินการ:

1. เก็บ baseline memory
2. ส่ง workload หลายรอบ
3. เก็บ heap snapshots
4. หา retaining path
5. แก้ unbounded collection
6. ยืนยันผลด้วยการทดสอบซ้ำ

## Checklist

- [ ] อธิบาย stack, heap, RSS และ external memory ได้
- [ ] เข้าใจหลัก generational GC
- [ ] ระบุ leak patterns ที่พบบ่อยได้
- [ ] ใช้ memory metrics และ heap snapshots ได้
- [ ] ออกแบบ cleanup และ resource limits ได้

## Official references

- <https://nodejs.org/api/process.html#processmemoryusage>
- <https://nodejs.org/api/report.html>
- <https://nodejs.org/en/learn/diagnostics/memory>
- <https://v8.dev/blog/trash-talk>
