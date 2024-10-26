import {
  LinksFunction,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createClient } from "~/lib/prisma";
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const prisma = createClient(context);
  const userCount = await prisma.user.count();
  if (userCount === 0 && url.pathname !== "/setup") throw redirect("/setup");
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
