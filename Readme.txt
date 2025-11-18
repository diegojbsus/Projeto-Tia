## README.md (usage)


```markdown
# Local React Image Gallery (Vite)


## Setup


1. Clone or copy files into a folder.
2. Create an `images` folder at project root.
- Inside `images`, add subfolders for each category. Example:
- `images/Animals/dog.jpg`
- `images/Travel/paris.jpg`
3. Install dependencies:


```bash
npm install
```


4. Run the server (this serves the images and JSON API):


```bash
npm run server
```


The server will run at `http://localhost:5174` by default.


5. In another terminal, run the Vite dev server:


```bash
npm run dev
```


Vite's dev server will usually run at `http://localhost:5173` (or the port Vite chooses). To avoid cross-port complications, you may prefer to open the Vite dev URL and the Express server is only used as an API host — in development you might need to configure a proxy in `vite.config.js`, or run Vite with `--port 5174` instead so both run on same port. For a quick test, run both and access the Vite URL.


### Production / single-port preview


For a production-like single server, you can build the React app and serve `dist` with Express, or use the `vite preview` command after `npm run build`.


## Notes & Next steps


- **Mobile-friendly:** responsive grid, lazy-loading images with `loading="lazy"`.
- **Performance:** add thumbnails and a simple image cache, or implement server-side thumbnail generation if you have many large images.
- **Mobile packaging:** convert to a PWA or use Capacitor/React Native Web for packaged mobile apps.


Enjoy! If you want, I can:
- Add search, filtering, or tag support.
- Add drag-and-drop upload and category creation in the UI.
- Add thumbnail generation (server-side) and pagination or infinite scroll.
```


---


If you'd like, I can also:
- Add a tiny `vite.config.js` with a proxy so the React dev server proxies `/api` to the Express server automatically.
- Add optional features like search, image modal viewer, or theme (dark mode).


Tell me which feature you'd like next and I'll add it directly.