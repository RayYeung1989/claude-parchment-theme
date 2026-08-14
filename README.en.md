# Claude Parchment Theme — A Claude-Style DSH Plugin

[中文](README.md) · [English](README.en.md)

> A **DSH plugin** (DeepSeek Harness Plugin) that gives the
> [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) WebUI an
> Anthropic Claude-inspired visual language: warm parchment canvas, Terracotta brand
> color, serif headlines, yellow-brown-tinted neutrals, and ring-shadow philosophy.

![style](https://img.shields.io/badge/style-Claude%20Parchment-c96442)
![license](https://img.shields.io/badge/license-MIT-green)

---

## What is this

`claude-parchment-theme` is a **client-only DSH plugin** (a `dsh.client` dual-face
package: an empty host half + browser-side theme logic) that switches the DSH WebUI
visual language to a Claude-style design system:

- Warm parchment background replaces cool white/gray for a "paper reading" feel
- Georgia serif across the whole interface (a stand-in for Anthropic Serif), weight 500 for headings
- Every neutral gray remapped to warm yellow-brown tints (Olive Gray `#5e5d59`, Stone Gray `#87867f` …)
- DeepSeek brand blue → Terracotta family, removing all cool-blue accents

Once installed it appears as a persistent row under **Settings → Plugin Inventory** in the WebUI.

## Feature overview

| Dimension | Light theme | Dark theme |
|-----------|-------------|------------|
| Page background | Parchment `#f5f4ed` | Deep Dark `#141413` |
| Card surface | Ivory `#faf9f5` | Dark Surface `#30302e` |
| Brand accent | Terracotta `#c96442` | Coral `#d97757` |
| Primary text | Near Black `#141413` | Ivory `#faf9f5` |
| Secondary text | Olive Gray `#5e5d59` | Warm Silver `#b0aea5` |
| Borders | Border Cream `#f0eee6` | Dark Warm `#30302e` |
| Error/Success/Warn | `#b53333` / `#55805e` / `#b07d3f` | `#cf5b5b` / `#6fae7f` / `#d9a441` |

**Typography**: serif throughout (Georgia + Chinese Songti fallback); code stays monospace.
**Details**: terracotta text selection, Focus Blue `#3898ec` focus ring (the only cool
color in the system, used purely for accessibility), warm-tinted scrollbars.

## Install (persistent, recommended)

This DSH plugin is installed as a standard npm package straight from GitHub and
persists with the profile — no re-install after restarts.

### 1. Add the dependency

```bash
cd "$DSH_HOME/profiles/web"
pnpm add "github:RayYeung1989/claude-parchment-theme"
```

### 2. Register the plugin row

Edit the profile's `cordis.patch.yml` and append:

```yaml
# Claude Parchment theme (persistent DSH plugin)
- insert:
    - id: ui-claude-theme
      name: '@dsh-local/claude-parchment-theme'
```

### 3. Restart

Restart the DSH web profile (`dsh --profile web`). The theme activates on startup,
and the `ui-claude-theme` row shows up under **Settings → Plugin Inventory**.

## Temporary use (in-session dynamic plugin)

You can also have an agent define it as a dynamic Cordis plugin inside a session
(not persistent — lost on process restart). Handy for iterating on colors.

## Customization

Edit the constants in `lib/client.js`:

- `ALIAS` — the 13 core alias tokens (light/dark pairs)
- `EXTRA_LIGHT` / `EXTRA_DARK` — links, buttons, code blocks, bubbles, and more
- `NEUTRAL_WARM` / `DEEPSEEK_WARM` — static palette warm remaps
- `SERIF` — the serif font stack

Push changes to this repo, then run `pnpm update` inside the profile to sync.

## FAQ

**Q: Installed but nothing changed?** Check that `pnpm add` succeeded, the
`cordis.patch.yml` row is present, and DSH was restarted.
**Q: Want to disable it temporarily?** Disable the row in Plugin Inventory, or remove
the `- insert` block from `cordis.patch.yml`.
**Q: Want to go back to default?** Remove the dependency and the patch row, then
restart — no application files are modified.

## License

MIT © RayYeung1989
