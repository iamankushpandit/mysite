# mysite

One page for every open-source project by [iamankushpandit](https://github.com/iamankushpandit),
published at **https://iamankushpandit.github.io/mysite/**.

| Project | What it is |
|---|---|
| [Gume](https://github.com/iamankushpandit/Gume) (Braino!) | 40-game educational console firmware for ESP32 touchscreen boards |
| [esp_ai](https://github.com/iamankushpandit/esp_ai) (Ivy AI) | Fully offline voice assistant on an ESP32-S3: wake word, STT, LLM, TTS |
| [LocalGrid](https://github.com/iamankushpandit/LocalGrid) | Offline, self-forming ESP32 messaging network over Wi-Fi and LoRa |
| [map-n-flag](https://github.com/iamankushpandit/map-n-flag) | 195 flags and map outlines as zero-RAM C++ arrays for the ESP32 |
| [eclipseDnDIssue](https://github.com/iamankushpandit/eclipseDnDIssue) | Reproduction of an SWT 4.13 drag-and-drop crash, fixed upstream in Eclipse 4.18 |

## How it is built

There is no build step and no framework. The repository root is the site:

```
index.html              the whole page
404.html                not-found page
assets/styles.css       light and dark palettes as CSS tokens
assets/site.js          colour-scheme toggle, project filter, live GitHub numbers
assets/favicon.svg
.github/workflows/      deploys the root to GitHub Pages on push to main
```

Project images are loaded from each project's own repository on GitHub, so the
page shows what is currently on those `main` branches and this repository holds
no copies. Stars, forks and the latest release tag are fetched from the GitHub
API when the page loads and fall back to the numbers written in the HTML when
the API is rate-limited or unreachable.

## Publishing

1. Push to `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions** (once).
3. The `pages` workflow deploys on every push.

Serving straight from the branch (Source: *Deploy from a branch*, `main`, `/ (root)`)
also works, since there is nothing to build; the workflow just makes deploys
visible in the Actions tab.

## Keeping it in step with the projects

The **Featured in** section is a hand-copied summary of two generated pages:
[Gume's press page](https://iamankushpandit.github.io/Gume/press.html), built
from `site/press.json` in that repository, and
[esp_ai's featured tab](https://iamankushpandit.github.io/esp_ai/#featured),
built from `docs/FEATURED.md` there. Those two are the sources of truth and
carry the evidence (a dated screenshot of each article, its hash, an archive
copy). When either gains an entry, add a matching card here; independent
coverage only, newest first.

The **How this is built** paragraph in About restates the AI-disclosure wording
from those projects' NOTICE.md files and should change when they do.

## Editing

- Add a project: copy one `<article class="card">` in `index.html` and one
  `<section class="detail">`, set `data-repo` to the repository name so the
  live numbers find it, and pick an `--accent` colour.
- Check the page locally by opening `index.html` in a browser, or with
  `python -m http.server` from the repository root.
