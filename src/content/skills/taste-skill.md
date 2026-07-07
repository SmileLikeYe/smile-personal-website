---
index: "C5"
name: "taste-skill"
zh: "Design Taste（反 AI 味）"
desc: "Leonxlnx 的 taste-skill：用三个参数（VARIANCE/MOTION/DENSITY）+ 禁用清单系统性消灭「AI 生成感」——紫色渐变、居中 Hero、三等分卡片全部封杀。"
status: "live"
kind: "curated"
author: "Leonxlnx"
source: "https://github.com/Leonxlnx/taste-skill"
---

> 收藏自 **Leonxlnx**（MIT 协议），原文见出处链接。点评是我的使用心得，本站的"去雷同"改版就是照着它做的。

AI 生成的界面有股统一的"AI 味"：紫色渐变、居中大标题、三张等宽卡片、Inter 字体、假名字假数据。这份 skill 的价值是把"味道"这种玄学**工程化成了参数和禁用清单**。

## 核心结构（摘要）

**三个全局参数**，驱动所有生成决策：

```text
DESIGN_VARIANCE : 8   (1=完美对称 → 10=艺术混乱)
MOTION_INTENSITY: 6   (1=静态 → 10=电影级物理)
VISUAL_DENSITY  : 4   (1=美术馆留白 → 10=驾驶舱密度)
```

**AI 味禁用清单**（节选）：

- 紫色/霓虹渐变（"THE LILA BAN"）、纯黑 #000、文字渐变大标题 —— 禁
- VARIANCE > 4 时居中 Hero 禁用，强制左右分栏/不对称留白
- "三张等宽卡片"的 feature 区 —— 禁，改 2 栏 Z 字或不对称网格
- Inter 字体 —— 禁（用 Geist / Satoshi / Cabinet Grotesk）
- "John Doe"、"99.99%"、"Acme" 式假数据 —— 禁，用有机的真实感数据
- "Elevate / Seamless / Unleash" 式 AI 文案 —— 禁，用具体动词

**永动微交互**（MOTION > 5 时）：状态点呼吸、打字机循环、无限轮播——但必须隔离在独立组件里，用 spring 物理（stiffness 100, damping 20），永不阻塞主布局渲染。

**性能红线**：噪点纹理只贴在 fixed + pointer-events-none 的伪元素上；只动 transform/opacity；z-index 克制。

## 我的心得

它和 Emil 的动效标准是互补的两半：Emil 管"动得对不对"，taste-skill 管"长得像不像模板"。我的用法：

1. 本站的纸纹颗粒实现（fixed 伪元素 + multiply）直接来自它的性能红线条款
2. Contact 区从居中改为不对称双栏，是它的 ANTI-CENTER BIAS 条款
3. 打字机状态行、呼吸圆点这些"永动微交互"，也是它的 Perpetual Micro-Interactions 思路

最重要的一条元认知：**"有品味"的可操作定义，是避开所有人都会掉进去的默认值。** 这份 skill 本质上是一张"默认值黑名单"——照着避开，作品就自动和 80% 的 AI 产出区分开了。
