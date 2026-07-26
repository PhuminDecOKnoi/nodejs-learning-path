# Node.js Learning Path

> Consolidated and version-audited professional learning repository for modern Node.js backend, GitHub, DevOps and AI development.

[![Node.js](https://img.shields.io/badge/Node.js-24.18.0%20LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.2.0-orange.svg)](package.json)

## ภาพรวม

Repository นี้รวมสื่อ Node.js เดิมของ `PhuminDecOKnoi` และปรับหลักสูตร Module 1–18 ให้สอดคล้องกับ Node.js 24 LTS และแนวปฏิบัติปี 2026 โดยครอบคลุม ESM, Promise/`async`–`await`, built-in `fetch`, Express 5, database integration, security, built-in Node.js test runner, GitHub governance, CI/CD และ AI-powered development

## Source repositories

- `my-first-node.js`
- `my-express-node.js`
- `my-ejs-node.js`
- `Alison-Beginning-Node-JS-Using-a-Game-Project`
- `Beginning-Node-JS-Using-a-Game-Project-Game-only-`
- `nodejs-learning-path`

รายละเอียดการรวมและสิ่งที่เลิกใช้อยู่ใน [MIGRATION.md](MIGRATION.md)

## Technology baseline

| Component | Version / Policy |
|---|---|
| Node.js | `24.18.0 LTS` |
| npm | `11.x` ตาม Node.js distribution |
| Module system | ESM-first; อธิบาย CommonJS เพื่อรองรับ legacy code |
| Express | `5.x` |
| EJS | `6.x` |
| MongoDB Node.js Driver | `7.x` |
| MySQL client | `mysql2 3.x` |
| Socket.IO | `4.8.x` |
| Test runner | built-in `node:test` |
| Development watch | built-in `node --watch` |
| GitHub Actions | `actions/checkout@v6`, `actions/setup-node@v4` |
| AI API baseline | OpenAI Responses API, streaming, tools and Structured Outputs |
| License | MIT |

> สำหรับ production ให้ใช้สาย Node.js LTS ที่ยังได้รับการสนับสนุน ส่วน Current เหมาะสำหรับทดลองและประเมินความเข้ากันได้

## Current repository structure

```text
nodejs-learning-path/
├── README.md
├── LICENSE
├── MIGRATION.md
├── package.json
├── package-lock.json
├── .nvmrc
├── module-01-introduction-nodejs.md
├── module-02-environment-setup.md
├── module-03-modules-require-exports-npm.md
├── module-04-file-system-json-cli.md
├── module-05-debugging-and-error-reading.md
├── module-06-asynchronous-programming.md
├── module-07-http-requests-and-apis.md
├── module-08-express-web-server.md
├── module-09-html-static-templating.md
├── module-10-rest-api-design-routing.md
├── module-11-database-integration.md
├── module-12-authentication-security.md
├── module-13-deployment-production.md
├── module-14-testing-debugging-production.md
├── module-15-project-structure-best-practices.md
├── module-16-git-github-workflow.md
├── module-17-modern-devops-ci-cd.md
├── module-18-ai-powered-nodejs-development.md
└── examples/
    └── express-ejs/
```

## Getting started

```bash
nvm install
nvm use
npm ci
npm run dev
```

เปิด:

```text
http://localhost:3000
```

ตรวจ health endpoint:

```text
http://localhost:3000/health
```

## Learning path

1. [Introduction to Node.js](module-01-introduction-nodejs.md)
2. [Environment Setup and First Script](module-02-environment-setup.md)
3. [Modules, ESM, CommonJS and npm](module-03-modules-require-exports-npm.md)
4. [File System, JSON and CLI](module-04-file-system-json-cli.md)
5. [Debugging and Error Reading](module-05-debugging-and-error-reading.md)
6. [Asynchronous Programming](module-06-asynchronous-programming.md)
7. [HTTP Requests and APIs](module-07-http-requests-and-apis.md)
8. [Web Servers with Express 5](module-08-express-web-server.md)
9. [HTML5, Static Assets and EJS](module-09-html-static-templating.md)
10. [REST API Design and Routing](module-10-rest-api-design-routing.md)
11. [Database Integration](module-11-database-integration.md)
12. [Authentication and Security](module-12-authentication-security.md)
13. [Deployment and Production](module-13-deployment-production.md)
14. [Testing and Production Debugging](module-14-testing-debugging-production.md)
15. [Project Structure and Best Practices](module-15-project-structure-best-practices.md)
16. [Modern Git and GitHub Workflow](module-16-git-github-workflow.md)
17. [Modern DevOps and CI/CD](module-17-modern-devops-ci-cd.md)
18. [AI-powered Node.js Development](module-18-ai-powered-nodejs-development.md)

## Modules 16–18 highlights

### Module 16 — Modern Git and GitHub Workflow

- Git mental model and GitHub Flow
- branch naming and Conventional Commits
- pull-request review
- CODEOWNERS and rulesets/branch protection
- Semantic Versioning, tags and releases
- Dependabot and repository governance

### Module 17 — Modern DevOps and CI/CD

- GitHub Actions using current official action versions
- reproducible installation with `npm ci`
- matrix testing, caching, service containers and artifacts
- least-privilege workflow permissions
- CodeQL, dependency auditing and supply-chain controls
- protected environments, OIDC, deployment strategies and rollback

### Module 18 — AI-powered Node.js Development

- OpenAI Responses API with the official JavaScript SDK
- streaming and Structured Outputs
- function tools and trusted execution gateway
- RAG, embeddings and access-controlled retrieval
- prompt injection, PII and AI governance
- cost controls, evaluation, tracing and human approval gates

## Major modernization changes

- เปลี่ยนจาก CommonJS-first เป็น ESM-first
- แก้คำอธิบาย “single-threaded” ให้ครอบคลุม libuv worker pool และ worker threads
- ใช้ `node:fs/promises` แทน sync file API ใน application flow
- ใช้ Promise/`async`–`await`, cancellation และ timeout
- ใช้ built-in `fetch()`
- เปลี่ยน Express `4.18.2` เป็น Express `5.x`
- ใช้ built-in Express body parsers แทน `body-parser`
- เปลี่ยน `mysql` เป็น `mysql2`
- เพิ่ม MongoDB Driver `7.x` guidance
- ใช้ built-in `node:test` และ `node --watch`
- เพิ่ม secure defaults, graceful shutdown, health/readiness และ container guidance
- เพิ่ม GitHub governance และ CI/CD security
- เพิ่ม AI production engineering ด้วย Responses API, tools, RAG และ evaluation
- เปลี่ยน License จาก GPL-2.0 เป็น MIT

## Validation

```bash
npm ci
npm run check
npm test
```

เอกสาร Module 16–18 อ้างอิงแนวทางจากเอกสารทางการของ GitHub, Node.js, npm และ OpenAI แต่ควรตรวจ workflow และตัวอย่าง API อีกครั้งเมื่อ dependency หรือ platform มี major release ใหม่

## License

เผยแพร่ภายใต้ [MIT License](LICENSE) โดย third-party dependencies ยังคงใช้ License ของแต่ละโครงการ
