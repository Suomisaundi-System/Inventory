# Suomisaundi System — Inventory

An independent, capitalized subsystem repository for the Suomisaundi System.

- `index.html` boots `index.js`.
- `index.js` redirects to the central website after ten seconds.
- `system.js` exports an initial structured-record interface for future modules.

Central entry point: https://suomisaundi-system.github.io/

**Status:** foundational data contracts only. This is not a complete accounting, payments, ticketing, event management, or other production application.

## Browser inventory
`inventory.js` offers IndexedDB-backed `putRecord`, `getRecord`, `listRecords`, `deleteRecord`, `searchRecords` and `exportInventory`. This is **browser-local**, not a synchronized or server-side inventory. Avoid storing sensitive records; browser storage can be cleared or evicted.
