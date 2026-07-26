# Module 16: Modern Git and GitHub Workflow

> Baseline: GitHub Flow, protected branches/rulesets, Conventional Commits, Semantic Versioning, pull-request review and supply-chain hygiene.

## 1. Learning objectives

เมื่อเรียนจบ Module นี้ ผู้เรียนจะสามารถ:

- อธิบายความแตกต่างระหว่าง working tree, staging area, commit และ remote ได้
- ใช้ branch และ pull request ตาม GitHub Flow
- เขียน commit message แบบ Conventional Commits
- ใช้ Semantic Versioning และ Git tags
- ตั้งค่า CODEOWNERS, issue templates และ pull-request templates
- เข้าใจ branch protection/rulesets, required reviews และ required status checks
- ใช้ Dependabot และ security features อย่างเหมาะสม

## 2. Git mental model

```text
Working directory
      ↓ git add
Staging area (index)
      ↓ git commit
Local repository
      ↓ git push
Remote repository (GitHub)
```

Git เก็บประวัติเป็น commit graph ไม่ใช่การบันทึกไฟล์แยกแบบสำรองข้อมูลธรรมดา ทุก commit อ้างถึง tree, parent commit และ metadata ของผู้เขียน

## 3. เริ่มต้น repository

```bash
# สร้าง repository ใหม่
git init

# ตรวจสถานะไฟล์
git status

# เพิ่มไฟล์เข้า staging area
git add README.md package.json

# สร้าง commit
git commit -m "docs: initialize Node.js learning repository"
```

> ไม่ควรใช้ `git add .` โดยไม่ตรวจ `git status` ก่อน เพราะอาจ stage secret, build output หรือไฟล์ที่ไม่เกี่ยวข้อง

## 4. `.gitignore` สำหรับ Node.js

```gitignore
node_modules/
.env
.env.*
!.env.example
coverage/
dist/
build/
*.log
.DS_Store
.vscode/
```

ห้าม commit API key, database password, private key หรือ production credential ลง Git แม้จะลบใน commit ถัดไป เพราะข้อมูลยังคงอยู่ในประวัติเดิม

## 5. Branch naming

รูปแบบที่แนะนำ:

```text
feature/add-health-endpoint
fix/handle-database-timeout
docs/update-module-16
refactor/split-user-service
chore/upgrade-dependencies
```

สร้าง branch:

```bash
git switch -c feature/add-health-endpoint
```

กลับไป branch หลัก:

```bash
git switch main
```

## 6. GitHub Flow

```text
main
 └─ create short-lived branch
      └─ commit small changes
           └─ push branch
                └─ open pull request
                     └─ review + CI
                          └─ merge
                               └─ delete branch
```

หลักสำคัญ:

1. `main` ต้องอยู่ในสถานะ deployable
2. งานใหม่ทำบน short-lived branch
3. เปิด PR เพื่อให้ตรวจ diff และผล CI
4. merge เมื่อ review และ checks ผ่าน
5. หลีกเลี่ยง branch ที่อยู่ยาวจนแตกต่างจาก `main` มากเกินไป

## 7. Commit message แบบ Conventional Commits

```text
<type>(optional-scope): <description>
```

ตัวอย่าง:

```text
feat(api): add health endpoint
fix(auth): reject expired refresh token
docs(module-16): explain GitHub Flow
test(user): add registration validation tests
refactor(db): isolate connection pool
chore(deps): update Express
```

ประเภทที่ใช้บ่อย:

| Type | ความหมาย |
|---|---|
| `feat` | เพิ่มความสามารถใหม่ |
| `fix` | แก้ข้อผิดพลาด |
| `docs` | ปรับเอกสาร |
| `test` | เพิ่มหรือแก้ tests |
| `refactor` | ปรับโครงสร้างโดยไม่เปลี่ยนพฤติกรรมภายนอก |
| `chore` | งานบำรุงรักษาและ dependency |
| `ci` | เปลี่ยน workflow/CI |

## 8. Pull request ที่ตรวจสอบง่าย

PR ที่ดีควรมี:

- ชื่อที่สรุปผลลัพธ์ของการเปลี่ยนแปลง
- เหตุผลและขอบเขต
- รายการไฟล์หรือส่วนสำคัญที่เปลี่ยน
- วิธีทดสอบ
- ความเสี่ยงและวิธี rollback
- ภาพหน้าจอสำหรับ UI change
- PR ขนาดเล็กพอให้ reviewer เข้าใจได้

ตัวอย่าง PR template:

```markdown
## What changed

## Why

## Validation
- [ ] `npm ci`
- [ ] `npm test`
- [ ] `npm run check`

## Risk and rollback
```

## 9. Code review checklist

Reviewer ควรตรวจ:

- correctness และ edge cases
- input validation และ error handling
- secret/PII leakage
- SQL injection, XSS, SSRF และ authorization checks
- test coverage ที่เหมาะสม
- backward compatibility
- dependency และ license implications
- readability และ maintainability

