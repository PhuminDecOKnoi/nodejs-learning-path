# Node.js Repository Consolidation

## Target repository

`PhuminDecOKnoi/nodejs-learning-path`

## Consolidated source repositories

1. `PhuminDecOKnoi/my-first-node.js`
2. `PhuminDecOKnoi/my-express-node.js`
3. `PhuminDecOKnoi/my-ejs-node.js`
4. `PhuminDecOKnoi/Alison-Beginning-Node-JS-Using-a-Game-Project`
5. `PhuminDecOKnoi/Beginning-Node-JS-Using-a-Game-Project-Game-only-`
6. `PhuminDecOKnoi/nodejs-learning-path`

## Version baseline

- Node.js: `24.18.0 LTS`
- npm: `>=11`
- Express: `5.x`
- EJS: `6.x`
- Socket.IO: `4.8.x`
- MySQL client: migrated from `mysql` to `mysql2`
- nodemon: `3.1.x`

## Dependency cleanup

The consolidation removes or replaces outdated and unnecessary packages found in legacy projects:

- Remove `init` and `inity` from application dependencies.
- Remove the `node` npm package as a runtime dependency; use `.nvmrc` and `engines.node` instead.
- Remove the obsolete `uppercase` beta package and use native JavaScript `String.prototype.toUpperCase()`.
- Replace the legacy `mysql` package with `mysql2`, which supports promises and prepared statements.
- Express includes JSON and URL-encoded parsers, so new examples do not require `body-parser`.

## Repository structure

```text
nodejs-learning-path/
├── README.md
├── LICENSE
├── MIGRATION.md
├── package.json
├── .nvmrc
├── modules/
│   └── module-01 ... module-18
└── examples/
    ├── express-ejs/
    ├── mysql-crud/
    └── realtime-game/
```

## License

The consolidated repository is distributed under the MIT License. Third-party libraries retain their own licenses. Content imported from another source must only be included when the repository owner has the right to redistribute it.

## Legacy repository handling

After content parity has been verified, the five source repositories may be archived and their README files should point users to `nodejs-learning-path`. Archiving is preferable to deletion because it preserves commit history and old links.
