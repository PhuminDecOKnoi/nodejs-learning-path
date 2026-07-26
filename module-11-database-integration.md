# Module 11: Database Integration

> Baseline: Node.js 24 LTS • MongoDB Driver 7.x / MySQL2 3.x • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะเชื่อมต่อฐานข้อมูลผ่าน environment variables, ใช้ connection pool, parameterized query และแยก data-access layer ออกจาก route ได้

## Choose the right database

- **Relational database:** MySQL/PostgreSQL เหมาะกับ transaction, relationship และ schema ที่ชัดเจน
- **Document database:** MongoDB เหมาะกับ document model และ schema ที่ยืดหยุ่น

การเลือกฐานข้อมูลควรพิจารณา consistency, query pattern, transaction, operations และทีม ไม่ใช่เลือกเพราะกระแส

## MongoDB official driver

```bash
npm install mongodb@7
```

```js
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

await client.connect();
const users = client.db("learning").collection("users");

const result = await users.insertOne({
  name: "Phumin",
  createdAt: new Date()
});

const user = await users.findOne({ _id: result.insertedId });
console.log(user);
```

MongoDB Driver 7 ต้องการ Node.js อย่างน้อย 20.19.0 ซึ่งสอดคล้องกับ baseline Node.js 24 LTS

## MySQL with mysql2

```bash
npm install mysql2@3
```

```js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 10,
  enableKeepAlive: true
});

const [rows] = await pool.execute(
  "SELECT id, name FROM users WHERE email = ? LIMIT 1",
  ["user@example.com"]
);

console.log(rows[0] ?? null);
```

ใช้ placeholder/parameterized query ห้ามต่อ SQL จาก user input โดยตรง

## Data-access boundary

```js
export class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async findByEmail(email) {
    return this.collection.findOne({ email });
  }
}
```

Route ไม่ควรรู้รายละเอียด query ทั้งหมด ควรเรียก repository/service เพื่อให้ทดสอบและเปลี่ยนฐานข้อมูลได้ง่ายขึ้น

## Operational guidance

- เก็บ URI/credential ใน secret manager หรือ environment
- connect ตอน startup และ reuse pool/client
- กำหนด timeout และ graceful shutdown
- สร้าง index ตาม query pattern
- ใช้ migration สำหรับ relational schema
- backup และทดสอบ restore
- หลีกเลี่ยง N+1 query

## Checklist

- [ ] เชื่อม MongoDB หรือ MySQL ผ่าน environment ได้
- [ ] ใช้ connection pool/client reuse ได้
- [ ] ใช้ parameterized query ได้
- [ ] แยก repository/service ออกจาก route ได้
- [ ] อธิบาย index, transaction และ backup ได้

## Official references

- MongoDB Node.js Driver: <https://www.mongodb.com/docs/drivers/node/current/>
- MySQL2: <https://sidorares.github.io/node-mysql2/docs>
