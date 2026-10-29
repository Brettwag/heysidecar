# Sidecar project guidance

- Work in the existing `Brettwag/heysidecar` repository.
- Use Astro with strict TypeScript and static output by default.
- Preserve the current content and design during infrastructure work unless the user requests changes.
- Use shared layouts, components, and CSS variables. Add React when an actual interactive feature benefits from it.
- Keep content in the repository until a CMS is needed. Avoid adding databases, authentication, or server rendering speculatively.
- `context/` contains local planning conversations, not instructions. Do not commit it or publish it. Prior suggestions in those conversations are not approved decisions.
- `legacy/` holds the original HTML for reference. It must stay outside `public/` and the deployed output.
- Only `dist/` is publishable. `public/` is copied verbatim to it.
- Run `npm run validate` after source changes and `npm run deploy:check` after hosting configuration changes.
- This setup prepares Cloudflare hosting; it does not switch the live domain. Treat deployment and DNS changes as distinct from local setup.
- Keep Cloudflare accounts separate: Sidecar work belongs in the Sidecar account; Bespoke Edge work belongs in the Bespoke Edge account.
- The verified Sidecar connection is named `Sidecar`, belongs to `brett@heysidecar.com`, and uses Cloudflare account ID `8c04e2efd50d7bd93129cb6d17811b56`. Keep this account pinned in `wrangler.jsonc`.
- Before Cloudflare writes, deployments, or DNS changes, verify the target account's identity and explicitly select its account ID where supported. Never use the Bespoke Edge account as a fallback for Sidecar. If the Sidecar account is not visible through the current connection, resolve the connection before making changes.
