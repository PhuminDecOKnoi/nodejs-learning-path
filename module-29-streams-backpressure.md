# Module 29: Streams and Backpressure

> Processing large data efficiently without loading everything into memory

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะสามารถใช้ Readable, Writable, Duplex, Transform, pipeline และ Web Streams พร้อมเข้าใจ backpressure และ error propagation ได้

## 1. Why streams matter

Stream ช่วยประมวลผลข้อมูลเป็นชิ้นเล็ก ๆ เหมาะกับ:

- ไฟล์ขนาดใหญ่
- HTTP request/response bodies
- compression
- log processing
- database export
- media processing

## 2. Reading a file as a stream

```js
import { createReadStream } from "node:fs";

const stream = createReadStream("./large-file.csv", {
  encoding: "utf8",
});

stream.on("data", (chunk) => {
  console.log(`received ${chunk.length} characters`);
});

stream.on("error", (error) => {
  console.error(error);
});
```

Event-based consumption ใช้ได้ แต่ `pipeline()` ช่วยจัดการ error และ cleanup ได้ปลอดภัยกว่า

## 3. pipeline

```js
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

await pipeline(
  createReadStream("./report.csv"),
  createGzip(),
  createWriteStream("./report.csv.gz"),
);
```

หาก stage ใดล้มเหลว `pipeline()` จะ propagate error และทำลาย streams ที่เกี่ยวข้อง

## 4. Transform stream

```js
import { Transform } from "node:stream";

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    try {
      callback(null, chunk.toString().toUpperCase());
    } catch (error) {
      callback(error);
    }
  },
});
```

## 5. Backpressure

Backpressure เกิดเมื่อ producer ส่งข้อมูลเร็วกว่าที่ consumer ประมวลผลได้

```js
const canContinue = writable.write(chunk);

if (!canContinue) {
  await new Promise((resolve) => writable.once("drain", resolve));
}
```

การใช้ `pipe()` หรือ `pipeline()` จะช่วยประสาน backpressure โดยอัตโนมัติในกรณีทั่วไป

## 6. Async iteration

```js
import { createReadStream } from "node:fs";

const stream = createReadStream("./audit.log", {
  encoding: "utf8",
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

## 7. Web Streams interoperability

Node.js รองรับการแปลงระหว่าง Node streams และ Web Streams ในหลายกรณี

```js
import { Readable } from "node:stream";

const webStream = Readable.toWeb(nodeReadable);
const nodeStream = Readable.fromWeb(webReadable);
```

ตรวจชนิดข้อมูลและ compatibility ของ runtime ก่อนนำไปใช้

## 8. Object mode

```js
import { Transform } from "node:stream";

const selectActive = new Transform({
  objectMode: true,
  transform(employee, encoding, callback) {
    if (employee.active) {
      callback(null, employee);
      return;
    }

    callback();
  },
});
```

Object mode มี overhead มากกว่า byte streams จึงควรใช้เมื่อ model การประมวลผลต้องการ object จริง ๆ

## Common mistakes

- โหลดไฟล์ใหญ่ด้วย `readFile()` โดยไม่ประเมิน memory
- ไม่จัดการ stream error
- ใช้ `.write()` ต่อเนื่องโดยไม่สน backpressure
- ผสม object mode กับ byte mode โดยไม่ตั้งค่า
- ใช้ event listeners หลายจุดจน cleanup ยาก

## Workshop

สร้าง CSV processing pipeline ที่:

1. อ่านไฟล์แบบ stream
2. parse ทีละ record
3. validate schema
4. แยก valid และ invalid records
5. เขียนผลลัพธ์สองไฟล์
6. เก็บ metrics จำนวนแถวและระยะเวลา

## Checklist

- [ ] แยก Readable, Writable, Duplex และ Transform ได้
- [ ] ใช้ `pipeline()` ได้
- [ ] อธิบาย backpressure ได้
- [ ] consume stream ด้วย async iteration ได้
- [ ] เลือกใช้ Node Streams กับ Web Streams ได้เหมาะสม

## Official references

- <https://nodejs.org/api/stream.html>
- <https://nodejs.org/en/learn/modules/backpressuring-in-streams>
- <https://nodejs.org/api/webstreams.html>
