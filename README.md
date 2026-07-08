# Smile Personal Website

人不是一段静态简介，更像一个在现实里运行的开放系统。

每天接收新的边界条件，在反馈里校准，在熵增里保留一点秩序，再把理解压缩成产品、文章、工具和更可靠的判断。

这个网站记录的是这条轨迹。它不是作品集的终点，而是一个持续更新的观测面：我如何学习，如何构建，如何把 AI 能力变成可以交付的东西。

如果简历回答的是“我做过什么”，这里更关心“我如何形成判断”。

## 思路：整个网站是一个「大模型」

首页右侧的训练面板把 Smile Hu 标注成一个大模型，它同时是全站的**目录**——
面板上的编号块可点击，与下方板块顺序、菜单顺序严格一一对应：

| # | 面板 | 板块 | 含义 |
| --- | --- | --- | --- |
| 01 | Pre-training | About me | 教育与背景 = 预训练 |
| 02 | Runtime Context | Context（收藏与想法） | 外部输入 = 运行时上下文 |
| 03 | Fine-tuning | Training Log（文章） | 微调过程产生训练日志 |
| 04 | Outputs | Adapters（skills） | 沉淀出的可安装输出 |
| 05 | Evaluation Loop（→ Ship） | Build（战绩） | 循环的终点是交付 |
| 06 | — | Contact | Let's talk. |

内容循环是 **写 WRITE → 建 BUILD → 淀 DISTILL**：文章、产品、skill 先在本站沉淀，
再经 Serving Endpoints（GitHub / X / RSS / 小红书…）分发出去。
Context 区是输入端：收藏的文章带 LLM 总结与批注，**收藏的终点是内化**——
每条都要有内化去向（进了哪个 skill / 文章 / 代码），否则就该删。

## Stack

- React 19 + Vite，纯静态，无后端
- 三类内容都是 Markdown：文章 `src/content/posts/*.md`、
  skill `src/content/skills/*.md`、收藏 `src/content/context/*.md`
- 构建前自动生成 `public/rss.xml`（`scripts/gen-rss.mjs`，prebuild 钩子）
- 可安装的 Claude skills 在 `.claude/skills/`（ai-design / agent-delivery / eval-driven / collect）

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Maintenance

更完整的代码维护说明见 [docs/maintenance.md](docs/maintenance.md)。

### 本地开发

```bash
npm install
npm run dev
```

默认本地地址通常是：

```text
http://127.0.0.1:5173/
```

如果端口被占用，Vite 会自动换到下一个可用端口。

### 上线前检查

```bash
npm run build
```

构建产物会输出到 `dist/`。这个站点没有后端，部署时只需要发布 `dist/`。

### 部署

仓库已经配置 GitHub Pages workflow：

```text
.github/workflows/deploy-pages.yml
```

推送到 `main` 后会自动执行：

```text
install dependencies → build → upload dist → deploy pages
```

如果绑定 `smileflow.cn`，域名解析和 HTTPS 状态在 GitHub Pages 设置里检查。HTTPS 证书由 GitHub Pages 自动签发和续期。

### 流量统计

站点已接入 Cloudflare Web Analytics。脚本在 `index.html` 里，通过 Cloudflare 的 public beacon snippet 上报基础访问数据。

它不影响当前部署架构：DNS 仍在阿里云，站点仍由 GitHub Pages 托管，Cloudflare 只负责统计。

## 怎么发布一篇新文章

1. 在 `src/content/posts/` 下新建一个 `.md` 文件（文件名即默认 slug）。
2. 文件开头写 frontmatter：

   ```markdown
   ---
   title: "文章标题"
   slug: "my-post"            # 可选，默认取文件名；分享链接是 /#post/<slug>
   date: "2026-07-04"         # 决定列表排序（新的在前）
   type: "Essay"              # Essay=思考 / Build=构建笔记 / Skill=方法论
   adapter: "Agent Workflows" # 列表 meta 里显示的方向标签
   summary: "列表和文章顶部显示的一句话摘要"
   tags: ["标签1", "标签2"]
   readingTime: "6 min"
   featured: true             # 可选，设为默认展开的文章（取日期最新的一篇 featured）
   status: "Published"        # 显示在文章 meta 里；mock 内容目前用的是 "Demo"
   ---

   正文直接写 Markdown，支持表格、代码块等 GFM 语法。
   ```

