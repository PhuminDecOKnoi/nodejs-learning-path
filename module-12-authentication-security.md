# Module 12: Authentication and Security

> Baseline: Node.js 24 LTS • Express 5.x • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะอธิบาย authentication/authorization, เก็บ password อย่างเหมาะสม, ใช้ cookie/token อย่างปลอดภัย และประเมินความเสี่ยงพื้นฐานของ API ได้

## Authentication vs authorization

- **Authentication:** ตรวจว่าเป็นใคร
- **Authorization:** ตรวจว่ามีสิทธิ์ทำอะไร

ต้องตรวจ authorization ที่ server ทุกครั้ง ไม่เชื่อ role หรือ permission ที่ client ส่งมา

## Password storage

ห้ามเก็บ password แบบ plaintext หรือ reversible encryption ใช้ password hashing algorithm ที่ออกแบบมาโดยเฉพาะ เช่น Argon2id หรือ bcrypt พร้อม cost ที่เหมาะสม

ตัวอย่างเชิงโครงสร้าง:

```js
const passwordHash = await passwordHasher.hash(password);
const valid = await passwordHasher.verify(passwordHash, passwordAttempt);
```

แยก implementation ไว้หลัง interface/service เพื่อปรับ algorithm หรือ cost ได้ในอนาคต

## Sessions and cookies

สำหรับ browser application, server-side session ร่วมกับ cookie มักควบคุมการเพิกถอนสิทธิ์ได้ง่าย

Cookie สำคัญ:

```text
HttpOnly; Secure; SameSite=Lax; Path=/
```

- ใช้ HTTPS ใน production
- rotate session identifier หลัง login
- ตั้ง idle/absolute expiration
- ป้องกัน CSRF สำหรับ state-changing request ที่อาศัย cookie
- ไม่ใช้ default in-memory session store ในหลาย instance

## Token-based authentication

JWT เป็นรูปแบบ token ไม่ใช่ระบบ security ที่สมบูรณ์ในตัวเอง

ควรกำหนด:

- issuer, audience, expiration
- key rotation
- allow-list ของ algorithm
- refresh-token policy และ revocation strategy
- token storage ที่ลด XSS/CSRF risk ตาม architecture

อย่าใส่ข้อมูลลับหรือข้อมูลส่วนบุคคลเกินจำเป็นใน JWT payload เพราะ payload อ่านได้แม้ถูก signed

## Input and API protection

- validate และ normalize input
- จำกัด request body
- rate limit endpoint สำคัญ เช่น login/reset password
- ใช้ parameterized queries
- ตั้ง security headers/CSP
- ป้องกัน account enumeration ด้วยข้อความตอบกลับที่ไม่เปิดเผยเกินจำเป็น
- log security event โดยไม่ log credential/token
- lock dependency และตรวจ vulnerability

## Secrets

- ไม่ commit `.env`, private key หรือ production credential
- ใช้ secret manager ของ platform
- rotate secret เมื่อสงสัยว่ารั่ว
- จำกัดสิทธิ์ตาม least privilege

## Security review checklist

- [ ] password ถูก hash ด้วย algorithm ที่เหมาะสม
- [ ] cookie/session ตั้งค่า secure
- [ ] authorization ตรวจที่ server
- [ ] input ถูก validate
- [ ] database query ไม่ต่อ string จาก user input
- [ ] endpoint สำคัญมี rate limit
- [ ] secret ไม่อยู่ใน Git/log
- [ ] dependency มี maintenance process

## References

- Node.js security best practices: <https://nodejs.org/en/learn/getting-started/security-best-practices>
- OWASP Authentication Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html>
- OWASP Session Management Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html>
