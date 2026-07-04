const modules = import.meta.glob("./posts/*.md", {
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
        const value = line.slice(separator + 1);
        return [key, parseValue(value)];
      })
      .filter(Boolean),
  );

  return { data, content };
}

function normalizePost(path, raw) {
  const { data, content } = parseFrontmatter(raw);
  const slug = data.slug || path.split("/").pop().replace(/\.md$/, "");

  return {
    slug,
    title: data.title,
    date: data.date,
    type: data.type || "Note",
    adapter: data.adapter || "Writing",
    summary: data.summary,
    tags: data.tags || [],
    readingTime: data.readingTime || "4 min",
    featured: Boolean(data.featured),
    status: data.status || "Draft",
    content,
  };
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => normalizePost(path, raw))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const featuredPost = posts.find((post) => post.featured) || posts[0];

export const writingTracks = [
  {
    name: "Skill logs",
    description: "Reusable operating patterns: Codex loops, agent workflows, evaluation habits.",
    count: posts.filter((post) => post.type === "Skill").length,
  },
  {
    name: "Build notes",
    description: "Products shipped across PIN AI, mobile AI, and benchmark infrastructure.",
    count: posts.filter((post) => post.type === "Build").length,
  },
  {
    name: "Model thoughts",
    description: "How I think about context, harmless agents, local runtime, and product taste.",
    count: posts.filter((post) => post.type === "Essay").length,
  },
];
