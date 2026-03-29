# Module 16: Deployment with Git and GitHub

## 1. Overview
Module นี้สอนการใช้ Git และ GitHub สำหรับ deploy และ version control
เพื่อจัดการ source code และทำ CI/CD workflow

หัวข้อหลัก:
- Git basics
- repository
- commit workflow
- GitHub integration
- deployment flow
- collaboration

---

## 2. Why Git
ประโยชน์:
- version control
- backup code
- collaboration
- deployment integration
- rollback version

---

## 3. Install Git
Download:
https://git-scm.com/

ตรวจสอบ
```bash
git --version
```

---

## 4. Initialize Repository
```bash
git init
```

สร้าง .gitignore
```
node_modules
.env
logs
```

---

## 5. Git Workflow
```bash
git add .
git commit -m "initial commit"
```

---

## 6. Connect to GitHub
สร้าง repository บน GitHub

เชื่อมต่อ
```bash
git remote add origin https://github.com/username/node-app.git
```

push
```bash
git push -u origin main
```

---

## 7. Branching
สร้าง branch
```bash
git checkout -b feature-auth
```

merge
```bash
git checkout main
git merge feature-auth
```

---

## 8. Pull Updates
```bash
git pull origin main
```

---

## 9. Deployment Flow
```
Local → Git commit → GitHub → Deploy platform → Production
```

---

## 10. GitHub Structure
```
repository
 ├── src
 ├── routes
 ├── controllers
 ├── models
 ├── package.json
 └── README.md
```

---

## 11. README Template
```
# Node.js API

## Installation
npm install

## Run
npm start

## Environment
.env

## API
/users
/auth
```

---

## 12. GitHub Best Practices
- commit small changes
- meaningful commit message
- use branches
- pull before push
- ignore secrets

---

## 13. Learning Checklist
- [ ] init git
- [ ] commit code
- [ ] push GitHub
- [ ] create branch
- [ ] merge branch
- [ ] pull changes
- [ ] deploy via GitHub

---

## 14. Next Module
Module 17: CI/CD Automation
