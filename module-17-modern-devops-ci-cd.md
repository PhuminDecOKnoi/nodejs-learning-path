# Module 17: Modern DevOps and CI/CD with GitHub Actions

> Baseline: GitHub Actions, Node.js 24 LTS, reproducible installs, automated testing, security scanning, artifacts, environments and controlled deployment.

## 1. Learning objectives

เมื่อเรียนจบ Module นี้ ผู้เรียนจะสามารถ:

- อธิบาย CI, Continuous Delivery และ Continuous Deployment ได้
- สร้าง GitHub Actions workflow สำหรับ Node.js
- ใช้ `npm ci`, cache, matrix และ artifacts
- กำหนด permissions และ secrets แบบ least privilege
- เพิ่ม CodeQL, Dependabot และ dependency auditing
- ใช้ environments, approvals, OIDC และ deployment protection
- วาง rollback strategy และ observability หลัง deploy

## 2. CI/CD pipeline

```text
Commit / Pull Request
        ↓
Install dependencies
        ↓
Static checks
        ↓
Unit + integration tests
        ↓
Security checks
        ↓
Build / package artifact
        ↓
Deploy to staging
        ↓
Smoke test
        ↓
Approval
        ↓
Deploy to production
        ↓
Observe + rollback when needed
```

## 3. Workflow file location

GitHub Actions workflow ต้องอยู่ใน:

```text
.github/workflows/*.yml
```

ตัวอย่าง trigger:

```yaml
name: Node.js CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  workflow_dispatch:
```

`workflow_dispatch` ทำให้ผู้มีสิทธิ์สั่งรัน workflow ด้วยตนเองจาก GitHub UI ได้

## 4. Minimal Node.js CI

```yaml
name: Node.js CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Install dependencies reproducibly
        run: npm ci

      - name: Check syntax
        run: npm run check

      - name: Run tests
        run: npm test
```

เหตุผลที่ใช้ `npm ci`:

- ต้องมี `package-lock.json`
- ติดตั้งตาม lockfile อย่างเคร่งครัด
- ไม่แก้ lockfile ระหว่าง CI
- เหมาะกับ reproducible build มากกว่า `npm install`

## 5. Matrix testing

ทดสอบหลาย Node.js release line:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        node-version: [22, 24]

    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test
```

สำหรับ repository ที่ประกาศรองรับเฉพาะ Node.js 24 ควรทดสอบ exact baseline หรือสาย `24.x`; matrix หลายรุ่นเหมาะเมื่อ package ต้องรองรับหลาย LTS lines

## 6. Job dependency

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "run tests"

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: echo "build only after tests pass"
```

`needs` ทำให้ pipeline แสดง dependency ระหว่าง jobs อย่างชัดเจน

## 7. Cache

`actions/setup-node` สามารถ cache npm download data ได้:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version-file: .nvmrc
    cache: npm
    cache-dependency-path: package-lock.json
```

> ไม่ควร cache `node_modules` โดยไม่จำเป็น เพราะอาจเกิดปัญหา native module, OS และ Node ABI ไม่ตรงกัน

## 8. Service container สำหรับ integration test

ตัวอย่าง MySQL service:

```yaml
jobs:
  integration:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.4
        env:
          MYSQL_ROOT_PASSWORD: test-root-password
          MYSQL_DATABASE: app_test
          MYSQL_USER: app
          MYSQL_PASSWORD: test-password
        ports:
          - 3306:3306
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=10

    env:
      DATABASE_URL: mysql://app:test-password@127.0.0.1:3306/app_test

    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm test
```

ค่าที่ใช้ใน CI ต้องเป็นข้อมูลทดสอบ ไม่ใช่ production credential

## 9. Artifacts

Artifacts ใช้ส่งผลลัพธ์ระหว่าง jobs หรือเก็บไฟล์ตรวจสอบ:

```yaml
- name: Upload test coverage
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
    retention-days: 14
```

ตัวอย่าง artifact:

- coverage report
- test report
- build output
- SBOM
- deployment manifest

ห้ามใส่ `.env`, private keys หรือไฟล์ที่มี secret ใน artifact

## 10. Workflow permissions

กำหนดสิทธิ์ต่ำสุดที่จำเป็น:

```yaml
permissions:
  contents: read
```

หากต้อง publish package:

```yaml
permissions:
  contents: read
  id-token: write
```

ไม่ควรใช้ `write-all` เป็นค่าเริ่มต้น

## 11. Secrets, variables และ environments

- **Secrets:** credential ที่ต้องปกปิด
- **Variables:** configuration ที่ไม่เป็นความลับ
- **Environments:** กลุ่มการตั้งค่า deployment เช่น `staging` และ `production`

ตัวอย่าง:

```yaml
jobs:
  deploy:
    environment: production
    env:
      APP_ENV: production
      DEPLOY_REGION: ${{ vars.DEPLOY_REGION }}
    steps:
      - name: Deploy
        run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

หลีกเลี่ยงการ echo secret และอย่าเปิด shell tracing เมื่อคำสั่งมี credential

## 12. OIDC แทน long-lived cloud key

แนวทางสมัยใหม่คือใช้ OpenID Connect ให้ GitHub Actions ขอ short-lived cloud credential แทนการเก็บ access key อายุยาว

ข้อดี:

- ลดความเสี่ยง secret รั่ว
- credential มีอายุสั้น
- จำกัด repository, branch และ environment ได้
- audit ได้ชัดเจนกว่า static key

