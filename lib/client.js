/**
 * Claude Parchment Theme — Browser half (dsh.client module).
 *
 * 以 `window.__ModuleLoader__.load({ id, factory })` 契约注册为浏览器模块，
 * 导出 Cordis 插件 `{ apply }`。主题作用：
 *   1. theme Service 覆盖层：13 个核心别名 token（亮/暗双色板）。
 *   2. 全局样式表：暖化静态色板（neutral-bluish → 暖灰、deepseek → 陶土）、
 *      衬线字体系统、气泡/引用 chip/选区/焦点环细节。
 * 样式表标签带 data-plugin-css 去重，插件卸载时由 ctx.effect 自动移除。
 */
window.__ModuleLoader__.load({
  id: "@dsh-local/claude-parchment-theme",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    // ── 核心别名 token（theme.overrideTokens + CSS 兜底）──────────────
    const ALIAS = {
      '--dsw-alias-bg-base':            { light: '#f5f4ed', dark: '#141413' }, // Parchment / Deep Dark
      '--dsw-alias-bg-layer-1':         { light: '#faf9f5', dark: '#30302e' }, // Ivory / Dark Surface
      '--dsw-alias-bg-layer-2':         { light: '#f0eee6', dark: '#262624' },
      '--dsw-alias-bg-overlay':         { light: '#faf9f5', dark: '#262624' },
      '--dsw-alias-border-l1':          { light: '#f0eee6', dark: '#262624' }, // Border Cream
      '--dsw-alias-border-l2':          { light: '#e8e6dc', dark: '#30302e' }, // Border Warm
      '--dsw-alias-brand-primary':      { light: '#c96442', dark: '#d97757' }, // Terracotta / Coral
      '--dsw-alias-label-primary':      { light: '#141413', dark: '#faf9f5' },
      '--dsw-alias-label-secondary':    { light: '#5e5d59', dark: '#b0aea5' }, // Olive Gray / Warm Silver
      '--dsw-alias-state-error-primary':   { light: '#b53333', dark: '#cf5b5b' },
      '--dsw-alias-state-success-primary': { light: '#55805e', dark: '#6fae7f' },
      '--dsw-alias-state-warn-primary':    { light: '#b07d3f', dark: '#d9a441' },
      '--dsw-specific-sidebar-fill':    { light: '#f5f4ed', dark: '#1d1d1b' },
    }

    // ── 别名之外的暖调补全（链接、info 按钮、代码块、气泡、滚动条、悬停态）──
    const EXTRA_LIGHT = {
      '--dsw-alias-state-business-primary': '#c96442', // 链接：DeepSeek 蓝 → Terracotta
      '--dsw-alias-state-business-tertiary': 'rgba(201, 100, 66, .12)',
      '--dsw-alias-button-info-fill': '#c96442',
      '--dsw-alias-button-info-hover': '#b55638',
      '--dsw-alias-brand-primary-new-colorprimary-new-color': '#c96442',
      '--dsw-alias-interactive-bg-hover': 'rgba(20, 20, 19, .05)',
      '--dsw-alias-interactive-bg-hover-accent': 'rgba(201, 100, 66, .10)',
      '--dsw-alias-interactive-bg-active': 'rgba(20, 20, 19, .08)',
      '--dsw-alias-interactive-bg-hover-danger': 'rgba(181, 51, 51, .06)',
      '--dsw-alias-label-tertiary': '#87867f', // Stone Gray
      '--dsw-alias-label-caption': '#87867f',
      '--dsw-alias-label-dimmed': '#b0aea5',
      '--dsw-alias-markdown-code-block': '#efeae0',
      '--dsw-alias-markdown-code-block-banner': '#e6e1d3',
      '--dsw-alias-markdown-inline-code': '#e9e4d8',
      '--dsw-alias-markdown-citation': '#f0eee6',
      '--dsw-alias-markdown-placeholder': '#e8e6dc',
      '--dsw-alias-markdown-tag': '#e8e6dc',
      '--dsw-alias-markdown-code-segment-selected': '#faf9f5',
      '--dsw-alias-markdown-code-segment-unselected': '#e8e6dc',
      '--dsw-alias-scrollbar-bg-l1': '#d1cfc5',
      '--dsw-alias-scrollbar-bg-l2': '#d1cfc5',
      '--dsw-alias-scrollbar-hover-l1': '#c2c0b6',
      '--dsw-alias-scrollbar-hover-l2': '#c2c0b6',
      '--dsw-specific-bubble': '#ece7da',
      '--dsw-specific-bubble-highlight': '#c96442',
      '--dsw-specific-sidebar-nav-item-active': '#ece7da',
      '--dsw-specific-sidebar-nav-item-hover': '#f0eee6',
      '--dsw-specific-sidebar-nav-item-active-accent': '#c96442',
      '--dsw-specific-menu': '#faf9f5',
      '--dsw-specific-input-major': '#faf9f5',
      '--dsw-specific-selector': '#f0eee6',
      '--dsw-specific-tip': '#f0eee6',
      '--dsw-alias-toast-bg': '#30302e',
      '--dsw-alias-tooltip-bg': '#30302e',
      '--dsw-alias-button-primary-hover': '#b55638',
      '--dsw-alias-button-primary-dimmed': '#f0e6df',
      '--dsw-alias-button-elevated-fill': '#ffffff',
      '--dsw-alias-button-floating-fill': '#faf9f5',
      '--dsw-alias-button-floating-hover': '#e8e6dc',
      '--dsw-alias-button-ghost-active-fill': '#ece7da',
      '--dsw-alias-button-ghost-active-hover': '#e8e6dc',
      '--dsw-alias-button-ghost-active-border': '#d1cfc5',
      '--dsw-alias-button-contrast-fill': '#30302e',
      '--dsw-alias-bg-mask-1': 'rgba(20, 20, 19, .24)',
      '--dsw-alias-bg-mask-2': 'rgba(20, 20, 19, .12)',
      '--dsw-alias-border-inverted': 'rgba(20, 20, 19, .06)',
      '--dsw-alias-bg-skeleton': 'rgba(20, 20, 19, .05)',
    }

    const EXTRA_DARK = {
      '--dsw-alias-state-business-primary': '#d97757',
      '--dsw-alias-state-business-tertiary': 'rgba(217, 119, 87, .16)',
      '--dsw-alias-button-info-fill': '#d97757',
      '--dsw-alias-button-info-hover': '#c96442',
      '--dsw-alias-brand-primary-new-colorprimary-new-color': '#d97757',
      '--dsw-alias-interactive-bg-hover': 'rgba(250, 249, 245, .06)',
      '--dsw-alias-interactive-bg-hover-accent': 'rgba(217, 119, 87, .16)',
      '--dsw-alias-interactive-bg-active': 'rgba(250, 249, 245, .10)',
      '--dsw-alias-interactive-bg-hover-danger': 'rgba(207, 91, 91, .14)',
      '--dsw-alias-label-tertiary': '#8f8d84',
      '--dsw-alias-label-caption': '#8f8d84',
      '--dsw-alias-label-dimmed': '#6a6861',
      '--dsw-alias-markdown-code-block': '#1f1f1d',
      '--dsw-alias-markdown-code-block-banner': '#262624',
      '--dsw-alias-markdown-inline-code': '#2a2a27',
      '--dsw-alias-markdown-citation': '#262624',
      '--dsw-alias-markdown-placeholder': '#262624',
      '--dsw-alias-markdown-tag': '#262624',
      '--dsw-alias-markdown-code-segment-selected': '#262624',
      '--dsw-alias-markdown-code-segment-unselected': '#1f1f1d',
      '--dsw-alias-scrollbar-bg-l1': '#3d3d3a',
      '--dsw-alias-scrollbar-bg-l2': '#3d3d3a',
      '--dsw-alias-scrollbar-hover-l1': '#4d4c48',
      '--dsw-alias-scrollbar-hover-l2': '#4d4c48',
      '--dsw-specific-bubble': '#262624',
      '--dsw-specific-bubble-highlight': '#d97757',
      '--dsw-specific-sidebar-nav-item-active': '#262624',
      '--dsw-specific-sidebar-nav-item-hover': '#1f1f1d',
      '--dsw-specific-sidebar-nav-item-active-accent': '#d97757',
      '--dsw-specific-menu': '#262624',
      '--dsw-specific-input-major': '#1f1f1d',
      '--dsw-specific-selector': '#262624',
      '--dsw-specific-tip': '#262624',
      '--dsw-alias-toast-bg': '#3d3d3a',
      '--dsw-alias-tooltip-bg': '#3d3d3a',
      '--dsw-alias-button-primary-hover': '#c96442',
      '--dsw-alias-button-primary-dimmed': '#262624',
      '--dsw-alias-button-elevated-fill': '#30302e',
      '--dsw-alias-button-floating-fill': '#262624',
      '--dsw-alias-button-floating-hover': '#30302e',
      '--dsw-alias-button-ghost-active-fill': '#262624',
      '--dsw-alias-button-ghost-active-hover': '#30302e',
      '--dsw-alias-button-ghost-active-border': '#4d4c48',
      '--dsw-alias-button-contrast-fill': '#faf9f5',
      '--dsw-alias-bg-mask-1': 'rgba(0, 0, 0, .5)',
      '--dsw-alias-bg-mask-2': 'rgba(0, 0, 0, .2)',
      '--dsw-alias-border-inverted': 'rgba(255, 255, 255, .06)',
      '--dsw-alias-bg-skeleton': 'rgba(250, 249, 245, .08)',
    }

    // ── 静态色板暖化：冷灰 → 黄褐调暖灰（设计文件核心规则）────────────
    const NEUTRAL_WARM = {
      '--dsw-static-neutral-bluish-00': '#ffffff',
      '--dsw-static-neutral-bluish-50': '#faf9f5',  // Ivory
      '--dsw-static-neutral-bluish-60': '#f5f4ed',  // Parchment
      '--dsw-static-neutral-bluish-75': '#f1efe7',
      '--dsw-static-neutral-bluish-100': '#eceadf',
      '--dsw-static-neutral-bluish-150': '#e8e6dc', // Warm Sand
      '--dsw-static-neutral-bluish-200': '#e2dfd3',
      '--dsw-static-neutral-bluish-300': '#d1cfc5', // Ring Warm
      '--dsw-static-neutral-bluish-400': '#b0aea5', // Warm Silver
      '--dsw-static-neutral-bluish-500': '#a3a197',
      '--dsw-static-neutral-bluish-600': '#87867f', // Stone Gray
      '--dsw-static-neutral-bluish-700': '#5e5d59', // Olive Gray
      '--dsw-static-neutral-bluish-750': '#4d4c48', // Charcoal Warm
      '--dsw-static-neutral-bluish-800': '#3d3d3a', // Dark Warm
      '--dsw-static-neutral-bluish-850': '#30302e', // Dark Surface
      '--dsw-static-neutral-bluish-875': '#262624',
      '--dsw-static-neutral-bluish-900': '#1d1d1b',
      '--dsw-static-neutral-bluish-950': '#141413', // Deep Dark
      '--dsw-static-neutral-bluish-1000': '#141413', // Near Black
      '--dsw-static-neutral-200': '#e2dfd3',
      '--dsw-static-neutral-300': '#d1cfc5',
    }

    // ── DeepSeek 品牌蓝 → Terracotta / Coral ────────────────────────
    const DEEPSEEK_WARM = {
      '--dsw-static-deepseek-50': 'rgb(246, 239, 231)',
      '--dsw-static-deepseek-100': 'rgb(240, 226, 215)',
      '--dsw-static-deepseek-200': 'rgb(233, 211, 198)',
      '--dsw-static-deepseek-300': 'rgb(219, 180, 160)',
      '--dsw-static-deepseek-400': '#d97757', // Coral
      '--dsw-static-deepseek-450': '#c96442', // Terracotta
      '--dsw-static-deepseek-500': '#c96442', // Terracotta
      '--dsw-static-deepseek-600': 'rgb(166, 82, 54)',
      '--dsw-static-deepseek-800': 'rgb(84, 72, 62)',
      '--dsw-static-deepseek-900': 'rgb(62, 54, 47)',
    }

    // ── 字体：Anthropic Serif 的 Georgia 替代（中文回退宋体）──────────
    const SERIF = "Georgia, 'Times New Roman', 'Songti SC', 'Noto Serif CJK SC', 'SimSun', serif"

    function pairCss(obj) {
      return Object.entries(obj).map(([k, v]) => `${k}: ${v};`).join('\n')
    }
    const lightCss = pairCss(ALIAS)
    const darkCss = Object.entries(ALIAS).map(([k, v]) => `${k}: ${v.dark};`).join('\n')
    const staticsWarm = pairCss(NEUTRAL_WARM) + '\n' + pairCss(DEEPSEEK_WARM)

    const CSS = `
      /* ===== Claude Parchment Theme ===== */
      body {
        ${lightCss}
        ${pairCss(EXTRA_LIGHT)}
        ${staticsWarm}
        /* ---- 全局字体：整个界面统一衬线（代码除外） ---- */
        --dsw-font-family: ${SERIF};
        --dsw-font-markdown-h1: 500 24px/34px ${SERIF};
        --dsw-font-markdown-h1-font-family: ${SERIF};
        --dsw-font-markdown-h1-font-weight: 500;
        --dsw-font-markdown-h2: 500 22px/32px ${SERIF};
        --dsw-font-markdown-h2-font-family: ${SERIF};
        --dsw-font-markdown-h2-font-weight: 500;
        --dsw-font-markdown-h3: 500 20px/30px ${SERIF};
        --dsw-font-markdown-h3-font-family: ${SERIF};
        --dsw-font-markdown-h3-font-weight: 500;
        --dsw-font-markdown-h4: 500 16px/28px ${SERIF};
        --dsw-font-markdown-h4-font-family: ${SERIF};
        --dsw-font-markdown-h4-font-weight: 500;
        --dsw-font-xl-24: 500 24px/32px ${SERIF};
        --dsw-font-xl-24-font-family: ${SERIF};
        --dsw-font-xl-24-font-weight: 500;
        --dsw-font-l-20: 500 20px/28px ${SERIF};
        --dsw-font-l-20-font-family: ${SERIF};
        --dsw-font-l-20-font-weight: 500;
        --dsw-font-markdown-base: 400 16px/28px ${SERIF};
        --dsw-font-markdown-base-font-family: ${SERIF};
        --dsw-font-markdown-base-font-weight: 400;
        --dsw-font-markdown-base-strong: 500 16px/28px ${SERIF};
        --dsw-font-markdown-base-strong-font-family: ${SERIF};
        --dsw-font-markdown-base-strong-font-weight: 500;
        --dsw-font-markdown-base-italic: italic 400 16px/28px ${SERIF};
        --dsw-font-markdown-base-italic-font-family: ${SERIF};
        --dsw-font-markdown-base-italic-font-weight: 400;
        --dsw-font-markdown-base-strong-italic: italic 500 16px/28px ${SERIF};
        --dsw-font-markdown-base-strong-italic-font-family: ${SERIF};
        --dsw-font-markdown-base-strong-italic-font-weight: 500;
        --dsw-font-markdown-small: 400 14px/24px ${SERIF};
        --dsw-font-markdown-small-font-family: ${SERIF};
        --dsw-font-markdown-table: 400 15px/25px ${SERIF};
        --dsw-font-markdown-table-font-family: ${SERIF};
        /* ---- 代码字体：等宽专属 ---- */
        --ds-font-family-code: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
      }
      /* 基础 CSS 在暗色块重复声明了全部静态色（特异性更高），必须在此再覆盖一次 */
      body[data-ds-dark-theme] {
        ${darkCss}
        ${pairCss(EXTRA_DARK)}
        ${staticsWarm}
      }
      /* 用户消息气泡：无 font-family，从父级继承 —— 显式改为衬线 */
      [class$="_bubble"] {
        font-family: ${SERIF};
      }
      /* 引用标签 chip：硬编码半透明蓝 → 暖陶土 */
      [class$="_chip"] {
        background: rgba(201, 100, 66, .22) !important;
      }
      /* 选区：Terracotta 暖色印记 */
      ::selection {
        background: rgba(201, 100, 66, .28);
      }
      /* 焦点环：系统唯一冷色（Focus Blue），仅用于可达性 */
      :focus-visible {
        outline: 2px solid #3898ec;
        outline-offset: 1px;
      }
      html, body {
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
    `

    function apply(ctx) {
      // 核心 13 token：theme Service 覆盖层（存在时使用；CSS 已自带兜底）
      const theme = ctx.get('theme')
      if (theme !== undefined) {
        ctx.effect(() => theme.overrideTokens('claude-parchment', ALIAS), 'claude-parchment: token layer')
      }
      // 全局样式表（持久化标签，卸载时自动移除）
      ctx.effect(() => {
        const tagId = '@dsh-local/claude-parchment-theme/theme.css'
        if (typeof document !== 'undefined' && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
          const tag = document.createElement('style')
          tag.dataset.plugin = '@dsh-local/claude-parchment-theme'
          tag.dataset.pluginCss = tagId
          tag.textContent = CSS
          document.head.appendChild(tag)
          return () => tag.remove()
        }
        return () => {}
      }, 'claude-parchment: stylesheet')
    }

    exports.apply = apply
    return module.exports
  }
})
