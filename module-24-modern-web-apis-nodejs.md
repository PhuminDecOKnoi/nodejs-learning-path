# Module 24: Modern Web APIs in Node.js

> Browser-compatible APIs for server-side JavaScript

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะใช้ Web-standard APIs ใน Node.js ได้อย่างปลอดภัยและเข้าใจจุดที่แตกต่างจาก browser runtime

## 1. Why Web APIs matter

Node.js รองรับ API มาตรฐานเว็บมากขึ้น ทำให้สามารถเขียนโค้ดที่พกพาระหว่าง browser, edge runtime และ server ได้ง่ายขึ้น

หัวข้อสำคัญ:

- `fetch`
- `Request` และ `Response`
- `Headers`
- `FormData`
- `Blob` และ `File`
- `AbortController`
- Web Crypto API
- Web Streams API
- `BroadcastChannel`

## 2. fetch with timeout

```js
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5_000);

try {
  const response = await fetch("https://example.com/api/employees", {
    signal: controller.signal,
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
} finally {
  clearTimeout(timeout);
}
```

## 3. Headers, Request and Response

```js
const headers = new Headers({
  "content-type": "application/json",
});

const request = new Request("https://example.com/api", {
  method: "POST",
  headers,
  body: JSON.stringify({ name: "Ada" }),
});

console.log(request.method);
```

## 4. FormData and File

```js
const form = new FormData();
const file = new File(["employee_id,name\n1,Ada"], "employees.csv", {
  type: "text/csv",
});

form.append("document", file);

await fetch("https://example.com/upload", {
  method: "POST",
  body: form,
});
```

## 5. Web Crypto API

```js
const bytes = new TextEncoder().encode("important-data");
const digest = await crypto.subtle.digest("SHA-256", bytes);
const hex = Buffer.from(digest).toString("hex");

console.log(hex);
```

Web Crypto เหมาะกับมาตรฐานเว็บและงาน cryptographic primitives แต่ต้องใช้ algorithm และ key management อย่างถูกต้อง

## 6. BroadcastChannel

```js
const channel = new BroadcastChannel("system-events");

channel.onmessage = (event) => {
  console.log("received:", event.data);
};

channel.postMessage({ type: "CACHE_INVALIDATED" });
```

ใช้สื่อสารระหว่าง contexts ภายใน process หรือ worker ที่รองรับ แต่ไม่ใช่ message broker สำหรับระบบกระจายหลายเครื่อง

## 7. Compatibility boundary

แม้ชื่อ API จะเหมือน browser แต่ environment ต่างกัน:

- ไม่มี DOM
- cookie jar ไม่ได้ทำงานเหมือน browser โดยอัตโนมัติ
- CORS เป็นข้อจำกัดของ browser ไม่ใช่ server-side fetch แบบเดียวกัน
- network trust boundary และ secret handling แตกต่างกัน

## Common mistakes

- ไม่ตรวจ `response.ok`
- ไม่กำหนด timeout หรือ cancellation
- โหลด response ทั้งหมดเข้าหน่วยความจำโดยไม่จำเป็น
- ใช้ Web Crypto โดยไม่มี key-management policy
- เข้าใจว่า server-side fetch จัดการ cookie อัตโนมัติเหมือน browser

## Workshop

สร้าง API client ที่มี:

1. configurable timeout
2. retry เฉพาะข้อผิดพลาดที่เหมาะสม
3. validation response schema
4. structured error
5. request correlation ID

## Checklist

- [ ] ใช้ fetch พร้อม timeout ได้
- [ ] ใช้ Request, Response และ Headers ได้
- [ ] สร้าง FormData และ File ได้
- [ ] ใช้ Web Crypto API อย่างระมัดระวัง
- [ ] อธิบาย browser/server runtime differences ได้

## Official references

- <https://nodejs.org/api/globals.html>
- <https://nodejs.org/api/webcrypto.html>
- <https://nodejs.org/api/webstreams.html>
