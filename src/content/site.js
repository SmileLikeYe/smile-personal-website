// 站点内容集中在这里，直接改字段即可，不用动组件代码。
// 标 [MOCK] 的数字/文案是占位，请核实后替换。

export const profile = {
  name: "Smile Hu",
  wordmark: "Smile",
  email: "smiletoye@gmail.com",
  github: "https://github.com/SmileLikeYe",
  githubHandle: "@SmileLikeYe",
  x: "https://x.com/Yeshujing",
  xHandle: "@Yeshujing",
  website: "https://smileflow.cn",
  kicker: "AI PRODUCT ENGINEER × BUILD IN PUBLIC",
  slogan: ["把 AI 能力打磨成能交付的产品", "把过程沉淀成公开的文章与 skill"],
};

// About 区块
export const about = {
  bio: [
    "我是 Smile Hu，AI 产品工程师，同济大学计算机科学出身。",
    "过去几年在做：个人 AI 工作台、端侧移动 AI、评测基础设施——从产品思考到工程落地的完整闭环。",
    "这个网站是我的积累平台：文章、skill、项目先在这里沉淀，再分发到各个平台。",
  ],
  specs: [
    { label: "EDU", value: "同济大学 · CS" },
    { label: "FOCUS", value: "Personal AI / Agents / 端侧" },
    { label: "FORMAT", value: "文章 / SKILL / 产品" },
    { label: "OPEN TO", value: "AI 产品与工程岗位" },
  ],
};

// 内容管线：先沉淀，再分发
export const loop = ["写 WRITE", "建 BUILD", "淀 DISTILL"];

// Serving Endpoints：内容分发到的各个"服务端点"
// status "200" = 已上线，"soon" = 筹备中；[MOCK] note 数字请核实
export const endpoints = [
  {
    path: "github.com/SmileLikeYe",
    href: "https://github.com/SmileLikeYe",
    status: "200",
    note: "20+ PRs",
  },
  {
    path: "x.com/Yeshujing",
    href: "https://x.com/Yeshujing",
    status: "200",
    note: "更新中",
  },
  {
    path: "smileflow.cn",
    href: "https://smileflow.cn",
    status: "200",
    note: "6 篇文章",
  },
  {
    path: "xiaohongshu.com/@Smile",
    href: null,
    status: "soon",
    note: "筹备中",
  },
  {
    path: "skills.sh/@SmileLikeYe",
    href: null,
    status: "soon",
    note: "筹备中",
  },
];

// Skills：沉淀下来的可复用方法论（对外输出的第二种形态）
export const skills = [
  {
    index: "S1",
    name: "ai-design",
    zh: "怎样用 AI 做设计",
    desc: "别用形容词传递审美——用 design.md、截图和结构清单。六步：风格 → 结构 → 出图 → 实现 → 动效 → 眼睛。",
    status: "live",
    href: "https://github.com/SmileLikeYe/smile-personal-website/tree/main/.claude/skills/ai-design",
    post: "ai-design-workflow",
  },
  {
    index: "S2",
    name: "agent-delivery",
    zh: "Agent 交付循环",
    desc: "让 Agent 交付可用的产品面，而不是一段回答：计划 → 工具 → 检查 → 修复 → 验证。",
    status: "soon",
    href: null,
    post: "agent-delivery-loop",
  },
  {
    index: "S3",
    name: "eval-driven",
    zh: "评测驱动迭代",
    desc: "没有评测的迭代是抛硬币。先定判据，再动手改，每一轮都有可比较的结论。",
    status: "soon",
    href: null,
    post: "eval-driven-iteration",
  },
];

// Build：正在公开建造的项目
export const projects = [
  {
    tag: "PERSONAL AI",
    title: "PIN AI",
    body: "个人 AI 工作台——聊天、搜索、写作、多模型调度，我负责端到端的产品面。",
    impact: "多模型路由 + Agent 工作流，生产环境交付。", // [MOCK] impact 请核实
    stack: ["TypeScript", "React", "Node", "Agents"],
    href: "https://smileflow.cn", // [MOCK] 换成 PIN AI 真实链接
    status: "SHIPPED",
  },
  {
    tag: "EVALUATION",
    title: "MTEB",
    body: "给 embedding 评测生态提交贡献——榜单只有在可信的时候才有意义。",
    impact: "embeddings-benchmark 生态多个 merged PR。",
    stack: ["Python", "PyTorch", "Embeddings"],
    href: "https://github.com/embeddings-benchmark/mteb/pulls?q=author%3ASmileLikeYe",
    status: "ONGOING",
  },
  {
    tag: "MOBILE AI",
    title: "iOS + Local AI",
    body: "在真实约束下跑端侧模型：延迟、内存、电量、隐私。",
    impact: "本地推理管线上线，云端优雅降级。",
    stack: ["Swift", "Core ML", "MLX"],
    href: "https://github.com/SmileLikeYe", // [MOCK] 换成移动端项目链接
    status: "ONGOING",
  },
];

// Build 区 "now training" 清单（正在路上的东西）
export const nowTraining = ["skill 市场发布", "小红书内容分发", "个人 AI 记忆系统"];

// Contact 区打字机状态行（循环播放）
export const statusLines = [
  "正在训练：小红书内容分发 …",
  "eval loop running · observe → improve → ship",
  "open to AI product & engineering roles",
];
