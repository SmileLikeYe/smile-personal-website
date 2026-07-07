---
index: "S1"
name: "ai-design"
zh: "怎样用 AI 做设计"
desc: "别用形容词传递审美——用 design.md、截图和结构清单。六步：风格 → 结构 → 出图 → 实现 → 动效 → 眼睛。"
status: "live"
source: "https://github.com/SmileLikeYe/smile-personal-website/tree/main/.claude/skills/ai-design"
post: "ai-design-workflow"
---

设计是应用最大的护城河。微调设计比写代码难，描述设计风格更难——所以不要用形容词描述风格，用 design.md、截图和结构清单来传递它。

这份 skill 可以直接放进任何项目的 `.claude/skills/` 目录，让 Agent 在做设计类任务时遵循这套流程，而不是直接开写 CSS。

## 流程（按顺序执行）

### 1. 搜集风格参考

- 去 [styles.refero.design](https://styles.refero.design) 或 [getdesign.md](https://getdesign.md) 找和产品气质匹配的风格
- 拿到该风格的 **design.md**（tokens、字体、组件、Do/Don't 全文），存进 `docs/` 作为项目资产

### 2. 先定内容与结构，不出图

- 结合 PRD / 产品目标，提炼"最有特色、最值得展示"的部分
- 只写文字版的页面结构（展示什么、什么顺序、什么层级），可以写多个版本挑一个
- 这一步的产出是结构清单，不是视觉稿——结构清单是最便宜的迭代单位

### 3. 出图（可选）

- 把 design.md + 参考网站截图 + 结构清单一起喂给出图模型（ChatGPT images 效果最好），一次出 3 种风格供选择
- 静态素材可以让它顺手抠出来
- 已有明确 design.md 时可跳过出图直接实现

### 4. 图 / 规范转页面

- 以选中的图或 design.md 为唯一事实来源：布局、密度、间距、颜色、字体、层级都从它来
- 实现后**必须截图对比**微调细节（多视口：1440 / 768 / 390）

### 5. 交互与动画（用 motion / gsap，小范围、精致）

动效指导思想来自 Emil Kowalski（animations.dev），核心规则：

| 规则 | 内容 |
| --- | --- |
| 先问要不要动 | 高频操作永不动画；低频场景才加 delight |
| 动画要有目的 | 反馈 / 空间连续 / 状态说明，"酷"不是理由 |
| Easing | 进出场 ease-out，屏上移动 ease-in-out，UI 上永不用 ease-in |
| 用强曲线 | `cubic-bezier(0.23, 1, 0.32, 1)`，内置曲线太弱 |
| 时长 | UI 动画 < 300ms，按压反馈 100–160ms |
| 物理感 | 永不 scale(0)；按压 scale(0.97) |
| 性能 | 只动 transform 和 opacity |
| Stagger | 组进场 30–80ms 间隔，装饰性 stagger 不能阻塞交互 |

### 6. 眼睛

多看、多搜集、多观察。审美判断没有捷径——每次实现后退一步问："重点突出吗？哪两个元素在打架？删掉什么会更好？"

## 输出要求

设计类任务完成时必须提供：改动前后截图对比、遵循了 design.md 哪些条目、动效各自的"目的"一句话说明。
