# Module 7: HTTP Requests and APIs

> Baseline: Node.js 24 LTS • Built-in `fetch` • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะส่ง HTTP request ด้วย built-in `fetch`, ตรวจ status/header, จัดการ timeout, parse JSON และออกแบบ error handling ที่เชื่อถือได้

## Built-in fetch

Node.js รุ่นปัจจุบันมี standards-based `fetch()` ในตัว จึงไม่จำเป็นต้องติดตั้ง `node-fetch` สำหรับกรณีพื้นฐาน

```js
const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const user = await response.json();
console.log(user);
```

`fetch()` จะ reject เมื่อเกิด network error แต่ HTTP 404/500 ไม่ถือว่าเป็น rejected Promise จึงต้องตรวจ `response.ok`

## Query parameters

```js
const url = new URL("https://example.com/search");
url.searchParams.set("q", "node.js");
url.searchParams.set("limit", "10");

const response = await fetch(url);
```

## POST JSON

```js
const response = await fetch("https://example.com/api/users", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "accept": "application/json"
  },
  body: JSON.stringify({ name: "Phumin" })
});

if (!response.ok) {
  const detail = await response.text();
  throw new Error(`Request failed: ${response.status} ${detail}`);
}
```

## Timeout and cancellation

```js
const response = await fetch("https://example.com/api", {
  signal: AbortSignal.timeout(5_000)
});
```

กำหนด timeout เสมอสำหรับ external service และอย่า retry request แบบไม่จำกัด

## HTTP client checklist

- validate URL และ input
- กำหนด timeout
- ตรวจ status code
- จำกัด response size เมื่อข้อมูลอาจมีขนาดใหญ่
- อย่า log authorization header หรือ token
- retry เฉพาะ error ที่เหมาะสมและใช้ backoff
- ระวัง SSRF เมื่อตัวผู้ใช้กำหนดปลายทาง URL ได้

## Native HTTP module

`node:http` และ `node:https` ยังสำคัญสำหรับการเรียน protocol ระดับต่ำและการสร้าง server แต่ application ทั่วไปควรเริ่มจาก `fetch()` สำหรับ outbound request

## Checklist

- [ ] ใช้ built-in `fetch()` ได้
- [ ] ตรวจ `response.ok` และ status code ได้
- [ ] ส่ง JSON พร้อม headers ได้
- [ ] ใช้ URL/URLSearchParams ได้
- [ ] กำหนด timeout และจัดการ AbortError ได้

## Official references

- Globals/fetch: <https://nodejs.org/docs/latest-v24.x/api/globals.html#fetch>
- HTTP: <https://nodejs.org/docs/latest-v24.x/api/http.html>
- URL: <https://nodejs.org/docs/latest-v24.x/api/url.html>
