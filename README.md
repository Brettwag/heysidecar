# Sidecar

Static Astro website for [heysidecar.com](https://heysidecar.com), maintained in the existing [Brettwag/heysidecar](https://github.com/Brettwag/heysidecar) repository.

## Local development

Use Node.js 24 (`.nvmrc` pins the version used for setup and CI).

```sh
npm ci
npm run dev
```

Astro serves the site at `http://localhost:4321`. No environment variables or external accounts are required for development or builds.

```sh
npm run check         # Astro and TypeScript diagnostics
npm run format        # Format project source
npm run validate      # Formatting, type checking, then a production build
npm run preview       # Serve the most recent production build
npm run deploy:check  # Build and validate Cloudflare packaging without deploying
```

## Project structure

```text
src/
  components/       Reusable page sections
  data/site.ts      Shared site information and service content
  layouts/          HTML shell, metadata, and production analytics
  pages/            File-based routes, including the homepage and 404
  styles/           Global styles and design tokens
public/             Files copied directly to the build, including existing images
legacy/             Original HTML for reference; excluded from the published site
context/            Local planning notes; ignored by Git and excluded from builds
```

`npm run build` writes the publishable site to `dist/`. Only that directory should be served publicly. The site uses Geist with Instrument Serif accents. Analytics runs only on the production domain.

## Hosting and deployment

`wrangler.jsonc` configures Cloudflare Workers Static Assets, with a real 404 response for missing pages. No server-rendering adapter, Worker handler, database, or paid service is needed for this static build.

The site was deployed on October 29, 2026, to the separate **Sidecar** Cloudflare account (`brett@heysidecar.com`, account ID `8c04e2efd50d7bd93129cb6d17811b56`). The account is pinned in Wrangler; never deploy this project to Bespoke Edge.

- Worker: `heysidecar`
- Cloudflare URL: <https://heysidecar.heysidecar.workers.dev/>
- Canonical domain: <https://heysidecar.com/>
- Custom domains: `heysidecar.com` and `www.heysidecar.com`
- Cloudflare DNS zone: `37d67ce0847c04def95d0e9708ca1dea`
- Assigned nameservers: `clyde.ns.cloudflare.com` and `jade.ns.cloudflare.com`
- Registrar: Squarespace. Changing nameservers does not transfer domain registration.

Google Workspace MX, SPF, DKIM, and both Google verification CNAME records were copied to Cloudflare before changing authoritative DNS. Cloudflare redirects HTTP to HTTPS and `www` to the canonical domain, preserving paths and query strings. Confirm the zone is active and certificates are issued before treating a DNS switch as complete.

The initial deployment used the authenticated Sidecar Cloudflare plugin and Cloudflare's direct static asset upload API. CLI authentication is separate from plugin authentication. For subsequent manual deployments, sign in to Wrangler using the Sidecar identity and run `npm run deploy`. This publishes the site; `npm run deploy:check` does not.

Automatic Git deployments are not configured yet. To enable them:

1. Connect the existing GitHub repository to Cloudflare Workers Builds.
2. Select Node.js 24.13.1, repository root as the build directory, `npm run validate` as the build command, and `npx wrangler deploy` as the deploy command.
3. Verify the deployment at its Cloudflare address before making further DNS changes.

The GitHub Actions workflow checks pull requests and pushes to `main`. It does not deploy. The original `CNAME` is retained in `public/` for reference and compatibility; it does not configure Cloudflare DNS. A future GitHub Pages deployment would need to publish `dist/`, rather than the repository root.

## Challenge form

The three-field challenge form submits directly to [Web3Forms](https://web3forms.com/) and delivers inquiries to the verified inbox associated with `site.challengeFormKey` in `src/data/site.ts`. The form routing key is intentionally public and safe to include in browser code; never replace it with an account API token. No backend, database, or email-domain changes are required.

The free plan currently allows 250 submissions per month. The form includes a hidden honeypot, required field validation, duplicate-click prevention, and inline success/error feedback. Failed requests preserve the visitor’s input and offer an email alternative. The honeypot is basic spam protection; if spam becomes a problem, Web3Forms supports free hCaptcha through its form settings.

Before launch, send a labeled test inquiry and confirm receipt in `brett@heysidecar.com` (including spam). A local build or mocked API test does not verify inbox delivery. Monitor the submission allowance in the Web3Forms dashboard.

## Adding tools later

Start with ordinary Astro pages and browser JavaScript. Add the official Astro React integration when a calculator or demo needs React. Keep reusable tool logic in TypeScript modules. A tool requiring secret API keys, crawling, or saved records should get a backend when that feature is built.

Larger applications can be deployed independently on subdomains without changing the main site's framework. Keep prospect information, credentials, and private demos out of `public/`; anything placed there is published verbatim.

## Documentation

- [Astro TypeScript](https://docs.astro.build/en/guides/typescript/)
- [Astro islands](https://docs.astro.build/en/concepts/islands/)
- [Cloudflare static assets](https://developers.cloudflare.com/workers/static-assets/)
