# YouTube chapter player (embed demo)

Small HTML page for Notion `🎬` embeds: YouTube IFrame API + clickable chapters that call `seekTo` on the **same** in-page player.

## Query params

| Param | Meaning |
|---|---|
| `v` | YouTube video id (default: Big Buck Bunny demo) |
| `chapters` | optional base64url JSON `[{ "t": 90, "label": "Mid" }, …]` |

## Local preview

Open `index.html` in a browser, or serve the folder with any static server.

## Branch note

This lives on `feat/youtube-chapter-player-demo` until reviewed. For Notion testing before merge, use raw.githack (or jsDelivr) against the branch, not `hackyourfuture.github.io` (that tracks `main`).
