# Module 13: Deployment and Production

> Baseline: Node.js 24 LTS • Cloud/container-ready • Updated: 2026-07-26

## Learning outcomes

ผู้เรียนจะเตรียม Node.js application สำหรับ production, ใช้ environment configuration, health checks, graceful shutdown, containers และ CI/CD ได้อย่างเป็นระบบ

## Production baseline

- ใช้ Node.js 24 LTS และ pin version ผ่าน `.nvmrc`, `engines` หรือ container image
- ติดตั้ง dependency ด้วย `npm ci`
- ตั้ง `NODE_ENV=production`
- แยก configuration ออกจาก source code
- ใช้ HTTPS ผ่าน platform/reverse proxy
- ไม่ใช้ development server หรือ hot reload ใน production

## Start script

```json
{
  "scripts": {
    "start": "node src/app.js",
    "test": "node --test"
  }
}
```

Application ต้องอ่าน port จาก environment:

```js
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
```

## Health and readiness

```js
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/ready", async (req, res) => {
  const databaseReady = await database.ping();
  res.status(databaseReady ? 200 : 503).json({ databaseReady });
});
```

Health ใช้ตรวจ process ส่วน readiness ใช้ตรวจว่ารับ traffic ได้จริง

## Graceful shutdown

```js
const server = app.listen(port);

async function shutdown(signal) {
  console.log({ signal, event: "shutdown_started" });

  server.close(async () => {
    await database.close();
    process.exit(0);
  });

  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
```

หยุดรับ request ใหม่ รอ request เดิมตาม timeout แล้วปิด database/message broker

## Container example

```dockerfile
FROM node:24.18.0-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
USER node
ENV NODE_ENV=production
CMD ["node", "src/app.js"]
```

ควรมี `.dockerignore` และไม่ copy `.env`, `.git`, logs หรือ `node_modules`

## CI/CD gates

```text
install → lint/type-check → test → security scan → build image → deploy → smoke test
```

ใช้ immutable artifact เดียวกันระหว่าง staging และ production และรองรับ rollback

## Operational checklist

- structured logs ไป stdout/stderr
- request ID/correlation ID
- metrics: latency, traffic, errors, saturation
- alert จาก user impact ไม่ใช่ CPU อย่างเดียว
- backup และ restore test
- dependency/security update cadence
- least-privilege runtime identity

## Checklist

- [ ] pin Node.js LTS ได้
- [ ] ใช้ `npm ci` และ production dependencies ได้
- [ ] มี health/readiness endpoint
- [ ] รองรับ graceful shutdown
- [ ] สร้าง minimal container image ได้
- [ ] อธิบาย CI/CD และ rollback ได้

## Official references

- Node.js Docker image: <https://hub.docker.com/_/node>
- Node.js diagnostics: <https://nodejs.org/docs/latest-v24.x/api/report.html>
