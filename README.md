# Smile Personal Website

Smile Hu 的个人积累与分发平台：宣传自己 + 沉淀影响力。
循环是 写 WRITE（文章）→ 建 BUILD（产品）→ 淀 DISTILL（skill），内容先在这里沉淀，再分发到 GitHub / 小红书等平台。
排版是编辑大刊风格（参考 [sac-ai.com](https://github.com/Sac-Y/sac-ai.com)），视觉 token 遵循 `docs/design-reference.md`（Monad）。

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

## Structure

- `src/App.jsx` — 页面区块与交互（scroll-spy、hash 路由、reveal 动画）
- `src/MarkdownBody.jsx` — 懒加载的 Markdown 渲染器（react-markdown 不进首屏 bundle）
- `src/content/site.js` — 所有可编辑的站点文案与数据
- `src/content/posts.js` — Markdown 文章的加载与 frontmatter 解析
- `src/styles.css` — 响应式布局与动画系统
- `public/assets/` — 站点图片资源
