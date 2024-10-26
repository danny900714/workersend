import {
  cloudflareDevProxyVitePlugin,
  vitePlugin as remix,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { type PlatformProxy } from "wrangler";

// PlatformProxy’s caches property is incompatible with the caches global
// https://github.com/cloudflare/workers-sdk/blob/main/packages/wrangler/src/api/integrations/platform/caches.ts
type Cloudflare = Omit<PlatformProxy<Env>, "dispose" | "caches"> & {
  caches: CacheStorage;
};

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }

  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    target: "webworker",
    noExternal: true,
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  worker: {
    format: "es",
  },
  build: {
    minify: "terser",
  },
});
