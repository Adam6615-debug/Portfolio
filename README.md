# Adam Khalil Taher — Portfolio

Static site, no build step. `index.html` + `style.css` + `script.js`.

## Host it free on GitHub Pages

1. Create a new repo on GitHub, e.g. `adam-portfolio` (or `Adam6615-debug.github.io`
   if you want it at the root of your GitHub domain — see note below).
2. Push these three files to the repo root:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Adam6615-debug/adam-portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
4. Wait ~1 minute. Your site is live at:
   `https://Adam6615-debug.github.io/adam-portfolio/`

### If you name the repo `Adam6615-debug.github.io`
GitHub treats that repo name specially — the site is served at the bare
`https://Adam6615-debug.github.io/` (no subpath). Same steps otherwise.

### Custom domain (optional)
Settings → Pages → Custom domain → enter your domain, then add a `CNAME`
record at your DNS provider pointing to `Adam6615-debug.github.io`.

## Editing later
Everything is plain HTML/CSS in one page — edit `index.html` for content,
`style.css` for the blueprint color/type tokens at the top of the file,
`script.js` for the topology diagram data (the `nodes`/`links` objects).
