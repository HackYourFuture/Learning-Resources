# Week 15 Excalidraw embeds

Hosted `.excalidraw` JSON for interactive Notion embeds via [excalidraw.com](https://excalidraw.com/) `#url=` links.

Source of truth remains `HackYourFuture/datatrack` → `Data Track/Week 15/assets/*.excalidraw`. Copy updates here when diagrams change.

## Notion callout pattern

```markdown
> 🖼️ [Week 15 architecture](https://excalidraw.com/#url=<encoded-github-pages-json-url>)
```

Generate URLs from the datatrack repo:

```bash
uv run python scripts/excalidraw_embed_url.py week_15__architecture.excalidraw
```

GitHub Pages JSON URL:

`https://hackyourfuture.github.io/Learning-Resources/data-track/embeds/week-15-excalidraw/week_15__architecture.excalidraw`
