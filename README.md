# WorkerSend

Business email solution powered by Cloudflare Workers©.

## Development

Run the dev server:

```sh
pnpm start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
pnpm typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
pnpm deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
