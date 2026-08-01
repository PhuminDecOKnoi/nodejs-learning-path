# Contributing to Node.js Learning Path

Thank you for improving this learning repository.

## Contribution Principles

Contributions should be accurate, runnable, beginner-aware, and aligned with the repository version policy.

- use a supported Node.js LTS release as the production and teaching baseline;
- keep examples focused and explain relevant trade-offs;
- prefer ESM for new modules unless a lesson specifically covers CommonJS;
- preserve Thai explanations and detailed code comments where they support learning;
- do not copy substantial copyrighted material;
- never include real credentials, personal data, or confidential organizational information.

## Recommended Workflow

1. Review the README, version policy, migration notes, and relevant module.
2. Make one focused change.
3. Run the applicable checks.
4. Update documentation and links.
5. Describe learning impact, compatibility, security, and test evidence in the pull request.

## Quality Checks

Run commands supported by the affected project or module, for example:

```bash
npm install
npm run lint
npm test
npm run build
```

For code examples, confirm that commands, paths, imports, and expected output match the documented environment.

## Documentation Standard

A lesson should normally include:

- learning objectives;
- problem context;
- core concepts;
- runnable example;
- comments explaining important functions and APIs;
- common mistakes;
- security or production considerations;
- exercise or checkpoint;
- references when external facts are used.

## Commit Messages

Use concise, scoped messages such as:

```text
Add Express error-handling lab
Clarify ESM import examples
Fix Node.js LTS version table
Improve stream backpressure comments
```

## License

By contributing, you confirm that you have the right to submit the material and that it may be distributed under the repository's MIT License.
