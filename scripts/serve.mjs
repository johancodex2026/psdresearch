#!/usr/bin/env node

import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const siteRoot = resolve(import.meta.dirname, "..", "site");
const port = Number.parseInt(process.env.PORT ?? "4173", 10);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split(/[?#]/, 1)[0]);
  const normalized = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const candidate = resolve(siteRoot, `.${sep}${normalized}`);

  if (!candidate.startsWith(siteRoot)) {
    throw new Error("Path traversal rejected");
  }

  return candidate;
}

async function resolveFile(urlPath) {
  let candidate = safePath(urlPath);
  const info = await stat(candidate).catch(() => null);

  if (info?.isDirectory()) candidate = join(candidate, "index.html");
  return candidate;
}

const server = createServer(async (request, response) => {
  try {
    const file = await resolveFile(request.url ?? "/");
    const info = await stat(file).catch(() => null);

    if (!info?.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const type = mimeTypes[extname(file)] ?? "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": type,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    });
    createReadStream(file).pipe(response);
  } catch (error) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Bad request");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`PSDResearch preview: http://127.0.0.1:${port}`);
});
