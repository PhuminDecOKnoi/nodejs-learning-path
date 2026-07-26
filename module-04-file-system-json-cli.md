# Module 4: File System, JSON, and CLI Arguments

> Baseline: Node.js 24 LTS • Promise-based APIs • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะอ่าน/เขียนไฟล์ด้วย Promise API, จัดการ JSON อย่างปลอดภัย และรับค่า CLI โดยตรวจสอบ input

## File system with promises

ใช้ `node:fs/promises` เป็นแนวทางหลักสำหรับ application code:

```js
import { readFile, writeFile } from "node:fs/promises";

const note = { title: "Node.js", completed: false };
await writeFile("note.json", JSON.stringify(note, null, 2), "utf8");

const raw = await readFile("note.json", "utf8");
const savedNote = JSON.parse(raw);
console.log(savedNote);
```

Sync APIs เช่น `readFileSync()` เหมาะกับ startup script หรือ CLI ขนาดเล็ก แต่ไม่ควรใช้ใน request handler เพราะจะ block event loop

## Robust error handling

```js
import { readFile } from "node:fs/promises";

try {
  const text = await readFile("config.json", "utf8");
  const config = JSON.parse(text);
  console.log(config);
} catch (error) {
  if (error.code === "ENOENT") {
    console.error("ไม่พบไฟล์ config.json");
  } else if (error instanceof SyntaxError) {
    console.error("JSON ไม่ถูกต้อง");
  } else {
    throw error;
  }
}
```

## Paths and URLs in ESM

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const dataPath = path.join(dirname, "data", "users.json");
```

อย่าต่อ path ด้วย `/` เอง เพราะ Windows และ Unix ใช้รูปแบบ path ต่างกัน

## CLI arguments

```js
const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    console.log("add", args.join(" "));
    break;
  case "list":
    console.log("list");
    break;
  default:
    console.error("Usage: node src/cli.js <add|list>");
    process.exitCode = 1;
}
```

สำหรับ CLI ที่ซับซ้อน ให้ใช้ `node:util` `parseArgs()`:

```js
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    title: { type: "string", short: "t" },
    done: { type: "boolean", default: false }
  }
});

console.log(values);
```

## JSON guidance

- JSON ไม่รองรับ comments, functions, `undefined` หรือ circular references
- ใช้ `JSON.stringify(value, null, 2)` เพื่อให้ไฟล์อ่านง่าย
- ตรวจสอบ schema ก่อนเชื่อข้อมูลจากภายนอก
- หลีกเลี่ยงการเก็บ password หรือ API key ใน JSON ที่ commit ขึ้น Git

## Checklist

- [ ] ใช้ `node:fs/promises` ได้
- [ ] แยก sync และ async file APIs ได้
- [ ] จัดการ `ENOENT` และ JSON parse error ได้
- [ ] ใช้ `path.join()` และ `import.meta.url` ได้
- [ ] ใช้ `parseArgs()` สำหรับ CLI ได้

## Official references

- File system: <https://nodejs.org/docs/latest-v24.x/api/fs.html>
- Utilities: <https://nodejs.org/docs/latest-v24.x/api/util.html>
