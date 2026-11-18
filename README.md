# Spotifly — Local (static web build)

A GitHub Pages–compatible build of Spotifly. There is no server and no upload:
the browser asks for read access to a folder, scans it in-page, and plays the
files from local file URLs.

## Run

```bash
python3 -m http.server 8899 --directory web
```

Open http://127.0.0.1:8899, click **Choose music folder**, grant read access, and
wait for the scan. Chrome or Edge remember the folder between visits; Safari and
Firefox fall back to a folder input each visit.

## What works locally

- Library scan, tags/cover art from files, album/artist grouping
- Playback, queue, shuffle/repeat, likes, playlists, history, most heard
- Offline AI DJ / AI playlist picks (heuristic, no LLM)
- Debug mode and the label explorer (file metadata only)

## What needs the full server build

- Gemini/Gemma DJ, Ollama chat, arrival audio
- MAEST audio labels, LLM tags, embeddings and semantic retrieval
- Spotify CSV import, server-side AI playlists

The local server build lives one directory up; this folder is intentionally
self-contained for GitHub Pages.

## Deploy to GitHub Pages

1. Create a repository and upload the contents of this folder to the root.
2. Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
3. The site appears at `https://<user>.github.io/<repo>/`.

No audio files are included in this folder.
