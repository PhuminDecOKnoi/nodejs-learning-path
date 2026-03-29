# Module 9: HTML5, Static Assets, and Templating

## 1. Overview
Module นี้สอนการเชื่อม Express กับ HTML5
เพื่อสร้าง Web Application ที่แสดงผลหน้าเว็บจริง

หัวข้อหลัก:
- static files
- HTML5 integration
- CSS / JS assets
- templating engine
- dynamic HTML
- layout reuse

---

## 2. Serving Static HTML
โครงสร้างไฟล์

```
project
 ├── app.js
 └── public
     └── index.html
```

app.js
```javascript
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);
```

เปิด browser
```
http://localhost:3000
```

---

## 3. HTML5 Example
public/index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Node App</title>
</head>
<body>
    <h1>Node.js HTML5 Page</h1>
</body>
</html>
```

---

## 4. Static Assets (CSS / JS)
โครงสร้าง
```
public
 ├── index.html
 ├── css
 │   └── style.css
 └── js
     └── app.js
```

HTML
```html
<link rel="stylesheet" href="/css/style.css">
<script src="/js/app.js"></script>
```

---

## 5. CSS Example
css/style.css
```css
body {
    font-family: Arial;
    background: #f5f5f5;
}
```

---

## 6. Client-side JavaScript
js/app.js
```javascript
console.log("Client JS loaded");
```

---

## 7. Why Templating
Static HTML ไม่สามารถสร้าง dynamic data ได้
ต้องใช้ templating engine เช่น:
- EJS
- Handlebars
- Pug

---

## 8. Install Handlebars
```bash
npm install hbs
```

---

## 9. Setup Templating Engine
```javascript
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index", {
        title: "Home Page",
        name: "Phumin"
    });
});

app.listen(3000);
```

---

## 10. Views Folder
```
project
 ├── app.js
 └── views
     └── index.hbs
```

views/index.hbs
```html
<h1>{{title}}</h1>
<p>Hello {{name}}</p>
```

---

## 11. Layout Partials
สร้าง reusable components

```
views
 ├── index.hbs
 └── partials
     └── header.hbs
```

header.hbs
```html
<header>
    <h1>My Website</h1>
</header>
```

register partial
```javascript
hbs.registerPartials(path.join(__dirname, "views/partials"));
```

ใช้
```html
{{> header}}
```

---

## 12. Dynamic Route + Template
```javascript
app.get("/profile", (req, res) => {
    res.render("profile", {
        name: "Phumin",
        role: "Node Learner"
    });
});
```

---

## 13. Key Concepts
- static HTML
- CSS / JS assets
- templating engine
- dynamic HTML
- layout reuse
- client-server integration

---

## 14. Learning Checklist
- [ ] serve HTML ได้
- [ ] serve CSS ได้
- [ ] serve JS ได้
- [ ] ใช้ templating ได้
- [ ] render dynamic data ได้
- [ ] ใช้ partial layout ได้

---

## 15. Next Module
Module 10: REST API Design and Routing
