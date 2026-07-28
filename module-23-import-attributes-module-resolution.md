# Module 23: Import Attributes and Module Resolution

> ESM-first dependency loading for modern Node.js

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะเข้าใจ Node.js module resolution, package boundaries, `exports`, `imports`, file extensions และ import attributes สำหรับทรัพยากรที่ไม่ใช่ JavaScript

## 1. ESM เป็นค่าเริ่มต้นของหลักสูตร

กำหนดใน `package.json`:

```json
{
  "type": "module"
}
```

จากนั้นใช้:

```js
import { readFile } from "node:fs/promises";
import express from "express";
import { calculateTax } from "./tax.js";
```

ใน Node.js ควรระบุ file extension สำหรับ relative imports อย่างชัดเจน

## 2. Resolution แต่ละประเภท

```text
node:fs/promises       → built-in module
express                → package จาก node_modules
./tax.js               → relative file
#config                → package imports alias
```

## 3. Package exports

`exports` ใช้กำหนด public API ของ package และป้องกันการ import ไฟล์ภายในโดยตรง

```json
{
  "name": "@example/payroll",
  "type": "module",
  "exports": {
    ".": "./src/index.js",
    "./calculator": "./src/calculator.js"
  }
}
```

ผู้ใช้ package สามารถ import ได้เฉพาะเส้นทางที่เปิดไว้

```js
import { calculatePayroll } from "@example/payroll";
import { calculateTax } from "@example/payroll/calculator";
```

## 4. Conditional exports

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    }
  }
}
```

ใช้เฉพาะเมื่อ package จำเป็นต้องรองรับทั้ง ESM และ CommonJS เพราะ dual-package design เพิ่มภาระ testing

## 5. Package imports

สร้าง internal alias ที่ขึ้นต้นด้วย `#`

```json
{
  "imports": {
    "#config": "./src/config/index.js",
    "#services/*": "./src/services/*.js"
  }
}
```

```js
import { config } from "#config";
import { employeeService } from "#services/employee-service.js";
```

## 6. Import attributes

เมื่อต้อง import JSON ให้ระบุชนิดทรัพยากรอย่างชัดเจน

```js
import settings from "./settings.json" with { type: "json" };

console.log(settings.environment);
```

สำหรับ compatibility ที่กว้างขึ้น สามารถอ่าน JSON ด้วย `node:fs/promises` และ parse เอง

```js
import { readFile } from "node:fs/promises";

const raw = await readFile(new URL("./settings.json", import.meta.url), "utf8");
const settings = JSON.parse(raw);
```

## 7. import.meta

```js
console.log(import.meta.url);
console.log(import.meta.dirname);
console.log(import.meta.filename);
```

ก่อนใช้งาน property ใหม่ ให้ตรวจ version support ของ Node.js production baseline

## 8. Dynamic import

```js
const adapterName = process.env.ADAPTER ?? "memory";
const adapter = await import(`./adapters/${adapterName}.js`);

await adapter.connect();
```

ต้อง validate input ก่อนประกอบ path เพื่อป้องกันการโหลด module ที่ไม่ได้รับอนุญาต

## Common mistakes

- ลืม `.js` ใน relative imports
- import internal package path ที่ไม่ได้ประกาศใน `exports`
- ผสม ESM และ CommonJS โดยไม่มี migration plan
- ใช้ dynamic import กับค่าจากผู้ใช้โดยตรง
- ใช้ extension หรือ condition ที่ bundler รองรับแต่ Node.js ไม่รองรับ

## Workshop

สร้าง package ขนาดเล็กที่มี:

1. public entry point
2. subpath export
3. internal alias ผ่าน `imports`
4. JSON configuration ผ่าน import attributes
5. integration test เพื่อยืนยันว่า private file import ไม่ได้

## Checklist

- [ ] อธิบาย built-in, package และ relative resolution ได้
- [ ] ใช้ `exports` จำกัด public API ได้
- [ ] ใช้ `imports` สร้าง internal aliases ได้
- [ ] ใช้ import attributes กับ JSON ได้
- [ ] เข้าใจความเสี่ยงของ dynamic import

## Official references

- <https://nodejs.org/api/esm.html>
- <https://nodejs.org/api/packages.html>
- <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import/with>
