# Quote Generator

A quote generator with category filtering, favorites (saved to
`localStorage`), copy-to-clipboard, and share-to-X — all backed by a
static, curated quote list. No frameworks, no build step, no API.

## File structure

```
quote-generator/
├── index.html          # markup — quote card, categories, actions, favorites drawer
├── css/
│   └── styles.css        # cream/sage theme, serif quote display
├── js/
│   ├── quotes.js           # the quote data (text, author, category)
│   └── app.js                # selection, filtering, favorites, copy/share
├── assets/
│   └── favicon.svg
└── README.md
```

## How it's built

- **Quotes are data**, not markup — `js/quotes.js` holds a plain array of
  `{ text, author, category }` objects. Adding a quote means adding one
  object there; everything else (categories, filtering) derives from it
  automatically.
- **Categories render themselves** — the category pill row is built by
  collecting the unique `category` values from the quote list, so a new
  category in `quotes.js` shows up as a filter automatically, with no
  other code to touch.
- **No immediate repeats** — picking a new quote re-rolls if it would
  land on the exact quote currently shown (as long as the current filter
  has more than one quote to choose from).
- **Favorites** are stored in `localStorage` under `quoteGenFavorites` as
  an array of the same `{ text, author, category }` shape, so they
  persist across reloads without any backend.
- **Copy** uses the Clipboard API with a small toast for feedback;
  **Share** opens a pre-filled X/Twitter intent URL in a new tab — no
  API keys or SDKs needed for either.

## Running it

Just open `index.html` directly in a browser — no server needed.

## Deploying it

Fully static — no API key, no functions. Drag the folder onto Netlify,
or use `netlify init` / `netlify deploy --prod` (remember: press Enter
on an empty build command, don't type anything).

## Ideas to extend it

- A "random quote of the day" that stays fixed until the next calendar day
- Export favorites as an image (quote card) using the Canvas API
- Add more categories/quotes, or load quotes from a `.json` file instead
  of a JS array if the list grows large
- Light/dark mode, like the weather app