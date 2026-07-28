# Node.js Learning Path

> Professional Node.js learning repository audited for the 2026 runtime and tooling landscape.

[![Node.js](https://img.shields.io/badge/Node.js-24.18.0%20LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Current Evaluation](https://img.shields.io/badge/Node.js%20Current-26.5.0-5FA04E?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.3.0-orange.svg)](package.json)

## ภาพรวม

Repository นี้รวมและปรับปรุงบทเรียน Node.js ให้สอดคล้องกับแนวปฏิบัติปี 2026 โดยใช้ **Node.js 24.18.0 LTS** เป็น production/teaching baseline และใช้ **Node.js 26.5.0 Current** เฉพาะการประเมินฟีเจอร์ใหม่และ compatibility testing

เนื้อหาครอบคลุมตั้งแต่โครงสร้างภาษา JavaScript สมัยใหม่, ESM, Promise/`async`–`await`, built-in `fetch`, Express 5, database integration, authentication/security, built-in Node.js test runner, deployment, GitHub governance, CI/CD, AI-powered Node.js development และบทเรียนเชิงลึกด้าน language/runtime evolution

## Version policy

| Component | Version / Policy |
|---|---|
| Node.js production baseline | `24.18.0 LTS` |
| Node.js evaluation baseline | `26.5.0 Current` |
| npm | `11.x` |
| Module system | ESM-first; CommonJS for legacy maintenance |
| Express | `5.x` |
| EJS | `6.x` |
| MongoDB Node.js Driver | `7.x` |
| MySQL client | `mysql2 3.x` |
| Socket.IO | `4.8.x` |
| Test runner | built-in `node:test` |
| Development watch | built-in `node --watch` |
| AI API baseline | OpenAI Responses API |
| License | MIT for original repository content |

> Production applications should use a supported LTS line. Current releases are suitable for evaluation and compatibility testing, not as the default course baseline.

## Version audit

ผลตรวจสอบรายบทและ trigger สำหรับการตรวจซ้ำอยู่ที่:

- [VERSION-AUDIT-2026-07-28.md](VERSION-AUDIT-2026-07-28.md)
- [MIGRATION.md](MIGRATION.md)
- [LICENSE-POLICY.md](LICENSE-POLICY.md)

## Learning path

### Part 1 — Node.js Foundation

1. [Introduction to Node.js](module-01-introduction-nodejs.md)
2. [Environment Setup and First Script](module-02-environment-setup.md)
3. [Modules, ESM, CommonJS and npm](module-03-modules-require-exports-npm.md)
4. [File System, JSON and CLI](module-04-file-system-json-cli.md)
5. [Debugging and Error Reading](module-05-debugging-and-error-reading.md)
6. [Asynchronous Programming](module-06-asynchronous-programming.md)
7. [HTTP Requests and APIs](module-07-http-requests-and-apis.md)

### Part 2 — Backend Development

8. [Web Servers with Express 5](module-08-express-web-server.md)
9. [HTML5, Static Assets and EJS](module-09-html-static-templating.md)
10. [REST API Design and Routing](module-10-rest-api-design-routing.md)
11. [Database Integration](module-11-database-integration.md)
12. [Authentication and Security](module-12-authentication-security.md)
13. [Deployment and Production](module-13-deployment-production.md)
14. [Testing and Production Debugging](module-14-testing-debugging-production.md)
15. [Project Structure and Best Practices](module-15-project-structure-best-practices.md)

### Part 3 — Engineering Workflow, DevOps and AI

16. [Modern Git and GitHub Workflow](module-16-git-github-workflow.md)
17. [Modern DevOps and CI/CD](module-17-modern-devops-ci-cd.md)
18. [AI-powered Node.js Development](module-18-ai-powered-nodejs-development.md)

### Part 4 — Modern JavaScript Language and Runtime Evolution

19. [Modern ECMAScript Language Structure](module-19-modern-ecmascript-language-structure.md)
20. [Advanced Functions and Closures](module-20-advanced-functions-closures.md)
21. [Async Iterators and Generators](module-21-async-iterators-generators.md)

> Planned next modules: Symbols/Reflect/Proxy, Import Attributes and Module Resolution, Web APIs in Node.js, V8/Event Loop internals, Worker Threads, Streams, TypeScript integration, enterprise architecture, observability, cloud-native deployment and advanced AI engineering.

## Major modernization rules

- ESM-first for new examples
- CommonJS retained only for legacy understanding
- `const` by default and `let` only when reassignment is required
- strict equality and explicit type conversion
- `node:fs/promises` for asynchronous file operations
- built-in `fetch()` with timeout/cancellation guidance
- Express 5 async error flow and built-in body parsers
- parameterized SQL through `mysql2`
- built-in `node:test`
- graceful shutdown, health/readiness and secure production defaults
- GitHub rulesets, CODEOWNERS, Dependabot and least-privilege CI
- OpenAI Responses API, Structured Outputs, tool validation, RAG and AI governance
- streaming and async iteration for large-data workflows
- separation of pure business logic from I/O side effects

## Repository structure

```text
nodejs-learning-path/
├── README.md
├── VERSION-AUDIT-2026-07-28.md
├── LICENSE
├── LICENSE-POLICY.md
├── MIGRATION.md
├── package.json
├── package-lock.json
├── .nvmrc
├── module-01-introduction-nodejs.md
├── ...
├── module-21-async-iterators-generators.md
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

เปิดแอป:

```text
http://localhost:3000
```

Health endpoint:

```text
http://localhost:3000/api/health
```

## Validation

```bash
npm ci
npm run check
npm test
```

ตรวจ compatibility กับ Node.js 26 Current แยกจาก production baseline และไม่เปลี่ยน `package.json#engines` จนกว่าสายดังกล่าวจะเป็น LTS และ dependency สำคัญผ่านการทดสอบ

## Source repositories

- `my-first-node.js`
- `my-express-node.js`
- `my-ejs-node.js`
- `Alison-Beginning-Node-JS-Using-a-Game-Project`
- `Beginning-Node-JS-Using-a-Game-Project-Game-only-`
- `nodejs-learning-path`

## License

เนื้อหาต้นฉบับทั้งหมดของ Repository นี้เผยแพร่ภายใต้ [MIT License](LICENSE) และ [Repository-wide MIT License Policy](LICENSE-POLICY.md)

Third-party dependencies, snippets, trademarks และ assets ภายนอกยังคงอยู่ภายใต้สิทธิและ License ของเจ้าของเดิม
