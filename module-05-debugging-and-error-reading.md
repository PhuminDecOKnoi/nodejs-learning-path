# Module 5: Debugging and Error Reading

> Baseline: Node.js 24 LTS • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะอ่าน stack trace, ใช้ inspector, แยก operational error ออกจาก programmer error และสร้าง workflow แก้ปัญหาอย่างเป็นระบบ

## Start with the error

อ่านข้อมูลตามลำดับ:

1. error class เช่น `TypeError`, `SyntaxError`, `ReferenceError`
2. message
3. file, line และ column
4. stack trace จากจุดเกิดเหตุย้อนกลับไปยังผู้เรียก

```js
function printUser(user) {
  console.log(user.name);
}

printUser(undefined);
```

อย่าแก้เพียงบรรทัดบนสุดโดยไม่ตรวจ input และ call chain

## Structured logging

```js
console.log({ event: "user.loaded", userId: 42 });
console.error({ event: "user.load_failed", error: error.message });
```

ห้าม log password, token, session cookie หรือข้อมูลส่วนบุคคลเกินจำเป็น

## Inspector

เริ่ม debug session:

```bash
node --inspect-brk src/app.js
```

หรือใช้ VS Code debugger จากนั้นตั้ง breakpoint, step over, step into และตรวจ scope

ใน code สามารถใช้:

```js
debugger;
```

## Error causes

เก็บต้นเหตุเดิมไว้เมื่อสร้าง error ใหม่:

```js
try {
  await loadConfig();
} catch (error) {
  throw new Error("โหลด configuration ไม่สำเร็จ", { cause: error });
}
```

## Async errors

Promise ที่ไม่ได้จัดการอาจทำให้ process อยู่ในสถานะที่ไม่น่าเชื่อถือ:

```js
try {
  await doWork();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
```

สำหรับ application ให้จัดการ error ณ boundary เช่น request handler, job runner หรือ CLI entry point

## Useful runtime flags

```bash
node --trace-warnings src/app.js
node --enable-source-maps src/app.js
node --watch src/app.js
```

## Debugging workflow

```text
Reproduce → Reduce → Observe → Form hypothesis → Test → Fix → Add regression test
```

- ทำให้เกิดปัญหาซ้ำได้
- ลด case ให้เล็กที่สุด
- ตรวจค่าจริง ไม่เดา
- แก้ root cause
- เพิ่ม test ป้องกันการเกิดซ้ำ

## Checklist

- [ ] อ่าน stack trace ได้
- [ ] ใช้ `--inspect-brk` และ breakpoint ได้
- [ ] จัดการ async error ที่ application boundary ได้
- [ ] ใช้ `Error` cause ได้
- [ ] เพิ่ม regression test หลังแก้ bug ได้

## Official references

- Debugger: <https://nodejs.org/docs/latest-v24.x/api/debugger.html>
- Errors: <https://nodejs.org/docs/latest-v24.x/api/errors.html>
- CLI flags: <https://nodejs.org/docs/latest-v24.x/api/cli.html>
