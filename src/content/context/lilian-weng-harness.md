---
title: "Harness Engineering for Self-Improvement"
url: "https://lilianweng.github.io/posts/2026-07-04-harness/"
author: "Lilian Weng"
saved: "2026-07-08"
kind: "article"
tags: ["Harness", "RSI", "Agent", "Context Engineering"]
takeaway: "近期的递归自改进不发生在权重里，发生在 harness 里——模型外面那层编排系统本身就是可被优化、可被进化搜索的代码。"
internalized: "skill:agent-delivery"
---

## LLM 总结

**核心论点**：围绕模型的系统架构——harness（工作流自动化、持久记忆、编排层）——对递归自改进（RSI）的重要性不亚于模型智能本身。近期的 RSI 不是模型改写自己的权重，而是部署系统层的持续优化：模型怎么思考、怎么规划、怎么用工具、怎么管理上下文。

**框架六部分**：

1. **Harness 设计模式** —— 三个地基：目标导向的工作流循环、基于文件系统的持久记忆、子 agent 并行化
2. **Context Engineering** —— ACE / MCE / Meta-Harness 的递进框架：上下文是持续进化的 playbook，不是越长越好的 prompt
3. **工作流设计** —— 用自动化搜索（ADAS、AFlow）在 agentic 系统设计空间里找更好的执行模式
4. **自改进 Harness** —— STOP、Self-Harness：系统通过反馈循环优化自己的运行代码
5. **进化搜索** —— 种群式优化 harness 组件与 prompt（AlphaEvolve、Darwin Gödel Machine）
6. **联合优化** —— harness 进化与模型权重更新的结合（SIA）

**最值得记的工程洞察**：

- **文件系统即情景记忆**：harness 不该把整个工作流和日志都扛在上下文里，持久状态要落在文件里——中断可恢复，历史可推理
- **并行必须可检视**：子 agent 的产出要持久化成文件/日志，不能只活在转瞬即逝的对话上下文里
- **代码是通用优化对象**：harness 一旦是可执行代码，LLM 就能在远大于手写 prompt 的设计空间里搜索——harness 本身成了进化搜索的对象
- **有界的提案空间防止 reward hacking**：Self-Harness 把可编辑面限制在特定可验证的表面，用 held-in/held-out 测试拆分防回归
- **先挖弱点再提提案**：改 harness 之前，先把失败按 verifier 锚定的模式聚类，找根因而不是修表象

## 我的批注

这篇几乎是在给我日常的工作方式做理论背书——我的 agent-delivery skill 里"侦察外包给子任务、结论落主线""步步验证不攒批"，就是她说的"文件系统即记忆"和"并行可检视"的土办法版本。

两个要内化的点：① 把我的交付循环里"验证"那步升级成她说的 **held-in/held-out** 思路——评测集拆一部分只做回归防守，不参与优化，这和我 eval-driven skill 的哨兵集是同一个东西，两个 skill 应该互相引用；② "weakness mining precedes proposals"——失败先聚类再动手，比我现在的四类失败分类学更进一步，值得把 agent-chief 里的错误处理也照这个改。

另外 "harness" 这个词要坚持用——我关注的方向（FOCUS: Harness Agent）终于有了一篇可以甩给别人的定义级文章。
