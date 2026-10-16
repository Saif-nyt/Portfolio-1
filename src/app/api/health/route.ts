import { connection } from "next/server";
import { SITE } from "@/config/site";
import { apiJson } from "@/lib/api";

/** Liveness probe — resolves per request, never from the prerendered shell. */
export async function GET() {
  await connection();
  return apiJson(
    {
      data: {
        status: "ok",
        service: "portfolio-api",
        site: SITE.name,
        uptimeSeconds: Math.round(process.uptime()),
      },
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
