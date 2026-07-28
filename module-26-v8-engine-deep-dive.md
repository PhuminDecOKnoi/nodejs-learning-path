# Module 26: V8 Engine Deep Dive

> How JavaScript is parsed, optimized and executed inside Node.js

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะอธิบายเส้นทางตั้งแต่ source code ไปจนถึง machine code, hidden classes, inline caches, deoptimization และผลกระทบต่อ performance ได้

## 1. Execution pipeline

```text
JavaScript source
  → Parsing
  → Abstract Syntax Tree
  → Bytecode
  → Baseline execution
  → Optimizing compiler
  → Optimized machine code
```

Node.js ใช้ V8 เป็น JavaScript engine แต่ I/O, event loop และ system integration เป็นหน้าที่ของ Node.js และ libuv

## 2. Hidden classes

Object ที่มีโครงสร้าง property สม่ำเสมอช่วยให้ engine optimize ได้ง่ายขึ้น

```js
function createEmployee(id, name) {
  return {
    id,
    name,
    active: true,
  };
}
```

ควรสร้าง object shape ให้คงที่แทนการเพิ่ม property แบบไม่แน่นอนในภายหลัง

## 3. Inline caches

V8 จดจำรูปแบบการเข้าถึง property ที่เกิดซ้ำ หาก input shape เปลี่ยนหลายแบบเกินไป call site อาจเปลี่ยนจาก monomorphic เป็น polymorphic หรือ megamorphic และ optimize ได้ยากขึ้น

```js
function getName(employee) {
  return employee.name;
}
```

## 4. Deoptimization

โค้ดที่เคยถูก optimize อาจกลับไปใช้ execution path ที่ช้าลงเมื่อ assumption เดิมไม่เป็นจริง

สาเหตุที่พบบ่อย:

- object shape เปลี่ยนอย่างไม่คาดคิด
- value type เปลี่ยนหลายรูปแบบ
- dynamic behavior มากเกินไป
- Proxy หรือ metaprogramming ใน hot path

## 5. Measuring performance

```js
import { performance } from "node:perf_hooks";

const start = performance.now();

for (let index = 0; index < 1_000_000; index += 1) {
  Math.sqrt(index);
}

const duration = performance.now() - start;
console.log(`duration: ${duration.toFixed(2)} ms`);
```

Benchmark ต้องมี warm-up, หลายรอบ และควบคุม environment

## 6. CPU profiling

```bash
node --cpu-prof app.js
```

ไฟล์ profile ที่ได้สามารถเปิดใน Chrome DevTools หรือเครื่องมือที่รองรับ

## 7. Performance guidance

- วัดก่อน optimize
- เน้น algorithm และ data structure ก่อน micro-optimization
- รักษา object shape ใน hot path ให้คงที่
- แยก CPU-bound work ไป worker threads เมื่อเหมาะสม
- ตรวจ regression ด้วย benchmark ที่ทำซ้ำได้

## Common mistakes

- เชื่อ benchmark รอบเดียว
- optimize syntax เล็กน้อยแต่ไม่แก้ algorithm
- ใช้ undocumented V8 behavior เป็น contract
- สรุปว่าโค้ดเร็วเพราะรันบนเครื่องตนเองเร็ว

## Workshop

สร้าง benchmark เปรียบเทียบ:

1. object shape คงที่กับเปลี่ยนแปลง
2. array traversal สองแนวทาง
3. JSON serialization ขนาดต่างกัน
4. main thread กับ worker thread สำหรับ CPU-bound task

## Checklist

- [ ] อธิบาย parsing, bytecode และ optimization ได้
- [ ] เข้าใจ hidden classes และ inline caches
- [ ] อธิบาย deoptimization ได้
- [ ] ใช้ `node:perf_hooks` และ CPU profiler ได้
- [ ] แยก microbenchmark ออกจาก production performance ได้

## Official references

- <https://v8.dev/docs>
- <https://nodejs.org/api/perf_hooks.html>
- <https://nodejs.org/en/learn/getting-started/the-v8-javascript-engine>
