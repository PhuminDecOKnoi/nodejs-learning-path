# Module 9: HTML5, Static Assets, and EJS Templating

> Baseline: Node.js 24 LTS • Express 5.x • EJS 6.x • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะให้บริการ static assets, render server-side HTML ด้วย EJS และป้องกันปัญหา path traversal กับ XSS ขั้นพื้นฐานได้

## Project structure

```text
src/app.js
views/
  index.ejs
public/
  css/app.css
  js/app.js
```

## Express configuration

```js
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "..", "views"));
app.use("/assets", express.static(path.join(dirname, "..", "public"), {
  maxAge: "1h",
  immutable: false
}));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Node.js Learning Path",
    modules: ["Node.js", "Express", "EJS"]
  });
});
```

## EJS template

```ejs
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><%= title %></title>
  <link rel="stylesheet" href="/assets/css/app.css">
</head>
<body>
  <main>
    <h1><%= title %></h1>
    <ul>
      <% for (const moduleName of modules) { %>
        <li><%= moduleName %></li>
      <% } %>
    </ul>
  </main>
</body>
</html>
```

`<%= value %>` escape HTML โดยอัตโนมัติ ส่วน `<%- value %>` แสดง raw HTML และเสี่ยง XSS หากข้อมูลมาจากผู้ใช้

## Static asset guidance

- ใช้ `express.static()` กับ directory ที่กำหนดแน่นอน
- ไม่สร้าง file path โดยนำ user input มาต่อโดยตรง
- ใช้ hashed filenames หรือ cache policy ที่เหมาะสมสำหรับ production
- ตั้ง Content Security Policy ผ่าน security middleware หรือ reverse proxy
- ใช้ semantic HTML และกำหนด `lang`, `charset`, viewport

## When to use templates

EJS เหมาะกับ server-rendered pages, admin tools, internal applications และ HTML email preview ส่วน SPA/React เหมาะเมื่อ client-side interaction ซับซ้อนกว่า แต่ไม่จำเป็นสำหรับทุกโครงการ

## Checklist

- [ ] ตั้งค่า EJS และ views directory ได้
- [ ] ให้บริการ static assets ได้
- [ ] แยก escaped กับ raw output ได้
- [ ] ใช้ path utilities ใน ESM ได้
- [ ] วาง HTML ที่เข้าถึงได้และ responsive ได้

## References

- Express static files: <https://expressjs.com/en/starter/static-files.html>
- EJS documentation: <https://ejs.co/>
- OWASP XSS Prevention Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html>
