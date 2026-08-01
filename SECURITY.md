# Security Policy

## Supported Scope

This repository is an educational Node.js learning project. Security reports should focus on repository-owned code, examples, configuration, workflows, and documentation.

## Reporting a Vulnerability

Do not publish credentials, exploit details, or sensitive information in a public issue. Report the problem privately to the repository owner with:

- affected file or module;
- reproduction steps;
- expected and actual behavior;
- impact assessment;
- suggested mitigation, when available.

## Security Baseline

Contributions should follow these controls:

- never commit `.env`, API keys, tokens, passwords, certificates, or private keys;
- validate and normalize external input;
- encode output according to its destination;
- use parameterized database queries;
- apply least privilege to databases, files, services, and CI permissions;
- avoid unsafe command construction and uncontrolled shell execution;
- set explicit timeouts and size limits for network requests and uploads;
- do not expose stack traces or internal configuration in production responses;
- review dependency advisories before upgrades;
- use supported Node.js LTS releases for production-oriented examples.

## Dependency and Supply-Chain Security

Before merging dependency changes:

```bash
npm audit
npm test
npm run lint
npm run build
```

Review lockfile changes, package provenance, maintainer changes, install scripts, and transitive dependencies. Automated audit output is a signal for review, not a substitute for technical assessment.

## Educational Disclaimer

Examples are designed for learning. Production deployment requires threat modeling, environment-specific hardening, monitoring, backup, incident response, and independent security review.
