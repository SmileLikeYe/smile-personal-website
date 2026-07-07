const modules = import.meta.glob("./skills/*.md", {
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
        const key = line.slice(0, separator).trim();
        return [key, parseValue(line.slice(separator + 1))];
      })
      .filter(Boolean),
  );
  return { data, content };
}

function normalizeSkill(path, raw) {
  const { data, content } = parseFrontmatter(raw);
  const name = data.name || path.split("/").pop().replace(/\.md$/, "");
  return {
    name,
    index: data.index || "S?",
    zh: data.zh || name,
    desc: data.desc || "",
    status: data.status || "draft", // live | draft | soon
    href: data.source || null,
    post: data.post || null,
    content,
  };
}

export const skillDocs = Object.entries(modules)
  .map(([path, raw]) => normalizeSkill(path, raw))
  .sort((a, b) => a.index.localeCompare(b.index));
