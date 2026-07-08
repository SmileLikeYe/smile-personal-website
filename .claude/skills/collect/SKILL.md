---
name: collect
description: 收藏入库工作流。当用户丢来一个 URL（"收藏这个"、"存一下这篇"）或说出一个想法（"记个想法"）时使用：抓取并生成 LLM 总结，写成 src/content/context/ 下的 markdown 收藏条目（含 takeaway、批注、内化去向），构建验证后提交。这是本站 Context 区的唯一入库方式。
---

# 收藏入库（Context Collect）

用户丢 URL 或说想法 → 生成一条 `src/content/context/<slug>.md` → 构建验证 → 提交。

## 收藏文章（输入是 URL）

1. **抓取**：WebFetch 该 URL，提取标题、作者、发表日期、核心论点、框架结构、最具体的工程洞察（不要泛泛的）
2. **写文件** `src/content/context/<slug>.md`（slug 用 kebab-case，作者名或主题开头）：

```markdown
---
title: "原文标题"
url: "原文链接"
author: "作者"
saved: "今天日期 YYYY-MM-DD"
kind: "article"
tags: ["3-5 个"]
takeaway: "一句话——这篇最值得记住的一个论断，写给三个月后的自己"
internalized: ""   # 内化去向：skill:名 / post:slug / code:仓库，未定留空
---

## LLM 总结

**核心论点**：2-3 句。

（框架/要点列表，保留原文的具体数字和术语，不要稀释成套话）

## 我的批注

（这篇和用户已有的 skill/文章/项目怎么关联？哪一点值得内化、内化到哪里？
写不出批注的收藏不值得入库——这是入库门槛。）
```

3. **内化建议**：对照现有 skills（agent-delivery / eval-driven / ai-design…）和文章，在批注里明确建议内化去向；高度相关的直接填 `internalized` 字段
4. **验证**：`npm run build` 通过；条目出现在 Context 列表
5. **提交**：`ctx: 收藏 <标题>`，正常推送流程

## 记想法（输入是一段话）

1. 文件同上，`kind: "idea"`，无 url/author；slug 以 `idea-` 开头
2. 正文两段：`## 想法本体`（把用户的话整理成清晰表述，保留原味不要过度润色）+ `## 下一步`（1-3 条可执行的验证/落地动作）
3. takeaway 提炼想法的核心一句

## 纪律

- **总结要有原文的筋骨**：具体术语、数字、框架名，禁止"这篇文章讲了…的重要性"式空话
- **必须有批注**：没有"和我什么关系"的收藏是死收藏
- **内化是目的**：定期检查 `internalized` 为空的条目——要么内化，要么承认它没那么重要
