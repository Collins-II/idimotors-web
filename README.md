# IDI Motors

The customer website for IDI Motors in Lusaka, Zambia. Inventory, contact details,
exchange rates, enquiries, appointments and customer conversations are connected
to the [dealer portal](../car-web-portal).

## Development

Use Node.js 20.9 or later. Install dependencies with `npm ci`, then run
`npm run dev` to open the website at http://localhost:3000.

Start the dealer portal at http://localhost:3001. Set
`NEXT_PUBLIC_PORTAL_URL` to its public URL and, optionally, `PORTAL_URL` to a
different server-only URL. Both default to http://localhost:3001. The portal's
`CLIENT_ORIGINS` must allow the website origin for browser requests.

The portal's dealership settings supply contact details, currency and rates.
Existing installations can update their saved dealership name in
**Settings**; the default name for a new installation is **IDI Motors**.
If the portal is unavailable, the website shows an unavailable state for inventory
and an explicit error for failed form submissions.

## Validation and production

- `npm run lint`: lint application source.
- `npm run typecheck`: check TypeScript (run `npx next typegen` first after
  changing routes so generated route types are current).
- `npm run build`: create the production build.
- `npm start`: serve the production build.
