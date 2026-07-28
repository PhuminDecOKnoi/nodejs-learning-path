# Module 22: Symbols, Reflect and Proxy

> Advanced metaprogramming for modern JavaScript and Node.js

## Learning outcomes

เมื่อเรียนจบ ผู้เรียนจะสามารถใช้ `Symbol`, `Reflect` และ `Proxy` เพื่อสร้าง API ที่ปลอดภัย ยืดหยุ่น และรองรับ metaprogramming ได้อย่างเหมาะสม

## 1. Symbol

`Symbol` คือ primitive value ที่มีเอกลักษณ์เฉพาะ แม้จะใช้คำอธิบายเดียวกันก็ตาม

```js
const idA = Symbol("id");
const idB = Symbol("id");

console.log(idA === idB); // false
```

เหมาะสำหรับ:

- สร้าง property key ที่ไม่ชนกับชื่อทั่วไป
- กำหนด protocol เช่น `Symbol.iterator`
- ซ่อนรายละเอียดบางส่วนจาก enumeration ปกติ

```js
const internalId = Symbol("internalId");

const user = {
  name: "Ada",
  [internalId]: 101,
};

console.log(Object.keys(user)); // ["name"]
console.log(user[internalId]); // 101
```

## 2. Well-known symbols

JavaScript ใช้ well-known symbols เพื่อเปิดจุดเชื่อมต่อกับพฤติกรรมภายในของภาษา

```js
const collection = {
  values: [10, 20, 30],
  *[Symbol.iterator]() {
    yield* this.values;
  },
};

for (const value of collection) {
  console.log(value);
}
```

ตัวอย่างสำคัญ:

- `Symbol.iterator`
- `Symbol.asyncIterator`
- `Symbol.toStringTag`
- `Symbol.hasInstance`
- `Symbol.dispose`
- `Symbol.asyncDispose`

## 3. Reflect

`Reflect` รวม operation ระดับภาษาไว้ในรูปแบบ function API ที่คืนผลลัพธ์ชัดเจน

```js
const profile = { name: "Grace" };

Reflect.set(profile, "role", "Engineer");
console.log(Reflect.get(profile, "role"));
console.log(Reflect.has(profile, "name"));
```

ข้อดี:

- อ่านง่ายกว่าการใช้ operator บางชนิด
- ใช้คู่กับ Proxy traps ได้ตรงความหมาย
- คืนค่า boolean ในหลาย operation แทนการ throw โดยไม่จำเป็น

## 4. Proxy

`Proxy` ใช้ดักและปรับพฤติกรรมของ object operation

```js
const target = {
  name: "Lin",
};

const proxy = new Proxy(target, {
  get(object, property, receiver) {
    console.log(`อ่าน property: ${String(property)}`);
    return Reflect.get(object, property, receiver);
  },
});

console.log(proxy.name);
```

## 5. Validation proxy

```js
const employee = new Proxy({}, {
  set(target, property, value, receiver) {
    if (property === "age" && (!Number.isInteger(value) || value < 18)) {
      throw new TypeError("age ต้องเป็นจำนวนเต็มและไม่น้อยกว่า 18");
    }

    return Reflect.set(target, property, value, receiver);
  },
});

employee.age = 25;
```

## 6. Common mistakes

- ใช้ Proxy มากเกินไปจน debug ยาก
- ลืมรักษา invariants ของ object
- ใช้ Symbol เพื่อหวังเป็น security boundary
- สร้าง hidden state โดยไม่จัดการ lifecycle

## 7. Best practices

- ใช้ `Reflect.*` ภายใน proxy traps
- จำกัด Proxy ไว้ที่ boundary หรือ infrastructure layer
- เขียน tests สำหรับ edge cases ของ traps
- ใช้ private fields เมื่อต้องการ encapsulation ที่แท้จริง

## Workshop

สร้าง configuration object ที่:

1. ป้องกัน key ที่ไม่อยู่ใน schema
2. validate type ก่อนกำหนดค่า
3. log การอ่านค่าที่สำคัญ
4. ใช้ Symbol เก็บ metadata ภายใน

## Checklist

- [ ] เข้าใจความแตกต่างระหว่าง Symbol กับ string key
- [ ] ใช้ well-known symbols ได้
- [ ] ใช้ Reflect คู่กับ Proxy ได้
- [ ] อธิบายข้อจำกัดด้าน performance และ debugging ได้

## Official references

- <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol>
- <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Reflect>
- <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy>
