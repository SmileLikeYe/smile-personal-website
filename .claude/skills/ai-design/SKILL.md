---
name: ai-design
description: Smile 的 AI 设计工作流。用于任何界面设计、改版、出新页面的任务：先找风格参考（design.md），再定内容结构，再出图/实现，最后用 motion 加克制的动效。融合了 Emil Kowalski 的动效标准。做设计类任务时应遵循此流程，而不是直接开写 CSS。
---

# 怎样用 AI 做设计（Smile 的工作流）

设计是应用最大的护城河。微调设计比写代码难，描述设计风格更难——所以不要用形容词描述风格，用 design.md、截图和结构清单来传递它。

## 流程（按顺序执行）

### 1. 搜集风格参考

- 去 https://styles.refero.design 或 https://getdesign.md 找和产品气质匹配的风格
- 拿到该风格的 **design.md**（tokens、字体、组件、Do/Don't 全文），存进 `docs/` 作为项目资产
- 本站当前的风格参考：`docs/design-reference.md`（Monad：暖羊皮纸 + 衬线标题 + 全 mono UI + 单一 Lake Blue）

### 2. 先定内容与结构，不出图

- 结合 PRD / 产品目标，提炼"最有特色、最值得展示"的部分
- 只写文字版的页面结构（展示什么、什么顺序、什么层级），可以写多个版本挑一个
- 这一步的产出是结构清单，不是视觉稿

### 3. 出图（可选）

- 把 design.md + 参考网站截图 + 结构清单一起喂给出图模型（ChatGPT images 效果最好），一次出 3 种风格供选择
- 静态素材可以让它顺手抠出来
- 已有明确 design.md 时可跳过出图直接实现

### 4. 图/规范转页面

- 以选中的图或 design.md 为唯一事实来源：布局、密度、间距、颜色、字体、层级都从它来
- 实现后**必须截图对比**微调细节（多视口：1440 / 768 / 390）
- 本仓库截图脚本注意：先注入 `animation: none` 冻结动画再全页截图；程序化滚动用 `behavior: "instant"`

### 5. 交互与动画（用 motion / gsap，小范围、精致）

动效指导思想来自 Emil Kowalski（animations.dev / emil-design-eng skill），核心规则：

- **先问要不要动**：高频操作（键盘触发、每天上百次）永不动画；低频（弹窗、首次引导）才可以加 delight
- **每个动画要有目的**：反馈 / 空间连续性 / 状态说明 / 防跳变，"看起来酷"不是理由
- **Easing**：进出场 `ease-out`，屏上移动 `ease-in-out`，hover 用 `ease`，匀速运动 `linear`；永远不要在 UI 上用 `ease-in`
- **用强曲线**：`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`；`--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
- **时长**：UI 动画 < 300ms（按压反馈 100–160ms，弹层 150–250ms）；氛围类慢动画（渐变漂移）是唯一例外
- **物理感**：永不 `scale(0)`，从 `scale(0.95–0.97) + opacity 0` 出现；按压 `:active { scale(0.97) }`
- **性能**：只动 `transform` 和 `opacity`；预设动画用 CSS，可打断/手势用 JS（motion）
- **Stagger**：组进场 30–80ms 间隔，装饰性的 stagger 不能阻塞交互
- 更多微妙过渡的参考：https://transitions.dev

本仓库约定：motion 通过 `LazyMotion features={domAnimation} strict` 加载，只能用 `m.*` 组件。

### 6. 眼睛

多看、多搜集、多观察。审美判断没有捷径——每次实现后退一步问："重点突出吗？哪两个元素在打架？删掉什么会更好？"

## 输出要求

设计类任务完成时必须提供：改动前后截图对比、遵循了 design.md 哪些条目、动效各自的"目的"一句话说明。
