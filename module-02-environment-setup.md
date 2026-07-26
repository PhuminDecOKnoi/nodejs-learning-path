# Module 2: Environment Setup and First Script

> Baseline: Node.js 24 LTS • npm 11.x • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะติดตั้ง ตรวจสอบ และควบคุมเวอร์ชัน Node.js รวมทั้งสร้างโครงการ ESM ที่ทำงานได้บน macOS, Windows และ Linux

## Recommended tools

- Node.js 24 LTS
- npm ซึ่งติดตั้งพร้อม Node.js
- VS Code หรือ editor ที่รองรับ JavaScript
- Git
- Terminal: zsh/bash, PowerShell หรือ Windows Terminal

## Version management

แนะนำให้ใช้ version manager แทนการติดตั้งทับหลายรุ่น เช่น `nvm`, `fnm` หรือ Volta

Repository นี้กำหนด `.nvmrc` เป็น:

```text
24.18.0
```

เมื่อใช้ nvm:

```bash
nvm install
nvm use
```

ตรวจสอบ environment:

```bash
node --version
npm --version
node -p "process.versions"
```

## Create a project

```bash
mkdir node-learning
cd node-learning
npm init -y
npm pkg set type=module
npm pkg set engines.node=">=24 <25"
```

สร้าง `src/app.js`:

```js
const name = process.argv[2] ?? "Developer";
console.log(`Hello, ${name}`);
```

เพิ่ม script:

```bash
npm pkg set scripts.start="node src/app.js"
```

รัน:

```bash
npm start -- Phumin
```

## Cross-platform note

คำสั่ง `touch app.js` ไม่มีใน Windows PowerShell ทุกเครื่อง จึงสร้างไฟล์ผ่าน editor หรือใช้:

```powershell
New-Item -ItemType File src/app.js
```

## REPL และ built-in help

```bash
node
```

คำสั่งสำคัญ:

```text
.help
.editor
.exit
```

Node.js ยังรัน code สั้น ๆ ได้โดยไม่สร้างไฟล์:

```bash
node --eval "console.log(process.platform)"
```

## Environment variables

อ่านค่าผ่าน `process.env` และห้าม commit secret:

```js
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
console.log({ port });
```

Node.js รุ่นปัจจุบันรองรับไฟล์ environment ผ่าน CLI:

```bash
node --env-file=.env src/app.js
```

## Checklist

- [ ] ใช้ Node.js 24 LTS ได้
- [ ] ควบคุมเวอร์ชันด้วย `.nvmrc` ได้
- [ ] สร้าง `package.json` แบบ ESM ได้
- [ ] ใช้ npm scripts และ `process.argv` ได้
- [ ] เข้าใจ `process.env` และไม่เก็บ secret ใน Git

## Official references

- CLI: <https://nodejs.org/docs/latest-v24.x/api/cli.html>
- npm documentation: <https://docs.npmjs.com/>
