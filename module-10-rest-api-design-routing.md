# Module 10: REST API Design and Routing

> Baseline: Node.js 24 LTS • Express 5.x • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะออกแบบ resource-oriented API, ใช้ HTTP semantics, แยก router/controller/service และส่ง error response อย่างสม่ำเสมอได้

## Resource-oriented design

ใช้คำนามแทนการตั้ง endpoint แบบคำสั่ง:

```text
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

หลีกเลี่ยง `/getUsers`, `/createUser` เมื่อ HTTP method สื่อความหมายได้อยู่แล้ว

## Router example

```js
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await req.services.user.list({
    limit: Math.min(Number(req.query.limit ?? 20), 100)
  });
  res.json({ data: users });
});

userRouter.post("/", async (req, res) => {
  const user = await req.services.user.create(req.body);
  res.status(201)
    .location(`/api/v1/users/${user.id}`)
    .json({ data: user });
});
```

Mount router:

```js
app.use("/api/v1/users", userRouter);
```

## Status codes

- `200 OK`: อ่านหรือแก้ไขสำเร็จ
- `201 Created`: สร้าง resource สำเร็จ
- `204 No Content`: สำเร็จโดยไม่มี response body
- `400 Bad Request`: request ผิดรูปแบบ
- `401 Unauthorized`: ยังไม่ได้ยืนยันตัวตน
- `403 Forbidden`: ยืนยันตัวตนแล้วแต่ไม่มีสิทธิ์
- `404 Not Found`: ไม่พบ resource
- `409 Conflict`: ขัดแย้งกับ state ปัจจุบัน
- `422 Unprocessable Content`: validation ไม่ผ่าน
- `429 Too Many Requests`: เกิน rate limit
- `500 Internal Server Error`: ความผิดพลาดภายใน

## Validation and errors

อย่าใช้ข้อมูลใน `req.body`, `req.params`, `req.query` โดยไม่ validate

รูปแบบ error ที่สม่ำเสมอ:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "email", "message": "Invalid email" }
    ]
  }
}
```

ไม่ส่ง stack trace, SQL หรือข้อมูล secret ให้ client

## Pagination and filtering

```text
GET /api/v1/users?limit=20&cursor=abc&status=active
```

Cursor pagination เหมาะกับข้อมูลที่เพิ่มต่อเนื่องและลดปัญหารายการซ้ำ/หายเมื่อข้อมูลเปลี่ยนระหว่างหน้า

## API quality checklist

- version API อย่างมีเหตุผล
- ใช้ OpenAPI document เป็น contract
- จำกัด payload และ query size
- กำหนด idempotency สำหรับ operation สำคัญ
- ใช้ request ID และ structured logging
- มี health/readiness endpoint

## Checklist

- [ ] ออกแบบ endpoint แบบ resource-oriented ได้
- [ ] เลือก HTTP method/status code ได้ถูกต้อง
- [ ] แยก router จาก business logic ได้
- [ ] validate input และกำหนด error contract ได้
- [ ] ออกแบบ pagination/filtering ได้

## References

- Express routing: <https://expressjs.com/en/guide/routing.html>
- HTTP semantics: <https://www.rfc-editor.org/rfc/rfc9110>
- OpenAPI: <https://spec.openapis.org/oas/latest.html>
