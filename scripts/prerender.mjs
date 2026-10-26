import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer } from "vite";

const dist = "dist";
const template = await readFile(join(dist, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(join(dist, ".vite/manifest.json"), "utf8"));
const server = await createServer({ mode: "production", server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });
const escapeHtml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escapeXml = escapeHtml;

try {
  const { getPageMetadata, SITE_URL, STATIC_PATHS } = await server.ssrLoadModule("/src/seo/metadata.ts");
  const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
  const assets = Object.entries(manifest).filter(([key, value]) => key.startsWith("src/assets/") && value.file);
  const rewriteAssets = (html) => assets.reduce((result, [key, value]) => result.split(`/${key}`).join(`/${value.file}`), html);
  const headFor = (meta) => {
    const tags = [
      `<title>${escapeHtml(meta.title)}</title>`,
      `<meta name="description" content="${escapeHtml(meta.description)}">`,
      `<meta name="robots" content="${escapeHtml(meta.robots)}">`,
      `<link rel="canonical" href="${escapeHtml(meta.canonical)}">`,
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="Sneaker Spotter">`,
      ...[["og:title", meta.title], ["og:description", meta.description], ["og:url", meta.canonical], ["og:image", meta.image]].map(([name, value]) => `<meta property="${name}" content="${escapeHtml(value)}">`),
      ...[["twitter:card", "summary"], ["twitter:title", meta.title], ["twitter:description", meta.description], ["twitter:image", meta.image]].map(([name, value]) => `<meta name="${name}" content="${escapeHtml(value)}">`),
    ];
    if (meta.structuredData) tags.push(`<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(meta.structuredData).replace(/</g, "\\u003c")}</script>`);
    return `<!-- seo:start -->\n    ${tags.join("\n    ")}\n    <!-- seo:end -->`;
  };
  if (!template.includes("<!-- seo:start -->") || !template.includes('<div id="root"></div>')) throw new Error("The HTML template is missing the SEO or root placeholder.");
  await writeFile(join(dist, "app-shell.html"), template);
  for (const path of STATIC_PATHS) {
    const metadata = getPageMetadata(path);
    const markup = rewriteAssets(render(path));
    if (markup.includes("/src/assets/")) throw new Error(`Unresolved production asset in prerendered page ${path}`);
    const html = template.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, headFor(metadata)).replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    const output = path === "/" ? join(dist, "index.html") : join(dist, path.slice(1), "index.html");
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
  }
  const urls = STATIC_PATHS.map((path) => `  <url><loc>${escapeXml(getPageMetadata(path).canonical)}</loc></url>`).join("\n");
  await writeFile(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`Prerendered ${STATIC_PATHS.length} SEO pages and generated sitemap.xml and robots.txt for ${SITE_URL}`);
} finally {
  await server.close();
}
