# Module 19: Modern ECMAScript Language Structure

> Baseline: Node.js 24 LTS • ESM-first • Updated: 2026-07-28

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะสามารถอธิบายโครงสร้างหลักของภาษา JavaScript สมัยใหม่ เลือกใช้ declaration, expression, statement, scope และ module ได้อย่างถูกต้อง รวมทั้งเขียนโค้ดที่อ่านง่ายและเหมาะกับ Node.js production

## 1. โครงสร้างพื้นฐานของภาษา

JavaScript ประกอบด้วยองค์ประกอบสำคัญ ได้แก่:

- **Value**: ค่าที่โปรแกรมนำไปประมวลผล
- **Expression**: นิพจน์ที่ประเมินแล้วได้ค่า
- **Statement**: คำสั่งที่ควบคุมการทำงานของโปรแกรม
- **Declaration**: การประกาศตัวแปร ฟังก์ชัน คลาส หรือ module binding
- **Block**: กลุ่มคำสั่งภายใน `{}`
- **Module**: หน่วยโค้ดที่นำเข้าและส่งออกได้

```js
// Declaration: ประกาศค่าคงที่
const taxRate = 0.07;

// Expression: คำนวณแล้วได้ค่าใหม่
const total = 1_000 * (1 + taxRate);

// Statement: สั่งให้โปรแกรมแสดงผล
console.log(total);
```

## 2. Primitive และ object

Primitive values ได้แก่:

- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `symbol`
- `null`

```js
const employeeName = "Anan";
const salary = 45_000;
const active = true;
const employeeId = 12345678901234567890n;
const internalKey = Symbol("internalKey");
```

Object ใช้เก็บข้อมูลแบบมีโครงสร้าง:

```js
const employee = {
  id: 1001,
  name: "Anan",
  department: "HR",
};
```

## 3. `const`, `let` และ scope

แนวทางหลัก:

1. ใช้ `const` เป็นค่าเริ่มต้น
2. ใช้ `let` เมื่อจำเป็นต้องเปลี่ยนค่า
3. หลีกเลี่ยง `var` ในโค้ดใหม่

```js
const company = "Example Co., Ltd.";
let retryCount = 0;

if (retryCount < 3) {
  const message = "Retrying request";
  retryCount += 1;
  console.log(message);
}
```

`const` ป้องกันการ reassign binding แต่ไม่ได้ทำให้ object immutable:

```js
const profile = { name: "Mali" };
profile.name = "Mali S."; // ทำได้ เพราะแก้ property ไม่ใช่ reassign ตัวแปร
```

## 4. Equality และ coercion

ใช้ strict equality เป็นค่าเริ่มต้น:

```js
console.log(1 === "1"); // false
console.log(1 !== "1"); // true
```

หลีกเลี่ยง implicit coercion ที่ทำให้อ่านยาก:

```js
const input = "42";
const parsed = Number(input);

if (Number.isNaN(parsed)) {
  throw new TypeError("input ต้องเป็นตัวเลข");
}
```

## 5. Destructuring และ rest/spread

```js
const user = {
  id: 101,
  name: "Nok",
  roles: ["auditor", "trainer"],
};

const { id, name, roles = [] } = user;
const [primaryRole, ...otherRoles] = roles;

const updatedUser = {
  ...user,
  active: true,
};

console.log({ id, name, primaryRole, otherRoles, updatedUser });
```

## 6. Optional chaining และ nullish coalescing

```js
const city = user.address?.city ?? "ไม่ระบุ";
```

- `?.` หยุดอ่าน property เมื่อค่าเป็น `null` หรือ `undefined`
- `??` ใช้ค่าด้านขวาเฉพาะเมื่อด้านซ้ายเป็น `null` หรือ `undefined`

อย่าใช้ `||` แทน `??` เมื่อค่า `0`, `false` หรือ `""` เป็นค่าที่ถูกต้อง

## 7. Function declaration และ function expression

```js
function calculateNetSalary(gross, deduction) {
  return gross - deduction;
}

const formatMoney = (amount) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);

console.log(formatMoney(calculateNetSalary(50_000, 2_000)));
```

เลือก arrow function สำหรับ callback และ function expression ที่ไม่ต้องใช้ dynamic `this`

## 8. Class syntax

```js
class Employee {
  #salary;

  constructor({ id, name, salary }) {
    this.id = id;
    this.name = name;
    this.#salary = salary;
  }

  getAnnualSalary() {
    return this.#salary * 12;
  }
}

const employeeRecord = new Employee({
  id: 1001,
  name: "Anan",
  salary: 45_000,
});

console.log(employeeRecord.getAnnualSalary());
```

## 9. ESM structure

```js
// payroll.js
export function calculatePayroll(baseSalary, allowance = 0) {
  return baseSalary + allowance;
}
```

```js
// app.js
import { calculatePayroll } from "./payroll.js";

console.log(calculatePayroll(45_000, 3_000));
```

ESM ใช้ static import graph ทำให้ tooling วิเคราะห์ dependency ได้ชัดเจนกว่า dynamic loading แบบทั่วไป

## 10. Error-first design

```js
export function requirePositiveNumber(value, fieldName = "value") {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${fieldName} ต้องเป็นจำนวนบวก`);
  }

  return value;
}
```

## Common mistakes

- ใช้ `var` ในโค้ดใหม่
- เปรียบเทียบด้วย `==` โดยไม่จำเป็น
- ใช้ object mutation โดยไม่มีเหตุผล
- ใช้ optional chaining เพื่อซ่อนข้อผิดพลาดของข้อมูล
- export ทุกอย่างจาก module โดยไม่มี boundary ที่ชัดเจน

## Workshop

สร้าง module สำหรับคำนวณ payroll ที่ประกอบด้วย:

1. validation ของเงินเดือน
2. calculation function
3. formatter ด้วย `Intl.NumberFormat`
4. named exports
5. test cases สำหรับข้อมูลปกติและข้อมูลผิดพลาด

## Checklist

- [ ] แยก value, expression, statement และ declaration ได้
- [ ] เลือกใช้ `const` และ `let` ได้ถูกต้อง
- [ ] ใช้ strict equality เป็น
- [ ] ใช้ destructuring, rest และ spread ได้
- [ ] ใช้ optional chaining และ nullish coalescing ได้เหมาะสม
- [ ] สร้าง ESM module ที่มี boundary ชัดเจนได้

## Official references

- ECMAScript language specification: <https://tc39.es/ecma262/>
- MDN JavaScript guide: <https://developer.mozilla.org/docs/Web/JavaScript/Guide>
- Node.js ECMAScript modules: <https://nodejs.org/docs/latest-v24.x/api/esm.html>
