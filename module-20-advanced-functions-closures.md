# Module 20: Advanced Functions and Closures

> Baseline: Node.js 24 LTS • ESM-first • Updated: 2026-07-28

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะอธิบาย lexical scope, closure, higher-order function, callback, function composition และผลกระทบต่อ memory ได้ รวมทั้งออกแบบ function ให้ทดสอบง่ายและลด side effects

## 1. Function เป็น first-class value

JavaScript สามารถเก็บ function ในตัวแปร ส่งเป็น argument และคืนค่าออกจาก function อื่นได้

```js
const double = (value) => value * 2;

function applyOperation(value, operation) {
  return operation(value);
}

console.log(applyOperation(10, double));
```

## 2. Lexical scope

Function มองเห็นตัวแปรจาก scope ที่ถูกประกาศ ไม่ใช่ scope ที่ถูกเรียก

```js
const department = "Compliance";

function createReporter() {
  const prefix = "AUDIT";

  return function report(message) {
    console.log(`[${prefix}] [${department}] ${message}`);
  };
}

const report = createReporter();
report("ตรวจเอกสารเสร็จแล้ว");
```

## 3. Closure

Closure คือ function ที่ยังเข้าถึง lexical environment เดิมได้ แม้ outer function ทำงานเสร็จแล้ว

```js
function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment() {
      count += 1;
      return count;
    },
    current() {
      return count;
    },
  };
}

const auditCounter = createCounter();
console.log(auditCounter.increment());
console.log(auditCounter.current());
```

Closure เหมาะสำหรับ encapsulation แต่ต้องระวังการเก็บ object ขนาดใหญ่โดยไม่จำเป็น เพราะอาจทำให้ garbage collector คืน memory ไม่ได้ตามที่คาด

## 4. Higher-order functions

```js
const employees = [
  { name: "A", salary: 35_000 },
  { name: "B", salary: 55_000 },
  { name: "C", salary: 70_000 },
];

const highSalaryEmployees = employees
  .filter((employee) => employee.salary >= 50_000)
  .map((employee) => employee.name);

console.log(highSalaryEmployees);
```

## 5. Pure functions และ side effects

Pure function:

```js
function calculateOvertime(hours, hourlyRate, multiplier = 1.5) {
  return hours * hourlyRate * multiplier;
}
```

Function ที่มี side effect:

```js
function writeAuditLog(message, logger = console) {
  logger.info(message);
}
```

แยก calculation ออกจาก I/O เพื่อให้ unit test ง่ายขึ้น

## 6. Function composition

```js
const trim = (value) => value.trim();
const toLowerCase = (value) => value.toLowerCase();
const replaceSpaces = (value) => value.replaceAll(/\s+/g, "-");

const pipe =
  (...functions) =>
  (input) =>
    functions.reduce((value, functionItem) => functionItem(value), input);

const createSlug = pipe(trim, toLowerCase, replaceSpaces);
console.log(createSlug("  Labour Compliance Report  "));
```

## 7. Currying และ partial application

```js
const multiplyBy = (multiplier) => (value) => multiplier * value;

const calculateNormalOvertime = multiplyBy(1.5);
console.log(calculateNormalOvertime(1_000));
```

ใช้เมื่อช่วยลด parameter ซ้ำและทำให้ intention ชัดเจน ไม่ควรใช้จนโค้ดอ่านยาก

## 8. `this` กับ arrow function

Arrow function ไม่มี `this` ของตนเอง แต่รับจาก lexical scope

```js
class TaskQueue {
  tasks = [];

  add(task) {
    this.tasks.push(task);
  }

  printLater() {
    setTimeout(() => {
      console.log(this.tasks);
    }, 10);
  }
}
```

หลีกเลี่ยง arrow function เป็น object method เมื่อต้องการ dynamic `this`

## 9. Memoization

```js
function memoize(functionToCache) {
  const cache = new Map();

  return function memoized(argument) {
    if (cache.has(argument)) {
      return cache.get(argument);
    }

    const result = functionToCache(argument);
    cache.set(argument, result);
    return result;
  };
}

const square = memoize((value) => value * value);
console.log(square(12));
```

Memoization เหมาะกับ deterministic calculation แต่ควรกำหนด cache policy สำหรับระบบที่รับ input ได้ไม่จำกัด

## Common mistakes

- สร้าง nested function ซับซ้อนเกินความจำเป็น
- ปล่อย closure อ้างถึง object ขนาดใหญ่
- ใช้ callback ที่ทำหลายหน้าที่
- ผูก business logic กับ console, database หรือ network โดยตรง
- ใช้ memoization โดยไม่มีขอบเขต cache

## Workshop

สร้าง payroll calculator โดยใช้:

1. pure calculation functions
2. validator เป็น higher-order function
3. formatter ด้วย partial application
4. dependency injection สำหรับ logger
5. test สำหรับ closure และ error cases

## Checklist

- [ ] อธิบาย lexical scope และ closure ได้
- [ ] ใช้ higher-order function ได้
- [ ] แยก pure logic ออกจาก side effects ได้
- [ ] เข้าใจความแตกต่างของ `this` ใน function ปกติและ arrow function
- [ ] ประเมินความเสี่ยงด้าน memory ของ closure และ cache ได้

## Official references

- ECMAScript functions and classes: <https://tc39.es/ecma262/>
- MDN closures: <https://developer.mozilla.org/docs/Web/JavaScript/Guide/Closures>
- Node.js timers: <https://nodejs.org/docs/latest-v24.x/api/timers.html>
