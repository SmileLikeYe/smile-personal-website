---
index: "C6"
name: "emil-design-eng"
zh: "Emil 动效标准"
desc: "Emil Kowalski（Vercel，sonner/vaul 作者）的设计工程 skill：什么该动、怎么动、动多久——一套可以背下来的动效决策表。"
status: "live"
kind: "curated"
author: "Emil Kowalski"
source: "https://skills.sh/emilkowalski/skills/emil-design-eng"
---

> 收藏自 **Emil Kowalski**（animations.dev 作者，sonner / vaul 等开源库作者），原文见出处链接。点评是我的使用心得，本站所有动效都按这套标准执行。

大多数人做动效的问题不是不会做，是**不知道什么时候不该做**。Emil 这套标准最值钱的就是第一张表。

## 该不该动？（频率决策表）

| 使用频率 | 决策 |
| --- | --- |
| 每天 100+ 次（快捷键、命令面板） | 永不动画 |
| 每天几十次（hover、列表导航） | 移除或大幅缩短 |
| 偶尔（弹窗、抽屉、toast） | 标准动画 |
| 罕见/首次（引导、庆祝） | 可以加 delight |

**键盘触发的操作永不动画**——它们每天重复上百次，动画只会让人觉得慢。Raycast 的开合没有任何动画，就是对的。

动效的合法目的只有五种：空间连续、状态说明、解释因果、反馈、防跳变。"看起来酷"不在其中。

## 怎么动？（Easing 决策序）

- 进场/出场 → `ease-out`（起步快，显得响应快）
- 屏上移动/变形 → `ease-in-out`
- hover/颜色 → `ease`；匀速滚动 → `linear`
- **永远不要在 UI 上用 `ease-in`**——它起步慢，恰好慢在用户盯着看的那一刻
- 内置曲线太弱，用强曲线：`cubic-bezier(0.23, 1, 0.32, 1)`（out）/ `cubic-bezier(0.77, 0, 0.175, 1)`（in-out）

## 动多久？

- UI 动画 < 300ms；按压反馈 100–160ms；弹层 150–250ms
- 慢速氛围动画（渐变漂移、呼吸）是唯一例外
- 物理感：永不 `scale(0)`，从 `scale(0.95) + opacity 0` 出现；按压 `:active { scale(0.97) }`
- 组进场 stagger 30–80ms，装饰性 stagger 不能阻塞交互

## 性能

只动 `transform` 和 `opacity`；预设动画用 CSS，可打断/手势跟随用 JS（motion/gsap）。

## 我的心得

这套标准的威力在于**它是决策表不是灵感**——review 任何一个动效，三个问题走完就有结论：这个元素多久被看一次？动的目的是五种之一吗？曲线和时长在表里吗？本站的入场 stagger（45ms）、按压 scale(0.98)、hover 标题右滑 200ms ease-out，全部能在这三问里对上号。

和 taste-skill 搭配用：先用 taste 决定"要不要、放哪里"，再用 Emil 决定"怎么动、动多久"。
