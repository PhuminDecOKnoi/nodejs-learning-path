# Module 8: Web Servers with Express 5

> Baseline: Node.js 24 LTS • Express 5.x • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะสร้าง Express 5 server, ใช้ middleware, route parameters, JSON parsing และ centralized error handling ได้

## Installation

```bash
npm install express@5
```

`package.json`:

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "node --watch src/app.js"
  }
}
```

## Minimal server

```js
import express from "express";

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

app.use(express.json({ limit: "100kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
```

Express มี `express.json()` และ `express.urlencoded()` ในตัว จึงไม่ต้องใช้ `body-parser` สำหรับกรณีทั่วไป

## Async route and error flow

Express 5 ส่ง rejected Promise จาก async handler ไปยัง error middleware ได้:

```js
app.get("/reports/:id", async (req, res) => {
  const report = await reportService.findById(req.params.id);

  if (!report) {
    const error = new Error("Report not found");
    error.status = 404;
    throw error;
  }

  res.json(report);
});
```

Error middleware ต้องมี 4 parameters และวางท้าย routes:

```js
app.use((error, req, res, next) => {
  const status = Number.isInteger(error.status) ? error.status : 500;
  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : error.message
  });
});
```

อย่าส่ง stack trace หรือข้อมูลภายในให้ client ใน production

## Middleware order

```text
security/request-id → body parser → logging → routes → 404 → error handler
```

404 handler:

```js
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
```

## Production notes

- ตั้ง `PORT` ผ่าน environment
- validate request input
- จำกัด body size
- กำหนด reverse proxy/trust proxy ให้ตรง environment
- รองรับ graceful shutdown
- อย่าใช้ in-memory session store ใน production แบบหลาย instance

## Checklist

- [ ] สร้าง Express 5 server ได้
- [ ] ใช้ `express.json()` ได้
- [ ] แยก route และ middleware ได้
- [ ] เข้าใจ async error handling ของ Express 5
- [ ] มี 404 และ centralized error handler

## Official references

- Express 5 API: <https://expressjs.com/en/5x/api.html>
- Express migration guide: <https://expressjs.com/en/guide/migrating-5.html>
