# Module 17: CI/CD Automation

## 1. Overview
Module นี้สอนการทำ CI/CD สำหรับ Node.js
เพื่อให้ระบบ build, test และ deploy อัตโนมัติ

หัวข้อหลัก:
- CI/CD concept
- GitHub Actions
- automated testing
- build pipeline
- deployment automation

---

## 2. CI vs CD
CI = Continuous Integration
- run test อัตโนมัติ
- check code quality

CD = Continuous Deployment
- deploy อัตโนมัติ
- update production

---

## 3. CI/CD Flow
```
Developer push code
        ↓
GitHub
        ↓
Run tests
        ↓
Build
        ↓
Deploy
        ↓
Production
```

---

## 4. GitHub Actions
สร้างโฟลเดอร์
```
.github/workflows
```

สร้างไฟล์
```
ci.yml
```

---

## 5. Basic CI Workflow
.github/workflows/ci.yml
```yaml
name: Node.js CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - run: npm install
    - run: npm test
```

---

## 6. CI with Build
```yaml
- run: npm run build
```

---

## 7. Auto Deploy Example
```yaml
- name: Deploy
  run: echo "Deploying..."
```

---

## 8. CI/CD Structure
```
project
 ├── .github
 │   └── workflows
 │       └── ci.yml
 ├── src
 ├── tests
 └── package.json
```

---

## 9. Environment Secrets
GitHub Settings → Secrets

```
DB_URL
JWT_SECRET
API_KEY
```

---

## 10. Production Pipeline
```
push → test → build → deploy → production
```

---

## 11. Best Practices
- run test ทุก commit
- build ก่อน deploy
- ใช้ secrets
- use branch protection
- deploy main branch

---

## 12. Learning Checklist
- [ ] เข้าใจ CI/CD
- [ ] สร้าง GitHub Actions ได้
- [ ] run test อัตโนมัติ
- [ ] build pipeline
- [ ] auto deploy
- [ ] ใช้ secrets

---

## 13. Course Completed
คุณพร้อมสำหรับ:
- Production deployment
- Enterprise backend
- CI/CD pipeline
- DevOps workflow
