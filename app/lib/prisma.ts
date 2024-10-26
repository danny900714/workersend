import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { AppLoadContext } from "@remix-run/cloudflare";

export function createClient(context: AppLoadContext) {
  const { DB } = context.cloudflare.env;
  const adapter = new PrismaD1(DB);
  return new PrismaClient({ adapter });
}
