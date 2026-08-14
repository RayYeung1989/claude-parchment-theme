# Claude Parchment Theme — DSH WebUI 主题插件

为 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) WebUI 打造的 Anthropic Claude 风格主题插件。

> 设计参考：Claude（Anthropic）设计系统 —— 暖羊皮纸画布、Terracotta 品牌色、
> 衬线标题、黄褐调中性灰、环式阴影哲学。

![风格速览](https://img.shields.io/badge/style-Claude%20Parchment-c96442)

## 效果

| 维度 | 说明 |
|------|------|
| 页面底色 | Parchment `#f5f4ed`（亮）/ Deep Dark `#141413`（暗） |
| 品牌色 | Terracotta `#c96442`（暗色下 Coral `#d97757`） |
| 字体 | 全界面 Georgia 衬线（Anthropic Serif 替代），标题字重 500，代码保持等宽 |
| 中性色 | 全部冷灰重映射为黄褐调暖灰（Olive Gray `#5e5d59`、Stone Gray `#87867f`…） |
| 去蓝化 | DeepSeek 品牌蓝静态色板 → Terracotta 家族；链接、info 按钮、引用 chip 全部转暖 |
| 细节 | 陶土色选区、Focus Blue `#3898ec` 焦点环（系统唯一冷色，仅可达性）、暖调滚动条 |

## 安装（持久化，出现在 WebUI 插件管理）

插件是一个标准的 `dsh.client` 双面包（node half + browser half）。

### 1. 安装依赖

在你的 DSH profile 目录（如 `$DSH_HOME/profiles/web`）添加依赖：

```bash
cd "$DSH_HOME/profiles/web"
pnpm add "github:RayYeung1989/claude-parchment-theme"
```

或直接编辑 `package.json`：

```json
{
  "dependencies": {
    "@dsh-local/claude-parchment-theme": "github:RayYeung1989/claude-parchment-theme"
  }
}
```

### 2. 注册插件行

编辑 profile 的 `cordis.patch.yml`，追加：

```yaml
# Claude Parchment 主题（持久化 client 插件）
- insert:
    - id: ui-claude-theme
      name: '@dsh-local/claude-parchment-theme'
```

### 3. 重启

重启 DSH web profile（`dsh --profile web`）。启动后主题自动生效，
并可在 WebUI 的 **设置 → 插件管理** 中看到 `ui-claude-theme` 行。

## 临时使用（会话内动态插件，不持久）

在对话中让 Agent 定义动态插件即可（`@clth-1`），重启后消失。

## 自定义

改色：编辑 `lib/client.js` 中的 `ALIAS` / `EXTRA_LIGHT` / `EXTRA_DARK` /
`NEUTRAL_WARM` / `DEEPSEEK_WARM` 常量，或字体变量 `SERIF`。

## 许可证

MIT
