// 站点内容集中在这里，直接改字段即可，不用动组件代码。
// 标 [MOCK] 的数字/文案是占位，请核实后替换。

export const profile = {
  name: "Smile Hu",
  email: "smiletoye@gmail.com",
  github: "https://github.com/SmileLikeYe",
  x: "https://x.com/Yeshujing",
  website: "https://smileflow.cn",
  headline: ["I turn context into", "shipped", "AI products."],
  subline:
    "Trained on CS. Fine-tuned by Personal AI, mobile workflows, evaluation infrastructure, and full-stack shipping loops.",
};

// hero 下方的量化数据条 [MOCK]，请替换为真实数字
export const heroStats = [
  { value: "6+", label: "Years building", note: "CS + industry" },
  { value: "3", label: "AI products shipped", note: "0 → 1 delivery" },
  { value: "20+", label: "Open-source PRs", note: "MTEB & more" },
  { value: "100%", label: "Hands-on", note: "design → deploy" },
];

// About 区块，bio 每段一条 [MOCK]，请按真实经历修改
export const about = {
  bio: [
    "I'm an AI product engineer. I studied Computer Science at Tongji University, and I've spent the last few years building AI products end to end — personal AI workspaces, on-device mobile AI, and evaluation infrastructure.",
    "I work across the full loop: product thinking, system design, frontend and backend, model integration, and the evaluation that keeps quality honest. I write about what I learn in the posts below — mostly in Chinese.",
  ],
  facts: [
    { label: "Education", value: "Tongji University, CS" },
    { label: "Focus", value: "Personal AI · Agents · On-device" },
    { label: "Base", value: "China" }, // [MOCK] 城市请补充
    { label: "Open to", value: "AI product & engineering roles" },
  ],
};

export const projects = [
  {
    tag: "Personal AI",
    title: "PIN AI",
    body: "Personal AI workspace for chat, search, writing, and shipping with multiple models — I own product surfaces end to end.",
    // [MOCK] impact 数字请核实
    impact: "Multi-model routing, agent workflows, and full delivery loop in production.",
    stack: ["TypeScript", "React", "Node", "LLM APIs", "Agents"],
    action: "View project",
    accent: "green",
    image: "/assets/work-shots/pin-ai-workspace.png",
    href: "https://smileflow.cn", // [MOCK] 换成 PIN AI 真实链接
  },
  {
    tag: "Evaluation",
    title: "MTEB",
    body: "Contributing to the evaluation ecosystem for embeddings and retrieval models — benchmarks only matter when they stay trustworthy.",
    impact: "Merged PRs in the embeddings-benchmark ecosystem.", // [MOCK] 补充 PR 数量
    stack: ["Python", "PyTorch", "Embeddings", "Benchmarks"],
    action: "View PRs on GitHub",
    accent: "blue",
    image: "/assets/work-shots/mteb-leaderboard.png",
    href: "https://github.com/embeddings-benchmark/mteb/pulls?q=author%3ASmileLikeYe",
  },
  {
    tag: "Mobile AI",
    title: "iOS + Local AI",
    body: "On-device models and intelligent features under real constraints: latency, memory, battery, and privacy.",
    impact: "Local inference pipeline running on-device, with graceful cloud fallback.",
    stack: ["Swift", "Core ML", "MLX", "On-device LLM"],
    action: "See mobile work",
    accent: "red",
    image: "/assets/work-shots/ios-local-ai.png",
    href: "https://github.com/SmileLikeYe", // [MOCK] 换成移动端项目链接
  },
];
