(() => {
  'use strict';

  window.STATIC_MODE = true;

  const AUDIO_EXT = new Set(['mp3', 'm4a', 'flac', 'wav', 'aiff', 'aif', 'ogg', 'opus', 'aac', 'wma', 'alac']);
  const STOP = new Set(['play', 'plays', 'playing', 'song', 'songs', 'music', 'some', 'more', 'like', 'the', 'a', 'an', 'me', 'my', 'please', 'put', 'on', 'of', 'and', 'for', 'with', 'that', 'this', 'you', 'your', 'can', 'want', 'i', 'to', 'it', 'something', 'anything', 'stuff', 'give', 'again', 'new', 'from', 'by', 'in', 'at', 'up', 'only', 'just']);
  const GENERIC = new Set(['unknown artist', 'unknown album', 'music', 'media.localized', 'downloads', 'desktop', 'documents', 'singles', 'liked songs', 'on repeat', 'local folder', 'music library']);

  const state = {
    ready: null,
    library: emptyLibrary(),
    handle: null,
    rootName: '',
    cache: {},
    art: new Map(),
    urls: new Map(),
    scanning: false,
    lastDj: null,
    lastPlaylist: null,
  };

  let imports = readImports();
  let dbPromise = null;

  function emptyLibrary() {
    return {
      version: 1, generatedAt: 0, scanMs: 0, sources: [],
      stats: { tracks: 0, albums: 0, artists: 0, hours: 0, art: 0, duplicatesDropped: 0 },
      artists: [], tracks: [], albums: [],
    };
  }

  function hash(s) {
    let h1 = 0x811c9dc5;
    let h2 = 0x1000193;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      h1 ^= c; h1 = Math.imul(h1, 16777619) >>> 0;
      h2 ^= c; h2 = Math.imul(h2, 2246822519) >>> 0;
    }
    return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
  }

  function clip(v, n) {
    return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n);
  }

  function cleanName(v) {
    let s = String(v || '');
    s = s.replace(/[\u200b-\u200d\ufeff]/g, '').replace(/[“”„]/g, '"');
    s = s.replace(/\s*\[[A-Za-z0-9_-]{11}\]\s*$/, '');
    s = s.replace(/\s*[\(\[]([^\)\]]*)[\)\]]/g, (m, inner) => {
      const i = inner.toLowerCase();
      if (/\b(official|offiziell\w*|musikvideo|lyrics?|lyric video|visuali[sz]er|music video|vevo|youtube|m\/v)\b/.test(i)) return '';
      if (/^(hd|hq|4k|8k|4k upgrade|audio|video|explicit|clean)$/.test(i.trim())) return '';
      return m;
    });
    s = s.replace(/\s*[-–—]\s*(?:lyrics?|audio|official|visuali[sz]er)$/i, '');
    s = s.replace(/\s*[-–—]\s*\S{0,30}vevo(?:\s*\(youtube\))?$/i, '');
    s = s.replace(/\s*\(youtube\)$/i, '');
    s = s.replace(/\s*[-–—]\s*topic$/i, '');
    s = s.replace(/[🎵🎶🔥💀😈🥶✨]+/g, '');
    return s.replace(/\s{2,}/g, ' ').replace(/^[\s\-–—]+|[\s\-–—]+$/g, '').trim();
  }

  function splitArtistTitle(stem) {
    const parts = stem.split(/\s+[-–—]\s+/);
    if (parts.length >= 2) {
      return { artist: cleanName(parts[0]), title: cleanName(parts.slice(1).join(' - ')) };
    }
    return { artist: '', title: cleanName(stem) };
  }

  function sourceInfo(path) {
    const segs = String(path || '').split('/').filter(Boolean);
    let special = '';
    if (segs.some((s) => s.toLowerCase() === 'liked songs')) special = 'Liked Songs';
    else if (segs.some((s) => s.toLowerCase() === 'on repeat')) special = 'On Repeat';
    const root = state.rootName || segs[0] || 'Local folder';
    const source = special || root;
    const folders = [source];
    if (special && special !== source) folders.push(special);
    return { source, folders };
  }

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open('spotifly-static', 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  async function idbGet(key) {
    try {
      const db = await openDb();
      return await new Promise((resolve) => {
        const tx = db.transaction('kv', 'readonly');
        const rq = tx.objectStore('kv').get(key);
        rq.onsuccess = () => resolve(rq.result);
        rq.onerror = () => resolve(null);
      });
    } catch { return null; }
  }

  async function idbSet(key, value) {
    try {
      const db = await openDb();
      await new Promise((resolve) => {
        const tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').put(value, key);
        tx.oncomplete = resolve;
        tx.onerror = resolve;
      });
    } catch { /* ignore */ }
  }

  function readImports() {
    try {
      const raw = JSON.parse(localStorage.getItem('spotifly:web-imports') || '[]');
      return Array.isArray(raw) ? raw : [];
    } catch { return []; }
  }

  function saveImports() {
    try { localStorage.setItem('spotifly:web-imports', JSON.stringify(imports)); } catch { /* ignore */ }
  }

  function isAudio(name) {
    const ext = String(name).split('.').pop().toLowerCase();
    return AUDIO_EXT.has(ext);
  }

  function pictureUrl(pic) {
    if (!pic || !pic.data) return '';
    try {
      const data = pic.data;
      let binary = '';
      const chunk = 8192;
      for (let i = 0; i < data.length; i += chunk) {
        binary += String.fromCharCode.apply(null, data.slice(i, i + chunk));
      }
      return 'data:' + (pic.format || 'image/jpeg') + ';base64,' + btoa(binary);
    } catch { return ''; }
  }

  function readTags(file) {
    return new Promise((resolve) => {
      if (!window.jsmediatags) return resolve(null);
      try {
        window.jsmediatags.read(file, {
          onSuccess: (res) => resolve((res && res.tags) || null),
          onError: () => resolve(null),
        });
      } catch { resolve(null); }
    });
  }

  function readDuration(file) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const audio = document.createElement('audio');
      let done = false;
      const finish = (v) => {
        if (done) return;
        done = true;
        try { audio.src = ''; } catch { /* ignore */ }
        URL.revokeObjectURL(url);
        resolve(Number.isFinite(v) ? v : 0);
      };
      audio.preload = 'metadata';
      audio.onloadedmetadata = () => finish(audio.duration);
      audio.onerror = () => finish(0);
      setTimeout(() => finish(0), 10000);
      audio.src = url;
    });
  }

  function metaFrom(file, path, tags, duration) {
    const stem = path.split('/').pop().replace(/\.[^.]+$/, '');
    const baseStem = stem.replace(/^\d{1,3}[\.\-_ ]+/, '');
    const parsed = splitArtistTitle(baseStem);
    let title = cleanName(tags && (tags.title || ''));
    let artist = cleanName(tags && (tags.artist || ''));
    let album = cleanName(tags && (tags.album || ''));
    let albumArtist = cleanName(tags && (tags.albumartist || ''));
    const year = String((tags && tags.year) || '').match(/(19|20)\d{2}/) ? String((tags.year)).match(/(19|20)\d{2}/)[0] : '';
    const trackNo = parseInt(String((tags && tags.track) || '0').split('/')[0], 10) || 0;
    const genre = cleanName((tags && tags.genre) || '');

    if (!title) {
      artist = artist || parsed.artist;
      title = parsed.title;
    }
    if (artist && title.toLowerCase().startsWith(artist.toLowerCase() + ' - ')) {
      title = cleanName(title.slice(artist.length + 3));
    }
    if (artist && GENERIC.has(artist.toLowerCase())) artist = '';
    if (!artist) artist = parsed.artist;
    if (!artist || GENERIC.has(artist.toLowerCase())) {
      const segs = path.split('/');
      const parent = segs.length > 1 ? segs[segs.length - 2] : '';
      if (parent && !GENERIC.has(parent.toLowerCase())) artist = cleanName(parent);
    }
    artist = artist || 'Unknown Artist';
    if (!album || /^(unknown album|liked songs|on repeat)$/i.test(album)) album = 'Singles';
    albumArtist = albumArtist || artist;

    const src = sourceInfo(path);
    const picture = tags && tags.picture ? pictureUrl(tags.picture) : '';
    return {
      title: title || 'Untitled',
      artist,
      album,
      albumArtist,
      genre,
      year,
      trackNo,
      duration: duration || 0,
      size: file.size,
      addedAt: file.lastModified || Date.now(),
      source: src.source,
      folders: src.folders,
      art: picture,
      single: album === 'Singles',
    };
  }

  async function mapLimit(items, limit, fn, onDone) {
    const out = new Array(items.length);
    let cursor = 0;
    async function worker() {
      while (cursor < items.length) {
        const i = cursor++;
        out[i] = await fn(items[i], i);
        if (onDone) onDone(i + 1, items.length);
      }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
    return out;
  }

  function buildLibrary(metas) {
    for (const u of state.urls.values()) { try { URL.revokeObjectURL(u); } catch { /* ignore */ } }
    state.urls.clear();
    state.art.clear();
    const tracks = [];
    const albumMap = new Map();
    for (const m of metas) {
      if (!m || m.duration < 8) continue;
      const id = hash(m.path + '|' + m.size).slice(0, 12);
      const albumKey = (m.albumArtist || '').toLowerCase() + '::' + (m.album || '').toLowerCase();
      const albumId = hash(albumKey).slice(0, 10);
      const t = {
        id, title: m.title, artist: m.artist, album: m.album, albumArtist: m.albumArtist,
        albumId, duration: m.duration, year: m.year, trackNo: m.trackNo, discNo: 0,
        genre: m.genre, addedAt: m.addedAt, bitrate: 0, file: m.path, source: m.source,
        folders: m.folders, single: m.single,
      };
      tracks.push(t);
      state.urls.set(id, m.url);
      if (m.art && !state.art.has(albumId)) state.art.set(albumId, m.art);
      if (!albumMap.has(albumKey)) {
        albumMap.set(albumKey, {
          id: albumId, name: m.album, artist: m.albumArtist, year: m.year, genre: m.genre,
          trackIds: [], duration: 0, addedAt: 0, art: false, single: m.single,
        });
      }
      const a = albumMap.get(albumKey);
      a.trackIds.push(id);
      a.duration += m.duration || 0;
      a.addedAt = Math.max(a.addedAt, m.addedAt);
      a.year = a.year || m.year;
      a.genre = a.genre || m.genre;
      a.art = state.art.has(albumId);
    }
    const byId = new Map(tracks.map((t) => [t.id, t]));
    for (const a of albumMap.values()) {
      a.trackIds.sort((x, y) => {
        const tx = byId.get(x); const ty = byId.get(y);
        return (tx.discNo - ty.discNo) || (tx.trackNo - ty.trackNo) || tx.title.localeCompare(ty.title);
      });
    }
    tracks.sort((a, b) => (a.albumArtist || '').localeCompare(b.albumArtist || '') ||
      a.album.localeCompare(b.album) || (a.trackNo - b.trackNo) || a.title.localeCompare(b.title));
    const albums = [...albumMap.values()].sort((a, b) => b.addedAt - a.addedAt);
    const artists = [...new Set(tracks.map((t) => t.artist))].sort((a, b) => a.localeCompare(b));
    const sourceMap = new Map();
    for (const t of tracks) sourceMap.set(t.source, (sourceMap.get(t.source) || 0) + 1);
    const sources = [...sourceMap.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    const hours = +(tracks.reduce((sum, t) => sum + t.duration, 0) / 3600).toFixed(1);
    state.library = {
      version: 1, generatedAt: Date.now(), scanMs: 0, sources,
      stats: { tracks: tracks.length, albums: albums.length, artists: artists.length, hours, art: state.art.size, duplicatesDropped: 0 },
      artists, tracks, albums,
    };
  }

  function showOverlay(html, id) {
    let el = document.getElementById('local-overlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'local-overlay';
      el.className = 'local-overlay';
      document.body.appendChild(el);
    }
    el.innerHTML = html;
    el.dataset.mode = id || '';
    return el;
  }

  function hideOverlay() {
    const el = document.getElementById('local-overlay');
    if (el) el.remove();
  }

  function showWelcome(reconnect, handle) {
    const title = reconnect ? 'Reconnect your music folder' : 'Connect your music folder';
    const text = reconnect
      ? 'Your browser saved the folder. Click reconnect to grant read access again, then Spotifly will scan it locally.'
      : 'Pick a folder on this disk. Spotifly scans it in your browser — nothing is uploaded. Chrome or Edge gives persistent access; other browsers use a folder input each time.';
    showOverlay(`<div class="local-card">
      <div class="local-mark">♪</div>
      <h2>${title}</h2>
      <p>${text}</p>
      <button class="btn green" id="local-choose">${reconnect ? 'Reconnect folder' : 'Choose music folder'}</button>
      <p class="local-note">Your files stay on this device. The web build plays from local file handles; AI DJ uses offline picks.</p>
    </div>`, 'welcome');
    const btn = document.getElementById('local-choose');
    if (btn) btn.onclick = async () => {
      try {
        if (handle) await reconnectFolder(handle);
        else await chooseFolder();
      } catch (e) {
        if (e && e.name !== 'AbortError') showWelcome(false);
      }
    };
  }

  function showScanning(text) {
    showOverlay(`<div class="local-card">
      <div class="local-spinner"></div>
      <h2>${esc(text)}</h2>
      <p id="local-progress">Reading tags and durations…</p>
    </div>`, 'scan');
  }

  function updateScanning(done, total) {
    const el = document.getElementById('local-progress');
    if (el) el.textContent = `${done} / ${total} files`;
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  async function walkHandle(dir, rel, out, depth) {
    if (depth > 12) return;
    for await (const [name, entry] of dir.entries()) {
      if (name.startsWith('.')) continue;
      const path = rel ? rel + '/' + name : name;
      if (entry.kind === 'directory') {
        if (/^(node_modules|\.git|artwork|art|cache|temp)$/i.test(name)) continue;
        await walkHandle(entry, path, out, depth + 1);
      } else if (entry.kind === 'file' && isAudio(name)) {
        try { out.push({ file: await entry.getFile(), path }); } catch { /* ignore */ }
      }
    }
  }

  async function scanHandle(handle) {
    const entries = [];
    showScanning('Scanning ' + handle.name);
    await walkHandle(handle, '', entries, 0);
    state.rootName = handle.name;
    return scanFiles(entries);
  }

  async function scanFiles(entries) {
    if (state.scanning) return state.library;
    state.scanning = true;
    if (!entries.length) {
      state.scanning = false;
      hideOverlay();
      showWelcome(false);
      return state.library;
    }
    showScanning('Scanning ' + entries.length + ' files');
    const cache = state.cache && typeof state.cache === 'object' ? state.cache : {};
    const nextCache = { ...cache };
    let done = 0;
    const metas = await mapLimit(entries, 6, async ({ file, path }) => {
      const key = `${path}|${file.size}|${file.lastModified}`;
      let rec = cache[key];
      if (!rec) {
        const tags = await readTags(file);
        const duration = await readDuration(file);
        rec = metaFrom(file, path, tags, duration);
        nextCache[key] = rec;
      }
      done++;
      updateScanning(done, entries.length);
      return { ...rec, path, size: file.size, url: URL.createObjectURL(file) };
    }, (n, total) => updateScanning(n, total));
    state.cache = nextCache;
    idbSet('cache-v1', nextCache);
    buildLibrary(metas);
    state.scanning = false;
    hideOverlay();
    if (!state.library.tracks.length) {
      showWelcome(false);
    }
    return state.library;
  }

  async function chooseFolder() {
    if (window.showDirectoryPicker) {
      let handle;
      try { handle = await window.showDirectoryPicker({ mode: 'read' }); }
      catch (e) { if (e && e.name === 'AbortError') return null; throw e; }
      state.handle = handle;
      state.rootName = handle.name;
      await idbSet('handle', handle);
      await scanHandle(handle);
      await reloadApp();
      return state.library;
    }
    return chooseFolderInput();
  }

  function chooseFolderInput() {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.id = 'local-file-input';
      input.webkitdirectory = true;
      input.multiple = true;
      input.style.display = 'none';
      document.body.appendChild(input);
      input.onchange = async () => {
        const files = Array.from(input.files || []);
        input.remove();
        if (!files.length) { resolve(null); return; }
        const entries = files.map((f) => ({ file: f, path: f.webkitRelativePath || f.name }));
        const first = entries[0] ? entries[0].path : '';
        state.rootName = first.includes('/') ? first.split('/')[0] : 'Music';
        try {
          await scanFiles(entries);
          await reloadApp();
          resolve(state.library);
        } catch (e) { reject(e); }
      };
      input.oncancel = () => { input.remove(); resolve(null); };
      input.click();
    });
  }

  async function reconnectFolder(handle) {
    let permission = await handle.queryPermission({ mode: 'read' });
    if (permission !== 'granted') permission = await handle.requestPermission({ mode: 'read' });
    if (permission !== 'granted') { showWelcome(true, handle); return null; }
    state.handle = handle;
    state.rootName = handle.name;
    await scanHandle(handle);
    await reloadApp();
    return state.library;
  }

  async function rescan() {
    if (state.handle) {
      let permission = await state.handle.queryPermission({ mode: 'read' });
      if (permission !== 'granted') permission = await state.handle.requestPermission({ mode: 'read' });
      if (permission !== 'granted') { showWelcome(true, state.handle); return null; }
      await scanHandle(state.handle);
      return state.library;
    }
    return chooseFolder();
  }

  async function reloadApp() {
    if (typeof window.localReload === 'function') {
      try { await window.localReload(); } catch { /* ignore */ }
    }
  }

  function tokens(s) {
    return String(s || '').toLowerCase().split(/[^a-z0-9\u00c0-\u024f]+/i)
      .filter((w) => w.length > 2 && !STOP.has(w));
  }

  function scoreFor(t, body) {
    const req = String((body && body.request) || '').toLowerCase();
    const toks = tokens(req);
    const base = (t.title + ' ' + t.artist + ' ' + t.album).toLowerCase();
    const plays = Number(body && body.history && body.history[t.id] && body.history[t.id].count) || 0;
    const liked = Array.isArray(body && body.likes) && body.likes.includes(t.id);
    let score = Math.random() * 1.5 + Math.min(5, plays * 0.6) + (liked ? 2 : 0);
    for (const tok of toks) if (base.includes(tok)) score += 6;
    if (req.length > 4 && base.includes(req)) score += 6;
    if (body && body.currentId) {
      const cur = state.library.tracks.find((x) => x.id === body.currentId);
      if (cur) {
        if (cur.artist === t.artist) score += 4;
        if (cur.albumId === t.albumId && cur.id !== t.id) score += 3;
      }
    }
    return score;
  }

  function pickSet(body, count) {
    const exclude = new Set(Array.isArray(body && body.exclude) ? body.exclude : []);
    const pool = state.library.tracks.filter((t) => !exclude.has(t.id));
    const ranked = (pool.length >= count ? pool : state.library.tracks)
      .map((t) => ({ t, score: scoreFor(t, body) }))
      .sort((a, b) => b.score - a.score);
    const out = [];
    const artists = new Map();
    for (const { t } of ranked) {
      if (out.some((x) => x.id === t.id)) continue;
      const n = artists.get(t.artist) || 0;
      if (n >= 3) continue;
      artists.set(t.artist, n + 1);
      out.push(t);
      if (out.length >= count) break;
    }
    return out;
  }

  function offlineDj(body) {
    const req = clip(body && body.request, 160);
    const mood = clip(body && body.mood, 40);
    const tracks = pickSet(body, 8);
    const starts = ['Starting things off with', "Next up, here's", 'Keeping it going with', 'Here’s', 'Let’s roll on with'];
    const picks = tracks.map((t, i) => ({
      id: t.id,
      line: `${starts[i % starts.length]} “${t.title}” by ${t.artist}.`,
    }));
    const intro = req
      ? ''
      : `Here’s an offline set from your scanned library${mood ? ', leaning ' + mood.toLowerCase() : ''}.`;
    const reply = req ? `Playing an offline set for “${req}”.` : '';
    state.lastDj = {
      at: Date.now(), request: req, model: null, source: 'fallback',
      retrieval: null, picks: picks.map((p) => p.id), elapsedMs: 0,
    };
    return {
      source: 'fallback', model: null, intro, reply, request: req, mood,
      tracks: picks, outro: 'The web build uses offline picks — run the local server for the 12B DJ.', retrieval: picks.length,
      status: { running: true, available: false, models: [], model: null, error: 'Web build — offline DJ picks' },
    };
  }

  function offlinePlaylist(body) {
    const prompt = clip(body && body.prompt, 160);
    if (!prompt) return { error: 'Describe the playlist first' };
    const tracks = pickSet({ request: prompt }, 12);
    const words = prompt.replace(/[^a-z0-9 ]/gi, ' ').split(/\s+/).filter(Boolean).slice(0, 4);
    const name = (words.map((w) => w[0] ? w[0].toUpperCase() + w.slice(1) : w).join(' ') || 'Offline Mix').slice(0, 40);
    const pl = {
      id: hash('web:' + name + ':' + Date.now()).slice(0, 10),
      name,
      source: 'ai',
      description: 'Picked locally from your scanned library for: ' + prompt,
      model: null,
      createdAt: Date.now(),
      trackIds: tracks.map((t) => t.id),
      missing: [],
      counts: { total: tracks.length, matched: tracks.length, missing: 0 },
    };
    imports.unshift(pl);
    saveImports();
    state.lastPlaylist = { at: Date.now(), theme: prompt, name, model: null, source: 'fallback', retrieval: null, picks: pl.trackIds };
    return { ok: true, playlist: pl, source: 'fallback', model: null, retrieval: tracks.length };
  }

  function apiRes(body, status) {
    return new Response(JSON.stringify(body), {
      status: status || 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  async function readJson(init) {
    try { return JSON.parse((init && init.body) || '{}'); } catch { return {}; }
  }

  async function handleApi(u, init) {
    const p = u.pathname;
    if (p === '/api/library') {
      await state.ready;
      return apiRes(state.library);
    }
    if (p === '/api/rescan') {
      const lib = await rescan();
      if (!lib) return apiRes({ ok: false, error: 'No folder selected' }, 200);
      return apiRes({ ok: true, stats: state.library.stats });
    }
    if (p === '/api/imports') return apiRes({ playlists: imports });
    if (p.startsWith('/api/imports/') && init && init.method === 'DELETE') {
      const id = p.split('/').pop();
      imports = imports.filter((x) => x.id !== id);
      saveImports();
      return apiRes({ ok: true });
    }
    if (p === '/api/import/spotify') return apiRes({ error: 'Spotify CSV import is only in the local server build' }, 501);
    if (p === '/api/dj' && init && init.method === 'POST') return apiRes(offlineDj(await readJson(init)));
    if (p === '/api/playlist' && init && init.method === 'POST') {
      const out = offlinePlaylist(await readJson(init));
      return apiRes(out, out.error ? 400 : 200);
    }
    if (p === '/api/ai/status') {
      return apiRes({ running: false, available: false, models: [], model: null, error: 'Web build uses offline DJ picks' });
    }
    if (p === '/api/ai/warm') return apiRes({ ok: false, error: 'Web build has no local LLM' });
    if (p === '/api/tags/status' || p === '/api/embeddings/status' || p === '/api/audio-tags/status') {
      return apiRes({ running: false, exists: false, count: 0, total: state.library.tracks.length, model: null, error: 'Not available in the web build' });
    }
    if (p === '/api/tags/start' || p === '/api/embeddings/start' || p === '/api/audio-tags/start') {
      return apiRes({ ok: false, error: 'Not available in the web build' }, 501);
    }
    if (p === '/api/debug') {
      return apiRes({
        generatedAt: Date.now(),
        library: state.library.stats,
        counts: { tracks: state.library.tracks.length, audioLabels: 0, llmTags: 0, imports: imports.length },
        embeddings: null,
        audio: null,
        lastDj: state.lastDj,
        lastPlaylist: state.lastPlaylist,
      });
    }
    if (p.startsWith('/api/stream/') || p.startsWith('/api/art/')) return apiRes({ error: 'local media' }, 404);
    return apiRes({ error: 'Not found in web build' }, 404);
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const raw = typeof input === 'string' ? input : (input && input.url);
    try {
      const u = new URL(raw, location.href);
      if (u.pathname.startsWith('/api/')) return handleApi(u, init || {});
    } catch { /* fall through */ }
    return originalFetch(input, init);
  };

  window.LOCAL_MEDIA = {
    mediaUrl(id) { return state.urls.get(id) || ''; },
    artUrl(id) { return state.art.get(id) || ''; },
    rescan,
  };

  async function init() {
    state.cache = (await idbGet('cache-v1')) || {};
    const handle = await idbGet('handle');
    if (handle) {
      state.handle = handle;
      state.rootName = handle.name;
      let permission = 'prompt';
      try { permission = await handle.queryPermission({ mode: 'read' }); } catch { /* ignore */ }
      if (permission === 'granted') {
        try { await scanHandle(handle); } catch { showWelcome(true, handle); }
      } else {
        showWelcome(true, handle);
      }
    } else {
      showWelcome(false);
    }
  }

  state.ready = init().catch(() => {});
})();
