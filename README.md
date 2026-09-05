# Wickra Gym — site

The marketing site for [Wickra Gym](https://github.com/wickra-lib/wickra-gym), served at
[gym.wickra.org](https://gym.wickra.org).

Built with [VitePress](https://vitepress.dev/) and deployed from `main` by
Cloudflare Pages.

```bash
npm install
npm run dev      # local preview
npm run build    # production build into .vitepress/dist
```

## Layout

| Path | What it is |
|---|---|
| `index.md` | the landing page |
| `about.md` | what the product does and why it exists |
| `privacy.md`, `security.md` | site policies |
| `.vitepress/` | config and the shared Wickra theme |
| `public/` | icons, badges and static assets |

## License

MIT OR Apache-2.0, matching the product it documents.
