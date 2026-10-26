## SneakerSpotter

React + TypeScript app built with Vite. Requires Node.js 22.12+ (22.x), 24.x,
or 26+, and pnpm 10.20.0.
The `.nvmrc` file pins the tested Node.js version for local development and Netlify builds.

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
responses so they can run independently of the API.

To use the local Sneaks API, create `.env` with `VITE_API_URL=http://localhost:4000`
and start the API on port 4000. Restart Vite after changing `VITE_API_URL`. For deployment, set that
variable to the deployed API URL. Without it, the app uses the current production Sneaks API URL.

Popular and search cards show prices included in the catalog and seller links.
“Compare sizes” opens `/sneaker/:styleID` and fetches live size prices for the
selected shoe. A seller without a current price still has its product link.
Prices labeled “From” are the lowest across sizes; selecting a size shows only
that size's prices. Missing prices and provider failures are displayed without
substituting prices from another size or seller.

The size-price table shows every size as a row and every seller as a column,
with the lowest available price highlighted in each row. Select a size to update
the seller offers above. Missing prices show a dash. On mobile, the table scrolls
horizontally while the size column stays visible.

The pnpm lockfile is the source of truth for dependency versions.

[![Netlify Status](https://api.netlify.com/api/v1/badges/75de9ae8-8ef0-4b34-b4cc-0bd74831c44d/deploy-status)](https://app.netlify.com/sites/jazzy-crepe-f479cc/deploys)

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/screenshot1.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/screenshot2.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/screenshot3.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/mobilescreenshot.png" width="350">

<img src="https://github.com/avalos010/SneakerSpotter/blob/master/screenshots/mobilescreenshot2.png" width="350">
