// 站点内容集中在这里，直接改字段即可，不用动组件代码。

export const profile = {
  name: "Smile Hu",
  email: "smiletoye@gmail.com",
  github: "https://github.com/SmileLikeYe",
  githubHandle: "@SmileLikeYe",
  x: "https://x.com/Yeshujing",
  xHandle: "@Yeshujing",
  website: "https://smileflow.cn",
  kicker: "CHIEF AI ENGINEER @ PIN AI · EX-ZHIPU · EX-SAP",
  slogan: ["把 AI 能力打磨成能交付的产品", "把过程沉淀成公开的文章与 skill"],
};

// About 区块
export const about = {
  bio: [
    "我是 Smile Hu，PIN AI 的 Chief AI Engineer & Chief Researcher。此前在智谱 AI 做 FDE——微调模型、和客户共创；更早在 SAP 做全栈开发（Web / Backend / iOS / Android）。",
    "定位：高级 AI 工程师 × 全栈工程师 × AI 产品经理。一直在创业公司，掌握把产品从 0 做到 1 的全部技能和经验——软件到硬件：在 PIN AI 期间还负责 personal AI / ambient AI 硬件设备的研发。",
    "长期关注 personal AI / ambient AI / agent harness。这个网站是我的积累平台：文章、skill、产品先在这里沉淀，再分发到各个平台。",
  ],
  specs: [
    { label: "NOW", value: "Chief AI Engineer @ PIN AI" },
    { label: "PAST", value: "智谱 AI（FDE）· SAP" },
    { label: "EDU", value: "同济大学 · CS" },
    { label: "FOCUS", value: "Personal AI / Ambient AI / Harness Agent" },
    { label: "OUTPUT", value: "产品 / 硬件 / 文章 / SKILL" },
    { label: "PLAY", value: "CS · 王者荣耀" },
  ],
};

// 内容管线：先沉淀，再分发
export const loop = ["写 WRITE", "建 BUILD", "淀 DISTILL"];

// Serving Endpoints：内容分发到的各个"服务端点"
// status "200" = 已上线，"soon" = 筹备中
export const endpoints = [
  {
    platform: "github",
    path: "github.com/SmileLikeYe",
    href: "https://github.com/SmileLikeYe",
    status: "200",
    note: "OSS · agent-chief",
  },
  {
    platform: "x",
    path: "x.com/Yeshujing",
    href: "https://x.com/Yeshujing",
    status: "200",
    note: "更新中",
  },
  {
    platform: "blog",
    path: "smileflow.cn",
    href: "https://smileflow.cn",
    status: "200",
    note: "持续更新",
  },
  {
    platform: "rss",
    path: "smileflow.cn/rss.xml",
    href: "https://smileflow.cn/rss.xml",
    status: "200",
    note: "订阅",
  },
  {
    platform: "xiaohongshu",
    path: "xiaohongshu.com/@Smile",
    href: null,
    status: "soon",
    note: "筹备中",
  },
  {
    platform: "skills",
    path: "skills.sh/@SmileLikeYe",
    href: null,
    status: "soon",
    note: "筹备中",
  },
];

// Skills 已移到 src/content/skills/*.md（frontmatter + 正文，站内可读）

// Build：真实的产出，每一条都有可验证的链接
export const projects = [
  {
    tag: "PERSONAL AI · NOW",
    title: "PIN AI",
    role: "Chief AI Engineer & Chief Researcher",
    body: "Personal AI 创业公司——我负责 AI 工程与研究的端到端，从模型接入、Agent 系统到产品面；同时主导 personal AI / ambient AI 硬件设备的研发。",
    stack: ["Agents", "LLM", "Hardware", "Full-stack"],
    status: "SHIPPED",
    href: "https://www.pinai.com/",
    links: [
      { label: "官网", href: "https://www.pinai.com/" },
      { label: "$10M 融资", href: "https://x.com/pinai_io/status/1833176031714541651" },
      { label: "3M+ 用户", href: "https://x.com/pinai_io/status/1950915602983346431" },
      { label: "Agent SDK（开源）", href: "https://github.com/PIN-AI/pinai_agent_sdk" },
    ],
  },
  {
    tag: "OPEN SOURCE · ★",
    title: "agent-chief",
    role: "Author · 个人开源代表作",
    body: "围绕 agent harness 的工程实践——把「让 Agent 可靠交付」的方法做成开源工具。我 star 数最高的个人项目。",
    stack: ["Python", "Agents", "Harness"],
    status: "ONGOING",
    href: "https://github.com/SmileLikeYe/agent-chief",
    ghRepo: "SmileLikeYe/agent-chief",
    ghStarsFallback: 319,
    video: {
      src: "/assets/projects/agent-chief-showcase.mp4",
      poster: "/assets/projects/agent-chief-showcase-poster.jpg",
      label: "SHOWCASE · 10 SEC PRODUCT FILM",
      title: "agent-chief cinematic demo",
    },
    links: [
      { label: "GitHub", href: "https://github.com/SmileLikeYe/agent-chief" },
      { label: "Star ⭐", href: "https://github.com/SmileLikeYe/agent-chief/stargazers" },
    ],
  },
  {
    tag: "OPEN SOURCE · 2YR+",
    title: "MTEB",
    role: "Contributor（2 年多）",
    body: "embeddings 评测基准的长期贡献者——榜单只有在可信的时候才有意义。",
    stack: ["Python", "Embeddings", "Benchmarks"],
    status: "ONGOING",
    href: "https://github.com/embeddings-benchmark/mteb/",
    links: [
      { label: "仓库", href: "https://github.com/embeddings-benchmark/mteb/" },
      { label: "我的 PRs", href: "https://github.com/embeddings-benchmark/mteb/pulls?q=author%3ASmileLikeYe" },
    ],
  },
  {
    tag: "EX-SAP · FULL-STACK",
    title: "SAP Business One Mobile",
    role: "全栈开发（Web / Backend / iOS / Android）",
    body: "在 SAP 交付的企业级移动应用，Sales 与 Service 两条产品线，上架 Google Play。",
    stack: ["iOS", "Android", "Web", "Backend"],
    status: "SHIPPED",
    href: "https://play.google.com/store/apps/details?id=b1.sales.mobile.android&hl=en_GB",
    links: [
      { label: "Sales App", href: "https://play.google.com/store/apps/details?id=b1.sales.mobile.android&hl=en_GB" },
      { label: "Service App", href: "https://play.google.com/store/apps/details?id=b1.service.mobile.android" },
    ],
  },
];

// Build 区 "now training" 清单（正在路上的东西）
export const nowTraining = ["skill 市场发布", "小红书内容分发", "个人 AI 记忆系统"];

// Contact 区打字机状态行（循环播放）
export const statusLines = [
  "正在训练：小红书内容分发 …",
  "eval loop running · observe → improve → ship",
  "open to conversations · personal AI / agent harness",
];
