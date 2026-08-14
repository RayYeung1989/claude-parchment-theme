# Claude Parchment Theme — 一款 Claude 风格的 dsh插件

[English](README.en.md) · [中文](README.md)

> **dsh插件**（DeepSeek Harness Plugin）· 为 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) WebUI 打造
> 的 Anthropic Claude 风格主题。设计参考：Claude（Anthropic）设计系统 —— 暖羊皮纸画布、
> Terracotta 品牌色、衬线标题、黄褐调中性灰、环式阴影哲学。

![style](https://img.shields.io/badge/style-Claude%20Parchment-c96442)
![license](https://img.shields.io/badge/license-MIT-green)

---

## 这是什么

`claude-parchment-theme` 是一个**纯客户端 dsh插件**（`dsh.client` 双面包结构：宿主侧空实现 + 浏览器侧主题逻辑），
把 DSH WebUI 的整体视觉语言切换到 Claude 风格：

- 暖羊皮纸底色取代冷白/冷灰，营造"纸质阅读"氛围
- 全界面 Georgia 衬线字体（Anthropic Serif 的替代实现），标题字重 500
- 所有中性灰重映射为黄褐调暖灰（Olive Gray `#5e5d59`、Stone Gray `#87867f`…）
- DeepSeek 品牌蓝 → Terracotta 家族，彻底去蓝化

安装后它会作为一个常驻行出现在 **WebUI 设置 → 插件管理** 中，可随时开关。

## 效果速览

| 维度 | 亮色主题 | 暗色主题 |
|------|---------|---------|
| 页面底色 | Parchment `#f5f4ed` | Deep Dark `#141413` |
| 卡片表面 | Ivory `#faf9f5` | Dark Surface `#30302e` |
| 品牌强调 | Terracotta `#c96442` | Coral `#d97757` |
| 主文本 | Near Black `#141413` | Ivory `#faf9f5` |
| 次要文本 | Olive Gray `#5e5d59` | Warm Silver `#b0aea5` |
| 边框 | Border Cream `#f0eee6` | Dark Warm `#30302e` |
| 错误/成功/警告 | `#b53333` / `#55805e` / `#b07d3f` | `#cf5b5b` / `#6fae7f` / `#d9a441` |

**字体**：全界面衬线（Georgia + 中文宋体回退），代码保持等宽。
**细节**：陶土色选区、Focus Blue `#3898ec` 焦点环（系统唯一冷色，仅用于可达性）、暖调滚动条。

## 安装（持久化，推荐）

本 dsh插件 以标准 npm 包形式从 GitHub 安装，随 profile 持久化，重启不丢失。

### 1. 安装依赖

```bash
cd "$DSH_HOME/profiles/web"
pnpm add "github:RayYeung1989/claude-parchment-theme"
```

### 2. 注册插件行

编辑 profile 的 `cordis.patch.yml`，追加：

```yaml
# Claude Parchment 主题（持久化 dsh插件）
- insert:
    - id: ui-claude-theme
      name: '@dsh-local/claude-parchment-theme'
```

### 3. 重启生效

重启 DSH web profile（`dsh --profile web`）。启动后主题自动生效，
在 **设置 → 插件管理** 中可以看到 `ui-claude-theme` 行。

## 临时使用（会话内动态插件）

也可以让 Agent 在会话内以动态 Cordis 插件方式定义（不持久，进程重启后消失）——
开发调试配色时比较方便。

## 自定义

改色/改字：编辑 `lib/client.js` 中的常量：

- `ALIAS` — 13 个核心别名 token（亮/暗双色板）
- `EXTRA_LIGHT` / `EXTRA_DARK` — 链接、按钮、代码块、气泡等补充 token
- `NEUTRAL_WARM` / `DEEPSEEK_WARM` — 静态色板暖化映射
- `SERIF` — 衬线字体栈

改完推送到仓库，在 profile 里 `pnpm update` 同步。

## 常见问题

**Q: 装完没生效？** 检查 `pnpm add` 是否成功、`cordis.patch.yml` 行是否追加、以及是否已重启 DSH。
**Q: 想临时关掉？** 在插件管理中禁用该行，或从 `cordis.patch.yml` 移除 `- insert` 块。
**Q: 想改回默认？** 删除依赖与补丁行后重启即可，不改动任何应用文件。

## 许可证

MIT © RayYeung1989

---

*这是一个开箱即用的 Claude 风格 dsh插件，欢迎 star / fork / PR。*
