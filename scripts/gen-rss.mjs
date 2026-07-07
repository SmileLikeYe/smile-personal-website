// 构建前生成 public/rss.xml（npm prebuild 自动执行）
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = join(root, "src/content/posts");
const SITE = "https://smileflow.cn";

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return {};
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return {};
  return Object.fromEntries(
    raw
      .slice(3, end)
      .trim()
      .split("\n")
      .map((line) => {
        const sep = line.indexOf(":");
        if (sep === -1) return null;
        return [line.slice(0, sep).trim(), line.slice(sep + 1).trim().replace(/^["']|["']$/g, "")];
      })
      .filter(Boolean),
  );
}

const escape = (s = "") =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const posts = readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const data = parseFrontmatter(readFileSync(join(postsDir, f), "utf8"));
    return { slug: data.slug || f.replace(/\.md$/, ""), ...data };
  })
  .filter((p) => p.title && p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const items = posts
  .map(
    (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE}/#post/${p.slug}</link>
      <guid isPermaLink="false">${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T08:00:00+08:00`).toUTCString()}</pubDate>
      <description>${escape(p.summary || "")}</description>
    </item>`,
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Smile Hu — Training Log</title>
    <link>${SITE}</link>
    <description>把 AI 能力打磨成能交付的产品，把过程沉淀成公开的文章与 skill。</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date(`${posts[0].date}T08:00:00+08:00`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public/rss.xml"), rss);
console.log(`rss.xml generated: ${posts.length} posts`);
