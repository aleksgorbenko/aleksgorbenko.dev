# My Blog - [aleksgorbenko.dev](https://aleksgorbenko.dev)

The site is built using [Hugo](https://gohugo.io) and its own dark theme.

To learn more about me:

- 👤 [Who am I and My Professional Path](https://github.com/aleksgorbenko/whoami)
- 👨🏻‍💻 [How I Work](https://github.com/aleksgorbenko/howiwork)

## Links

- 🧰 [LinkedIn](https://www.linkedin.com/in/aleks-gorbenko-software-engineer/)
- 📸 [Instagram](https://www.instagram.com/aleksgbko/) - architecture | street | urban photography
- 🎧 [Spotify](https://open.spotify.com/user/113548529?si=6f278b7b62b548b2)

## Theme

| Part | Where |
| --- | --- |
| Templates | `layouts/` |
| Styles, one file per component, tokens first | `assets/css/` |
| App page features and images | `content/apps/<app>/_index.md`, `content/apps/<app>/images/` |
| Security headers | `netlify.toml` |
| Tool versions | `mise.toml`, `Brewfile`, `package.json` |

## Development

```sh
make setup          # tools, dependencies, browsers
make serve          # live preview
make sync-assets    # copy Bukku images from the brand assets kit
make check          # every lint, test and audit
make screenshots    # approve new screenshot baselines
make links-external # report broken external links
make deploy-draft   # private Netlify draft URL
```

## Checks

| File type | Checks |
| --- | --- |
| HTML output | `html-validate`, Nu HTML Checker, axe WCAG 2.2 AA, Lighthouse 100 |
| Templates | Hugo warnings fail the build, Prettier |
| CSS | Stylelint with token-only values and browser support, unused selectors |
| Markdown | markdownlint, Vale, cspell (en-GB) |
| TypeScript | ESLint strict type-checked, `tsc` strict |
| TOML, YAML, workflows | Taplo, yamllint, actionlint, zizmor |
| Security | CSP and headers tested in browsers, gitleaks, image metadata, SVG scripts, `bun audit` |
| Layout | no horizontal scroll, screenshots on phone, iPhone, tablet and desktop |
