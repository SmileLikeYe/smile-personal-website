# Smile Personal Website

人不是一段静态简介，更像一个在现实里运行的开放系统。

每天接收新的边界条件，在反馈里校准，在熵增里保留一点秩序，再把理解压缩成产品、文章、工具和更可靠的判断。

这个网站记录的是这条轨迹。它不是作品集的终点，而是一个持续更新的观测面：我如何学习，如何构建，如何把 AI 能力变成可以交付的东西。

如果简历回答的是“我做过什么”，这里更关心“我如何形成判断”。

## Stack

- React 19 + Vite
- Markdown blog posts loaded from `src/content/posts/*.md`
- No backend — everything is static and deployable to any static host

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Maintenance

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

## 怎么改站点内容

个人信息、About、全平台信号台（channels）、Skills、项目（projects）、排队清单（queued）
都集中在 `src/content/site.js`，直接改字段即可，不用动组件。
标了 `[MOCK]` 的数字和链接是占位符，替换成真实数据。
新开一个平台账号时，把 `channels` 里对应条目的 `status` 从 `"soon"` 改成 `"live"` 并补上 `href`。

## Design Direction

网站围绕“个人能力模型”展开：教育和基础能力像 pre-training，真实项目和 AI 产品实践像 fine-tuning，文章、开源贡献、产品交付和方法论是最终输出。

视觉上保持克制、清晰、偏编辑型，让访问者快速理解：我是谁、我在构建什么、我有什么可验证的输出。

## Structure

- `src/App.jsx` — 页面区块与交互（scroll-spy、hash 路由、reveal 动画）
- `src/MarkdownBody.jsx` — 懒加载的 Markdown 渲染器（react-markdown 不进首屏 bundle）
- `src/content/site.js` — 所有可编辑的站点文案与数据
- `src/content/posts.js` — Markdown 文章的加载与 frontmatter 解析
- `src/styles.css` — 响应式布局与动画系统
- `public/assets/` — 站点图片资源