3. 保存即可，构建时会自动扫描该目录，无需注册。

## 怎么收藏文章 / 记想法（日常用法）

在本仓库里对 Claude 说一句话即可（`collect` skill 会接管全流程）：

- **收藏文章**：`收藏 https://example.com/some-post` → 自动抓取、生成 LLM 总结与批注、
  建议内化去向，写入 `src/content/context/<slug>.md` 并提交
- **记想法**：`记个想法：……` → 整理成 `kind: "idea"` 的条目
- 条目出现在首页 Context 区和 Library 的 Context tab（可搜索），
  详情页地址 `/#ctx/<slug>`
- `internalized` 字段记录内化去向（`skill:名` / `post:slug` / `code:仓库`），
  未内化的条目显示"待内化"——定期清点：要么内化，要么删

## 怎么发布一个新 skill

1. 在 `src/content/skills/` 下新建 `.md` 文件（文件名即 slug，站内地址 `/#skill/<slug>`）。
2. frontmatter 字段：`index`（S1/S2…）、`name`（英文名）、`zh`（中文名）、`desc`（一句话）、
   `status`（`live` 已发布 / `draft` 草稿可读 / `soon` 占位）、`source`（GitHub 源码链接，可选）、
   `post`（关联文章 slug，可选）。
3. 正文就是 skill 全文，站内直接可读，无需注册。

## 怎么改站点内容

个人信息、About、Serving Endpoints（endpoints）、项目（projects）、now training 清单
（nowTraining）、打字机文案（statusLines）都集中在 `src/content/site.js`，直接改字段即可。
新开一个平台账号时，把 `endpoints` 里对应条目的 `status` 从 `"soon"` 改成 `"200"` 并补上 `href`。

## Design Direction

视觉遵循 `docs/design-reference.md`（Monad）：暖羊皮纸底、衬线标题（weight 400）、
全 mono UI、单一 Lake Blue 强调、细线 + 胶囊按钮。动效遵循 Emil Kowalski 标准
（<300ms、强 ease-out、只动 transform/opacity），桌面端有板块滚动吸附。
布局是编辑刊骨架，但所有板块组件都长在「大模型」隐喻上，不借用其他网站的招牌组件。

## Structure

- `src/App.jsx` — 页面区块与交互（hash 路由 + 导航栈、二级页、scroll-spy、reveal 动画）
- `src/MarkdownBody.jsx` — 懒加载的 Markdown 渲染器（react-markdown 不进首屏 bundle）
- `src/content/site.js` — 站点文案与数据（profile / about / endpoints / projects…）
- `src/content/posts.js|skills.js|context.js` — 三类 Markdown 内容的加载与 frontmatter 解析
- `src/styles.css` — 响应式布局与动画系统
- `scripts/gen-rss.mjs` — 构建前生成 RSS
- `.claude/skills/` — 可安装的 Claude skills（含 collect 收藏工作流）
- `docs/maintenance.md` — 代码结构、内容编辑、部署和验证清单

### 路由一览

| 地址 | 内容 |
| --- | --- |
| `/#about` … `/#contact` | 首页板块锚点（01-06） |
| `/#post/<slug>` | 文章二级页（阅读进度条 + 返回栈） |
| `/#skill/<name>` | skill 二级页 |
| `/#ctx/<slug>` | 收藏/想法二级页（顶部原文引用条） |
| `/#library` `/#library/skills` `/#library/context` | 全部内容页，三 tab + 实时搜索 |
| `/rss.xml` | RSS 订阅 |
