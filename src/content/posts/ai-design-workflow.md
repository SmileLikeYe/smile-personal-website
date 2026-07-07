---
title: "怎样用 AI 做设计：我的六步工作流"
slug: "ai-design-workflow"
date: "2026-06-21"
type: "Skill"
adapter: "Design"
summary: "设计仍是应用最大的护城河。微调设计比写代码难，描述风格更难——所以别用形容词传递审美，用 design.md、截图和结构清单。"
tags: ["AI设计", "工作流", "design.md", "动效"]
readingTime: "8 min"
featured: true
status: "Published"
---

最近让 AI 设计了两个应用的首页，最大的感受是：**设计现在还是应用最大的护城河。** 代码可以让 AI 写，但"好看"没法一句话说清——微调设计比写代码难多了，难点在于风格几乎无法用语言描述。

我的解法是：不要试图用形容词向 AI 描述审美，而是把审美**物化成三样东西**——design.md、参考截图、结构清单。下面是我完整的六步工作流。

## 第一步：搜集风格

好设计先从"看见"开始。我常用两个地方：

- [styles.refero.design](https://styles.refero.design)：收集了大量真实网站的设计风格
- [getdesign.md](https://getdesign.md)：可以快速拿到一个网站风格的 design.md

关键动作是拿到 **design.md**——它把一个网站的配色 token、字体规则、组件形态、Do/Don't 全部写成了机器可读的文本。这就是"风格"的可传递形式。找到和你产品气质相符的那一份，存进项目里。

## 第二步：先定结构，不出图

把 PRD 和产品目标给 AI，让它提炼出产品**最有特色的部分**：要展示什么内容、什么顺序、什么层级。这一步只要文字版的页面结构，不要出图。

可以让它多写几个版本。结构清单是最便宜的迭代单位——在这一层多改几轮，比在视觉稿上返工划算得多。

## 第三步：出图

把三样东西一起给出图模型：design.md + 参考网站截图 + 你选定的结构清单。

我用下来出图效果最好的是 ChatGPT 的图像模型。可以让它一次出 3 种风格，挑你喜欢的；有静态素材也可以让它顺手抠出来。

## 第四步：图转页面

这一步现在的强模型都能做，没什么可说的。要点只有一个：**选中的图就是唯一事实来源**——布局、密度、间距、颜色、字体、层级都从图上来，实现后对着图的细微之处逐项微调。

我自己的习惯是让 Agent 在三个视口（桌面/平板/手机）截图对比，不靠"看起来差不多"。

## 第五步：交互与动画

交互是让页面出彩的关键。我喜欢用 [motion](https://motion.dev) 或 gsap 加**小范围、精致**的动画，指导思想来自 Emil Kowalski 的 [emil-design-eng skill](https://skills.sh/emilkowalski/skills/emil-design-eng) 和 [animations.dev](https://animations.dev)：

| 规则 | 内容 |
| --- | --- |
| 先问要不要动 | 高频操作永不动画；低频场景才加 delight |
| 动画要有目的 | 反馈 / 空间连续 / 状态说明，"酷"不是理由 |
| Easing | 进出场 ease-out，屏上移动 ease-in-out，UI 上永不用 ease-in |
| 用强曲线 | `cubic-bezier(0.23, 1, 0.32, 1)`，内置曲线太弱 |
| 时长 | UI 动画 < 300ms，按压反馈 100–160ms |
| 物理感 | 永不 scale(0)；按压 scale(0.97) |
| 性能 | 只动 transform 和 opacity |

更多微妙的过渡范例可以看 [transitions.dev](https://transitions.dev)。

## 第六步：眼睛

最后是发现美的眼睛。要自己多看、多搜集、多观察——这一步没有工具可以替代。审美是一种训练出来的直觉：看足够多的好东西，想清楚它们为什么好。

## 实战：这个网站的改版

这套流程我在本站上完整跑过一遍：在 refero 找到 Monad 风格（暖羊皮纸 + 衬线标题 + 全 mono UI + 单一 Lake Blue），抓下完整 design.md 存进仓库，让 Agent 按 token 逐项重塑，再用 motion 加了导航弹性圆点、序列入场和数字滚动。全程没有用一个形容词描述风格——**design.md 就是审美的接口。**
