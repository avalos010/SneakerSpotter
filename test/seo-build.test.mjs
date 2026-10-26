import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const origin = new URL(process.env.VITE_SITE_URL || "https://jazzy-crepe-f479cc.netlify.app").origin;
const pages = [
  ["/", "dist/index.html", "Sneaker Spotter | Compare Sneaker Prices &amp; Sizes"],
  ["/popular", "dist/popular/index.html", "Popular Sneakers"],
  ["/sneakers/nike", "dist/sneakers/nike/index.html", "Nike Sneakers"],
  ["/sneakers/jordan", "dist/sneakers/jordan/index.html", "Jordan Sneakers"],
  ["/sneakers/adidas", "dist/sneakers/adidas/index.html", "adidas Sneakers"],
];

test("indexable routes contain unique metadata and crawlable HTML before JavaScript", async () => {
  const titles = new Set();
  for (const [path, filename, title] of pages) {
    const html = await readFile(filename, "utf8");
    assert.match(html, /<main id="main-content"/);
    assert.match(html, /<h1/);
    assert.ok(html.includes(title));
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`));
    assert.ok(html.includes(`property="og:url" content="${origin}${path}"`));
    assert.ok(!html.includes("/src/assets/"));
    titles.add(html.match(/<title>(.*?)<\/title>/)?.[1]);
  }
  assert.equal(titles.size, pages.length);
});

test("sitemap lists only canonical landing pages and the app shell has no home canonical", async () => {
  const [sitemap, robots, shell] = await Promise.all([
    readFile("dist/sitemap.xml", "utf8"), readFile("dist/robots.txt", "utf8"), readFile("dist/app-shell.html", "utf8"),
  ]);
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, pages.length);
  for (const [path] of pages) assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`));
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(!shell.includes('rel="canonical"'));
  assert.ok(shell.includes('<div id="root"></div>'));
});