Review ควรชี้ปัญหาที่ actionable เช่น:

```text
Please validate `req.params.id` before passing it to the repository.
An invalid value currently reaches the database layer and returns 500 instead of 400.
```

## 10. CODEOWNERS

สร้าง `.github/CODEOWNERS`:

```text
# Default owner
* @PhuminDecOKnoi

# Security-sensitive files
/.github/ @PhuminDecOKnoi
/package.json @PhuminDecOKnoi
/examples/ @PhuminDecOKnoi
```

CODEOWNERS ช่วยร้องขอ review อัตโนมัติ และสามารถทำงานร่วมกับ branch protection/rulesets เพื่อบังคับ approval จากผู้รับผิดชอบไฟล์

## 11. Branch protection และ rulesets

ค่าที่เหมาะกับ `main`:

- Require a pull request before merging
- Require at least one approval
- Dismiss stale approvals after new commits
- Require status checks to pass
- Require conversation resolution
- Block force pushes
- Block branch deletion
- Require review from Code Owners เมื่อมีผู้ร่วมพัฒนาหลายคน

> สำหรับ repository ส่วนบุคคลที่ทำงานคนเดียว อาจลดจำนวน approvals แต่ยังควรบังคับ CI และป้องกัน force push บน `main`

## 12. Merge strategy

| Strategy | เหมาะกับ |
|---|---|
| Squash merge | ทำให้ `main` มี commit ประวัติอ่านง่าย เหมาะกับ PR ทั่วไป |
| Rebase merge | ต้องการ commit เดิมแต่ไม่ต้องการ merge commit |
| Merge commit | ต้องการเก็บ topology และประวัติ branch |

สำหรับ learning repository นี้ แนะนำ **Squash merge** พร้อม PR title แบบ Conventional Commit

## 13. Semantic Versioning และ tags

รูปแบบ:

```text
MAJOR.MINOR.PATCH
```

- MAJOR: breaking change
- MINOR: feature ใหม่ที่ backward-compatible
- PATCH: bug fix ที่ backward-compatible

ตัวอย่าง:

```bash
# สร้าง annotated tag
git tag -a v2.2.0 -m "Node.js learning path v2.2.0"

# ส่ง tag ไป GitHub
git push origin v2.2.0
```

## 14. GitHub Releases

Release ที่ดีควรมี:

- version/tag
- summary
- breaking changes
- added/changed/fixed
- upgrade instructions
- artifacts และ checksums เมื่อมี binary

ตัวอย่าง changelog:

```markdown
## Added
- Module 16: Modern Git and GitHub Workflow
- Module 17: Modern DevOps and CI/CD
- Module 18: AI-powered Node.js Development

## Changed
- Updated GitHub Actions examples
```

## 15. Issue management

สร้าง `.github/ISSUE_TEMPLATE/bug_report.yml` หรือ Markdown template เพื่อเก็บข้อมูลที่จำเป็น เช่น:

- expected behavior
- actual behavior
- reproduction steps
- Node.js/npm version
- operating system
- logs ที่ลบ secret แล้ว

ใช้ labels เช่น:

```text
bug
documentation
enhancement
security
good first issue
needs reproduction
```

## 16. Dependabot และ dependency review

ตัวอย่าง `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: monthly
```

แนวปฏิบัติ:

- ตรวจ changelog และ breaking changes ก่อน merge
- รัน tests ทุกครั้ง
- ไม่ merge dependency PR เพียงเพราะ CI ผ่าน
- ใช้ lockfile และ `npm ci` ใน CI
- ตรวจ license และ transitive dependency risk

## 17. Repository governance files

```text
README.md
LICENSE
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md
CHANGELOG.md
.github/CODEOWNERS
.github/pull_request_template.md
.github/ISSUE_TEMPLATE/
.github/workflows/
```

## 18. Workshop

1. สร้าง branch `docs/module-16-workshop`
2. แก้เอกสารหนึ่งจุด
3. commit ด้วย Conventional Commit
4. push และเปิด PR
5. ตรวจ diff และ CI
6. squash merge
7. สร้าง tag รุ่นใหม่

## 19. Learning checklist

- [ ] อธิบาย staging area และ commit graph ได้
- [ ] ใช้ GitHub Flow ได้
- [ ] เขียน Conventional Commit ได้
- [ ] เปิด PR ที่มี validation plan ได้
- [ ] เข้าใจ CODEOWNERS และ branch protection
- [ ] ใช้ Semantic Versioning และ tags ได้
- [ ] ตรวจ dependency PR อย่างมีเหตุผลได้

## 20. Official references

- GitHub Docs: Git, pull requests, protected branches, rulesets and CODEOWNERS
- Conventional Commits specification
- Semantic Versioning specification

---

Next: **Module 17 — Modern DevOps and CI/CD with GitHub Actions**