## 13. CodeQL

ตัวอย่าง security scan:

```yaml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: "20 3 * * 1"

permissions:
  contents: read
  security-events: write

jobs:
  analyze:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v6
      - uses: github/codeql-action/init@v4
        with:
          languages: javascript-typescript
      - uses: github/codeql-action/analyze@v4
```

## 14. Dependency audit

```yaml
- name: Audit production dependencies
  run: npm audit --omit=dev --audit-level=high
```

ข้อควรระวัง:

- `npm audit` เป็นสัญญาณหนึ่ง ไม่ใช่ข้อสรุปทั้งหมด
- ตรวจ exploitability ในบริบทของระบบจริง
- ห้ามใช้ `npm audit fix --force` ใน CI โดยอัตโนมัติ เพราะอาจเปลี่ยน major version และทำระบบพัง

## 15. Pull request security

Workflow ที่รันจาก fork ต้องระวัง:

- อย่าเปิด secret ให้ untrusted code
- หลีกเลี่ยง `pull_request_target` เมื่อ checkout และรันโค้ดจาก PR โดยตรง
- pin third-party actions เป็น major version หรือ commit SHA ตามระดับความเสี่ยง
- review workflow change อย่างเข้มงวด เพราะ workflow สามารถเข้าถึง token และ environment ได้

## 16. Container build

ตัวอย่าง Dockerfile:

```dockerfile
FROM node:24-alpine AS runtime

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY examples/express-ejs ./examples/express-ejs

ENV NODE_ENV=production
USER node

CMD ["node", "examples/express-ejs/src/app.js"]
```

แนวปฏิบัติ:

- pin Node.js major/LTS line
- ใช้ `.dockerignore`
- run เป็น non-root user
- ไม่ copy `.env`
- ใช้ multi-stage build เมื่อมี build step
- scan image และ base image

## 17. Deployment environments

```yaml
jobs:
  deploy-staging:
    needs: test
    environment: staging
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy staging"

  deploy-production:
    needs: deploy-staging
    environment: production
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy production after approval"
```

Production environment ควรมี:

- required reviewer
- restricted deployment branch/tag
- environment-specific secrets
- audit trail

## 18. Deployment strategies

### Rolling deployment
แทน instance ทีละส่วน ลด downtime แต่ต้องรองรับ version coexistence

### Blue-green deployment
มี environment สองชุด สลับ traffic เมื่อชุดใหม่ผ่าน smoke test rollback ได้เร็ว

### Canary deployment
ส่ง traffic ส่วนน้อยให้รุ่นใหม่ก่อน แล้วค่อยเพิ่มตาม metrics

## 19. Database migration safety

ใช้แนวคิด expand-and-contract:

1. เพิ่ม schema ที่ backward-compatible
2. deploy application ที่รองรับ schema เก่าและใหม่
3. migrate/backfill data
4. ตรวจ metrics และ data integrity
5. ลบ schema เก่าใน release ถัดไป

อย่าทำ destructive migration พร้อม application deployment โดยไม่มี rollback plan

## 20. Smoke test หลัง deploy

```bash
curl --fail --silent --show-error https://example.com/api/health
```

Smoke test ควรตรวจ:

- process ตอบสนอง
- database dependency พร้อมใช้งาน
- critical endpoint ทำงาน
- version/commit ที่ deploy ถูกต้อง

## 21. Rollback plan

ทุก production deployment ต้องรู้ว่า:

- artifact รุ่นก่อนอยู่ที่ไหน
- rollback command คืออะไร
- database migration rollback ได้หรือไม่
- feature flag ปิดความสามารถใหม่ได้หรือไม่
- ใครเป็นผู้อนุมัติ incident action

## 22. Observability หลัง deploy

ตรวจอย่างน้อย:

- error rate
- latency percentiles
- request throughput
- CPU/memory
- database pool saturation
- queue depth
- external API failure
- business KPI ที่เกี่ยวข้อง

CI/CD ที่ดีไม่ได้จบเมื่อ deploy สำเร็จ แต่ต้องยืนยันว่าระบบทำงานถูกต้องหลัง deploy

## 23. Reusable workflows

เมื่อหลาย repository ใช้ pipeline เดียวกัน สามารถสร้าง reusable workflow:

```yaml
on:
  workflow_call:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm test
```

## 24. CI/CD checklist

- [ ] workflow ใช้ `npm ci`
- [ ] Node.js version ชัดเจน
- [ ] permissions เป็น least privilege
- [ ] tests และ security checks ผ่านก่อน merge
- [ ] workflow จาก untrusted PR ไม่ได้ secret
- [ ] artifacts ไม่มีข้อมูลลับ
- [ ] production ใช้ environment protection
- [ ] มี smoke test และ rollback plan
- [ ] หลัง deploy มี observability

## 25. Workshop

สร้าง `.github/workflows/ci.yml` ที่:

1. trigger เมื่อ push/PR
2. ใช้ Node.js จาก `.nvmrc`
3. cache npm
4. รัน `npm ci`
5. รัน syntax check และ tests
6. upload test report เมื่อ test ล้มเหลวหรือสำเร็จ
7. จำกัด permissions เป็น `contents: read`

## 26. Official references

- GitHub Docs: Workflow syntax, Node.js CI, environments, permissions and OIDC
- Node.js documentation: test runner and runtime diagnostics
- npm documentation: `npm ci` and dependency auditing

---

Next: **Module 18 — AI-powered Node.js Development**
