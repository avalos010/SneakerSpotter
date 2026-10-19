## SneakerSpotter

React + TypeScript app built with Vite. Requires Node.js 22.12+ (22.x), 24.x,
or 26+, and pnpm 10.20.0.

```sh
pnpm install
pnpm dev
```

`pnpm typecheck` checks the app, Vite/Cypress configuration, and browser tests.
`pnpm build` runs type checks and creates the production bundle in `dist`.
`pnpm preview` serves that bundle locally.

To run browser tests, keep `pnpm dev` running in another terminal, then run
`pnpm test:e2e` (or `pnpm test:e2e:open` for the Cypress UI). If the Cypress
binary is missing, run `pnpm exec cypress install` first. Tests stub sneaker API
responses so they can run independently of the currently unavailable endpoint.
The app still uses the existing Netlify API URL in `src/api/index.ts`.

The pnpm lockfile is the source of truth for dependency versions.

[![Netlify Status](https://api.netlify.com/api/v1/badges/75de9ae8-8ef0-4b34-b4cc-0bd74831c44d/deploy-status)](https://app.netlify.com/sites/jazzy-crepe-f479cc/deploys)

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/screenshot1.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/screenshot2.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/screenshot3.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/mobilescreenshot.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/mobilescreenshot2.png" width="350">
