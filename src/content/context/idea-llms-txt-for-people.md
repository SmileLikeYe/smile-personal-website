---
title: "想法：个人主页应该有 /context 端点（llms.txt for people）"
saved: "2026-07-08"
kind: "idea"
tags: ["Personal AI", "llms.txt", "Serving Endpoints"]
takeaway: "既然 Agent 会代替人来「看」主页，个人网站就该暴露一个机器可读的 context 端点——把「我是谁」直接变成模型能加载的上下文。"
internalized: ""
---

## 想法本体

网站有 llms.txt 给爬虫看，人为什么没有？

越来越多的"访问"不是人在浏览器里看，而是 Agent 替人来查：招聘方的助理 Agent、合作方的调研 Agent。它们要的不是我的动效和排版，是结构化的事实：我是谁、做过什么、怎么验证、怎么联系。

所以这个站应该暴露一个 `/context.md`（或 `/llms.txt`）端点：

- 机器可读的自我介绍：角色、经历、可验证链接（本站 Serving Endpoints 的纯文本版）
- 全部文章和 skill 的索引 + 一句话摘要
- 明确的引用许可和联系方式

Agent 访问 smileflow.cn，一个请求就能把"Smile Hu 的 context"装进它的上下文窗口——**个人网站从「给人看的页面」变成「给模型加载的 context provider」**。

## 下一步

- 构建时从 site.js + posts + skills 自动生成 `public/context.md`（和 rss.xml 同一个 prebuild 思路）
- 观察有没有 Agent 真的来抓（Cloudflare 统计里看 UA）
- 如果成立，把这套生成器抽成开源小工具，可能比想象中多人需要
---

*状态：待内化 —— 计划先在本站实现最小版。*
