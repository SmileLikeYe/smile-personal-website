const modules = import.meta.glob("./context/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }
  const frontmatter = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).trim();
  const data = Object.fromEntries(
    frontmatter
      .split("\n")
      .map((line) => {
        const separator = line.indexOf(":");
        if (separator === -1) return null;
        return [line.slice(0, separator).trim(), parseValue(line.slice(separator + 1))];
      })
      .filter(Boolean),
  );
  return { data, content };
}

function normalizeItem(path, raw) {
  const { data, content } = parseFrontmatter(raw);
  const slug = data.slug || path.split("/").pop().replace(/\.md$/, "");
  return {
    slug,
    title: data.title || slug,
    url: data.url || null,
    author: data.author || null,
    saved: data.saved || "",
    kind: data.kind === "idea" ? "idea" : "article", // article 收藏 | idea 想法
    tags: data.tags || [],
    takeaway: data.takeaway || "",
    internalized: data.internalized || "", // "skill:name" | "post:slug" | "code:repo" | ""
    content,
  };
}

export const contextDocs = Object.entries(modules)
  .map(([path, raw]) => normalizeItem(path, raw))
  .sort((a, b) => new Date(b.saved) - new Date(a.saved));
