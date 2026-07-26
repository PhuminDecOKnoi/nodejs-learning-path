# Module 3: Modules, ESM, CommonJS, and npm

> Baseline: Node.js 24 LTS • ESM-first • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะใช้ ECMAScript Modules, เข้าใจ CommonJS, จัดการ dependency และใช้งาน lockfile ได้อย่างถูกต้อง

## Module systems in Node.js

Node.js รองรับสองระบบหลัก:

1. **ECMAScript Modules (ESM):** `import` / `export`
2. **CommonJS (CJS):** `require()` / `module.exports`

หลักสูตรนี้ใช้ ESM เป็นค่าเริ่มต้น โดยกำหนด:

```json
{
  "type": "module"
}
```

## Built-in modules

ใช้ prefix `node:` เพื่อแสดงชัดว่าเป็น built-in module:

```js
import os from "node:os";
import path from "node:path";

console.log(os.platform());
console.log(path.join("data", "users.json"));
```

## Custom ESM module

`src/math.js`:

```js
export function add(a, b) {
  return a + b;
}

export const subtract = (a, b) => a - b;
```

`src/app.js`:

```js
import { add, subtract } from "./math.js";

console.log(add(10, 5));
console.log(subtract(10, 5));
```

ESM local imports ต้องระบุนามสกุลไฟล์ เช่น `./math.js`

## CommonJS compatibility

ระบบเก่าอาจพบ:

```js
const os = require("node:os");
module.exports = { /* ... */ };
```

ไฟล์ CommonJS สามารถใช้ `.cjs` หรือโครงการที่ไม่ได้ตั้ง `"type": "module"` ส่วน ESM สามารถใช้ `.mjs`

## npm workflow

```bash
npm init -y
npm install express
npm install --save-dev nodemon
npm uninstall package-name
npm outdated
npm audit
```

ความหมายสำคัญ:

- `dependencies`: ต้องใช้ตอน application ทำงาน
- `devDependencies`: ใช้เฉพาะพัฒนา ทดสอบ หรือ build
- `package-lock.json`: ล็อก dependency tree เพื่อการติดตั้งที่ทำซ้ำได้
- `npm ci`: ติดตั้งตาม lockfile เหมาะกับ CI

ห้าม commit `node_modules/` แต่ควร commit `package-lock.json`

## package.json example

```json
{
  "name": "node-learning",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=24 <25"
  },
  "scripts": {
    "start": "node src/app.js",
    "dev": "node --watch src/app.js",
    "test": "node --test"
  }
}
```

Node.js มี watch mode ในตัว จึงไม่จำเป็นต้องใช้ nodemon สำหรับตัวอย่างพื้นฐานทุกกรณี

## Security and maintenance

- ตรวจชื่อ package และผู้เผยแพร่ก่อนติดตั้ง
- หลีกเลี่ยง package ที่ไม่จำเป็นหรือไม่มีการดูแล
- อย่าใช้ `npm audit fix --force` โดยไม่อ่าน breaking changes
- กำหนด Node.js runtime ผ่าน `.nvmrc`/engines ไม่ใช่ติดตั้ง package ชื่อ `node` เป็น dependency

## Checklist

- [ ] ใช้ ESM import/export ได้
- [ ] อ่าน CommonJS เดิมได้
- [ ] แยก dependencies และ devDependencies ได้
- [ ] ใช้ `npm ci`, `npm outdated`, `npm audit` ได้
- [ ] เข้าใจบทบาทของ lockfile

## Official references

- Modules: <https://nodejs.org/docs/latest-v24.x/api/esm.html>
- Packages: <https://nodejs.org/docs/latest-v24.x/api/packages.html>
- npm: <https://docs.npmjs.com/>
