# Node.js Learning Path — Version Audit

> Audit date: 2026-07-28  
> Production baseline: Node.js 24.18.0 LTS (Krypton)  
> Evaluation baseline: Node.js 26.5.0 Current  
> Package manager baseline: npm 11.x  
> Repository license: MIT

## Version policy

- ใช้ Node.js 24 LTS เป็นฐานสำหรับบทเรียน การทดลอง และ production examples
- ใช้ Node.js 26 Current เฉพาะหัวข้อประเมินฟีเจอร์ใหม่และ compatibility testing
- ไม่ใช้ Node.js รุ่น EOL เป็นฐานของตัวอย่างใหม่
- ใช้ ESM เป็นค่าเริ่มต้น และอธิบาย CommonJS เพื่อรองรับ legacy maintenance
- ใช้ built-in APIs ก่อนเพิ่ม dependency เมื่อ API นั้น stable และเหมาะกับงาน
- dependency versions ให้ใช้ major line ที่ตรวจสอบแล้ว และติดตั้งผ่าน lockfile ด้วย `npm ci`

## Module-by-module audit

| Module | Topic | Verified 2026 baseline |
|---:|---|---|
| 1 | Introduction to Node.js | Node.js 24 LTS, V8, libuv, event loop, worker pool, worker threads, LTS vs Current |
| 2 | Environment setup | Node.js 24.18.0, npm 11.x, version manager, ESM project setup |
| 3 | Modules and npm | ESM-first, CommonJS interoperability, lockfile and dependency hygiene |
| 4 | File system, JSON and CLI | `node:fs/promises`, safe JSON handling, validated CLI input |
| 5 | Debugging and errors | modern stack traces, error causes, inspector and actionable diagnostics |
| 6 | Asynchronous programming | Promise, `async`/`await`, cancellation, timeout and concurrency control |
| 7 | HTTP requests and APIs | built-in `fetch`, `AbortSignal`, status validation and resilient API clients |
| 8 | Express web server | Express 5.x, async error flow and built-in body parsers |
| 9 | HTML, static assets and templating | HTML5, Express static assets and EJS 6.x guidance |
| 10 | REST API design | resource-oriented routing, validation, status codes and consistent errors |
| 11 | Database integration | `mysql2` 3.x, MongoDB Driver 7.x, pooling, transactions and parameterized queries |
| 12 | Authentication and security | password hashing, session/token controls, least privilege and secure headers |
| 13 | Deployment and production | graceful shutdown, health/readiness, environment config and container guidance |
| 14 | Testing and production debugging | stable `node:test`, coverage, mocking, diagnostics and production troubleshooting |
| 15 | Project structure | layered architecture, configuration boundaries, validation and maintainability |
| 16 | Git and GitHub workflow | GitHub Flow, rulesets, CODEOWNERS, Conventional Commits and releases |
| 17 | DevOps and CI/CD | GitHub Actions, `npm ci`, least-privilege permissions, CodeQL and deployment controls |
| 18 | AI-powered Node.js | OpenAI Responses API, streaming, Structured Outputs, tools, RAG and AI governance |

## Current-release evaluation notes

Node.js 26 is not the production baseline for this course while it remains Current. Features unique to Node.js 26, including newly enabled or early-development capabilities, must be labelled clearly and must not be required by the core exercises.

Examples intended for Node.js 24 LTS must continue to pass:

```bash
npm ci
npm run check
npm test
```

## Dependency policy

| Component | Approved line |
|---|---|
| Node.js | 24.18.x LTS |
| npm | 11.x |
| Express | 5.x |
| EJS | 6.x |
| mysql2 | 3.x |
| MongoDB Node.js Driver | 7.x |
| Socket.IO | 4.8.x |
| OpenAI JavaScript SDK | Current supported SDK with Responses API examples |

Exact package versions are controlled by `package-lock.json`; documentation should generally describe the supported major line unless an exact version is operationally required.

## Re-audit triggers

Re-run this audit when any of the following occurs:

1. Node.js 26 enters LTS.
2. Node.js 24 changes support phase.
3. Express, EJS, mysql2, MongoDB Driver or Socket.IO publishes a new major release.
4. OpenAI changes the recommended JavaScript API surface.
5. GitHub Actions publishes a new major version of an action used by this repository.
6. A security advisory affects the runtime or a direct dependency.

## Official source families

- Node.js release schedule and API documentation
- Express migration and API documentation
- npm CLI documentation
- GitHub Actions and repository governance documentation
- OpenAI platform documentation

This audit applies to the original content of this repository. Third-party dependencies retain their own licenses and support policies.
