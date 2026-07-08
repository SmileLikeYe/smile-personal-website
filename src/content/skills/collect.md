---
index: "S4"
name: "collect"
zh: "收藏入库"
desc: "丢一个 URL 或一个想法给 Agent，自动抓取、LLM 总结、写批注、建议内化去向、入库提交——Context 区的唯一入口，收藏的终点是内化。"
status: "live"
source: "https://github.com/SmileLikeYe/smile-personal-website/tree/main/.claude/skills/collect"
---

我的收藏工作流：在仓库里对 Agent 说"收藏 <URL>"或"记个想法：……"，它会自动完成抓取 → LLM 总结 → 写批注 → 建议内化去向 → 建文件 → 构建验证 → 提交。产出就是本站 Context 区的条目。

## 数据结构

每条收藏是一个 markdown 文件（`src/content/context/*.md`）：

```markdown
---
title / url / author / saved
kind: "article" | "idea"
takeaway: 一句话，写给三个月后的自己
internalized: skill:agent-delivery   # 内化去向，未定留空
---

## LLM 总结      ← 有原文筋骨的总结：术语、数字、框架名
## 我的批注      ← 和我已有的 skill / 文章 / 代码什么关系
```

## 三条纪律

1. **总结要有原文的筋骨**——具体术语、数字、框架，禁止"讲了…的重要性"式空话
2. **必须有批注**——写不出"和我什么关系"的收藏不值得入库，这是入库门槛
3. **内化是目的**——收藏不是终点；定期清点 `internalized` 为空的条目：要么内化进 skill/文章/代码，要么承认它没那么重要

## 为什么做成 Agent 工作流

收藏系统的死因从来不是工具不好，是摩擦太大：复制链接、想标签、写总结，每一步都在劝退。把整条链路压缩成对 Agent 说一句话，摩擦降到零，纪律由 skill 保证——这正是 harness 的用法：**流程固化在系统里，而不是靠自觉**。
