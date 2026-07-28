# Module 25: URL, URLSearchParams and URLPattern

> Standards-based URL parsing and routing design

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะสามารถ parse, validate, construct และ match URL โดยใช้ Web-standard APIs ได้อย่างถูกต้องและปลอดภัย

## 1. URL API

```js
const url = new URL("https://example.com/employees?department=HR&page=2");

console.log(url.protocol);
console.log(url.hostname);
console.log(url.pathname);
console.log(url.searchParams.get("department"));
```

หลีกเลี่ยงการ parse URL ด้วย string splitting เพราะรองรับ encoding, port, query และ edge cases ได้ไม่ครบ

## 2. URLSearchParams

```js
const params = new URLSearchParams();
params.set("department", "HR");
params.set("page", "2");

console.log(params.toString());
```

ตรวจค่าก่อนใช้งาน:

```js
const page = Number.parseInt(params.get("page") ?? "1", 10);

if (!Number.isInteger(page) || page < 1) {
  throw new TypeError("page ต้องเป็นจำนวนเต็มตั้งแต่ 1 ขึ้นไป");
}
```

## 3. File URLs

```js
import { readFile } from "node:fs/promises";

const fileUrl = new URL("./data/config.json", import.meta.url);
const content = await readFile(fileUrl, "utf8");
```

แนวทางนี้ portable กว่าการประกอบ path จาก current working directory

## 4. URLPattern

`URLPattern` ใช้ match URL ด้วย pattern ที่อ่านง่าย

```js
const pattern = new URLPattern({ pathname: "/employees/:id" });
const result = pattern.exec("https://example.com/employees/42");

console.log(result?.pathname.groups.id);
```

ก่อนใช้ใน production ให้ตรวจ availability ใน Node.js baseline และเตรียม fallback เมื่อจำเป็น

## 5. Safe redirect validation

```js
function validateRedirect(value, origin) {
  const target = new URL(value, origin);

  if (target.origin !== origin) {
    throw new Error("ไม่อนุญาตให้ redirect ไปยัง external origin");
  }

  return target;
}
```

## Common mistakes

- parse URL ด้วย `split("?")`
- เชื่อค่าจาก query string โดยไม่ validate
- ใช้ user input สร้าง redirect URL โดยตรง
- สับสนระหว่าง filesystem path กับ URL
- สมมติว่า URLPattern รองรับใน runtime ทุกเวอร์ชัน

## Workshop

สร้าง router ขนาดเล็กที่รองรับ:

1. `/employees/:id`
2. query validation
3. safe redirect
4. route-not-found response
5. unit tests สำหรับ encoded URL และ malformed input

## Checklist

- [ ] ใช้ URL และ URLSearchParams ได้
- [ ] ใช้ file URL กับ Node.js APIs ได้
- [ ] validate query parameters ได้
- [ ] เข้าใจประโยชน์และข้อจำกัดของ URLPattern
- [ ] ป้องกัน open redirect ได้

## Official references

- <https://nodejs.org/api/url.html>
- <https://developer.mozilla.org/docs/Web/API/URL>
- <https://developer.mozilla.org/docs/Web/API/URLPattern>
