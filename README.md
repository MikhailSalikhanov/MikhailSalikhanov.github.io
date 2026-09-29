# MikhailSalikhanov.github.io

Personal portfolio — https://mikhailsalikhanov.github.io/

Plain HTML/CSS/JS, no build step. To update: edit `index.html` (content), `styles.css` or `script.js`, then commit and push to `main` — GitHub Pages redeploys in about a minute.

Preview locally: `python3 -m http.server` and open http://localhost:8000.

CV: the PDF (`assets/Mykhailo-Salikhanov-CV.pdf`) is generated from `_cv/cv.html` (folders starting with `_` are not published by Pages). After editing it, regenerate:
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf="$PWD/assets/Mykhailo-Salikhanov-CV.pdf" "file://$PWD/_cv/cv.html"` — and bump `?v=` on the Download CV link in `index.html`.
