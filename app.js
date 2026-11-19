'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const ICON = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.05 3.606 20.54 11.394a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.7 3h3.6a.7.7 0 0 1 .7.7v16.6a.7.7 0 0 1-.7.7H5.7a.7.7 0 0 1-.7-.7V3.7A.7.7 0 0 1 5.7 3zm9 0h3.6a.7.7 0 0 1 .7.7v16.6a.7.7 0 0 1-.7.7h-3.6a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7z"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h2v16H6zM19 4.3v15.4L8.3 12z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4h-2v16h2zM5 4.3v15.4L15.7 12z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6l5 3 1-1.7-4-2.4V7z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5z"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4-2.7-2.7z"/></svg>',
  volume: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>',
  eq: '<span class="eq"><i></i><i></i><i></i></span>',
  repeat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>',
  dj: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4L12 2zm6.5 11 .9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6zM5.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20V10h3v10H4zm6.5 0V4h3v16h-3zM17 20v-7h3v7h-3z"/></svg>',
  debug: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.7 6.3 3 12l5.7 5.7 1.4-1.4L5.8 12l4.3-4.3-1.4-1.4zm6.6 0-1.4 1.4 4.3 4.3-4.3 4.3 1.4 1.4L21 12l-5.7-5.7z"/></svg>',
};

const S = {
  lib: null,
  tracks: [],
  albums: [],
  artists: [],
  trackById: new Map(),
  albumById: new Map(),
  view: { type: 'home' },
  hist: [{ type: 'home' }],
  hi: 0,
  query: '',
  searchIds: [],
  searchFilter: 'all',
  searchSource: '',
  searchSemantic: null,
  searchBusy: false,
  libTab: 'playlists',
  liked: new Set(),
  mixes: [],
  sources: [],
  queue: [],
  qIndex: -1,
  ctxKey: null,
  shuffle: false,
  repeat: 'off',
  currentId: null,
  playing: false,
  seeking: false,
  queueOpen: false,
  volume: 0.9,
  muted: false,
  plays: {},
  imports: [],
  importFile: null,
  tagsStatus: null,
  tagTimer: null,
  embedStatus: null,
  embedTimer: null,
  djWarmed: false,
  userPlaylists: [],
  rowMenu: null,
  history: [],
  statsTab: 'tracks',
  statsRange: 'all',
  audioStatus: null,
  audioTimer: null,
  debug: false,
  debugData: null,
  debugQuery: '',
  settingsAi: null,
  indexHealth: null,
  indexTimer: null,
  debugLoading: false,
  djStatus: null,
  djBusy: false,
  djSpokenFor: null,
  ttsVoice: null,
  pendingCount: false,
  lastDjHighlight: null,
  dj: { active: false, source: null, model: null, intro: '', reply: '', request: '', outro: '', tracks: [], lines: {}, mood: '', startedAt: 0, retrieval: 0, fetching: false },
  djFeedback: { tracks: {}, never: [], lessArtists: [], lessGenres: [] },
  audio: new Audio(),
};

S.audio.preload = 'metadata';

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function attr(s) {
  return encodeURIComponent(String(s == null ? '' : s));
}

function hue(str) {
  let h = 17;
  const s = String(str || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

function initials(name) {
  const parts = String(name || '?').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function fmtTime(sec) {
  sec = Math.max(0, Math.floor(Number(sec) || 0));
  const m = Math.floor(sec / 60);
  return `${m}:${String(sec % 60).padStart(2, '0')}`;
}

function fmtDate(ts) {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return ''; }
}

function fmtLong(seconds) {
  const mins = Math.round((Number(seconds) || 0) / 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h} hr ${m} min`;
  if (h) return `${h} hr`;
  return `${m} min`;
}

function trackTags(t) {
  if (!t) return '';
  const base = t.tags
    ? [].concat(t.tags.genres || [], t.tags.moods || [], t.tags.keywords || [],
      [t.tags.language || '', t.tags.era || ''])
    : [];
  const audio = t.audio && t.audio.labels ? t.audio.labels.map((l) => l.label || '') : [];
  return base.concat(audio).filter(Boolean).join(' ');
}

function debugTrackLabel(t) {
  if (!S.debug) return '';
  const audio = t.audio && t.audio.labels
    ? t.audio.labels.slice(0, 2).map((l) => String(l.label || '').replace(/---/g, ' / '))
    : [];
  const llm = t.tags
    ? [].concat((t.tags.genres || []).slice(0, 1), (t.tags.moods || []).slice(0, 1))
    : [];
  const bits = audio.concat(llm).filter(Boolean);
  return bits.length ? `<div class="t-debug">${esc(bits.join(' · '))}</div>` : '';
}

function saveHistory() {
  try { localStorage.setItem('spotifly:history', JSON.stringify(S.history.slice(0, 1000))); } catch { /* ignore */ }
}

function historyIds() {
  const seen = new Set();
  const out = [];
  for (const h of S.history) {
    if (!h || !h.id || seen.has(h.id) || !S.trackById.has(h.id)) continue;
    seen.add(h.id);
    out.push(h.id);
  }
  return out;
}

function historyLastMap() {
  const last = new Map();
  for (const h of S.history) if (h && h.id && !last.has(h.id)) last.set(h.id, h.at || 0);
  for (const id of Object.keys(S.plays)) if (!last.has(id)) last.set(id, (S.plays[id] && S.plays[id].last) || 0);
  return last;
}

function countInRange(id, range) {
  if (range === 'month') {
    const cut = Date.now() - 28 * 86400000;
    let n = 0;
    for (const h of S.history) if (h.id === id && (h.at || 0) >= cut) n++;
    return n;
  }
  return (S.plays[id] && S.plays[id].count) || 0;
}

function topTracks(range, limit) {
  return S.tracks.map((t) => ({ t, count: countInRange(t.id, range) }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count || a.t.title.localeCompare(b.t.title))
    .slice(0, limit || 30);
}

function topArtistsByPlays(range, limit) {
  const m = new Map();
  for (const t of S.tracks) {
    const c = countInRange(t.id, range);
    if (c > 0) m.set(t.artist, (m.get(t.artist) || 0) + c);
  }
  return [...m.entries()].map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, limit || 20);
}

function topAlbumsByPlays(range, limit) {
  const m = new Map();
  for (const t of S.tracks) {
    const c = countInRange(t.id, range);
    if (c > 0) m.set(t.albumId, (m.get(t.albumId) || 0) + c);
  }
  return [...m.entries()].map(([id, count]) => ({ album: S.albumById.get(id), count }))
    .filter((x) => x.album)
    .sort((a, b) => b.count - a.count || a.album.name.localeCompare(b.album.name)).slice(0, limit || 20);
}

function relTime(ts) {
  if (!ts) return '';
  const now = Date.now();
  const d = now - ts;
  const days = Math.floor(d / 86400000);
  if (days <= 0) {
    try { return 'Today ' + new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
    catch { return 'Today'; }
  }
  if (days === 1) return 'Yesterday';
  if (days < 7) return days + ' days ago';
  return fmtDate(ts);
}

function historyGroup(ts) {
  const days = (Date.now() - (ts || 0)) / 86400000;
  if (days < 1) return 'Today';
  if (days < 2) return 'Yesterday';
  if (days < 7) return 'This week';
  if (days < 30) return 'This month';
  return 'Earlier';
}

function trackCard(t, ctx) {
  const a = S.albumById.get(t.albumId);
  return `<div class="card" data-act="play-track" data-id="${t.id}" data-ctx="${attr(ctx)}">
    ${albumArt(a)}
    <div class="c-name">${esc(t.title)}</div>
    <div class="c-sub">${esc(t.artist)}</div>
    <button class="fab" data-act="play-track" data-id="${t.id}" data-ctx="${attr(ctx)}" title="Play">${ICON.play}</button>
  </div>`;
}

function navCard(view, name, sub, cover) {
  return `<div class="card" data-act="nav" data-view="${view}">
    ${coverHTML(cover)}
    <div class="c-name">${esc(name)}</div>
    <div class="c-sub">${esc(sub)}</div>
  </div>`;
}

function plural(n, word) {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

function shuffleArr(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toast(msg, ms = 2600) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), ms);
}

/* ---------- art ---------- */

function albumArt(album, cls = '') {
  if (!album) {
    return `<div class="art fallback ${cls}" style="--h:220"><span class="initials">♪</span></div>`;
  }
  const artSrc = window.LOCAL_MEDIA ? window.LOCAL_MEDIA.artUrl(album.id) : '/api/art/' + album.id;
  if (album.art && artSrc) {
    return `<div class="art ${cls}"><img src="${artSrc}" alt="" loading="lazy"></div>`;
  }
  return `<div class="art fallback ${cls}" style="--h:${hue(album.name + album.artist)}"><span class="initials">${esc(initials(album.name))}</span></div>`;
}

function artistArt(name, cls = '') {
  return `<div class="art fallback ${cls}" style="--h:${hue(name)}"><span class="initials">${esc(initials(name))}</span></div>`;
}

function coverHTML(cover, cls = '') {
  if (!cover) return albumArt(null, cls);
  if (cover.kind === 'album') return albumArt(cover.album, cls);
  if (cover.kind === 'liked') return `<div class="art cover-liked ${cls}">${ICON.heart}</div>`;
  if (cover.kind === 'mix') {
    return `<div class="art cover-mix ${cls}" style="--h:${cover.hue}"><b>Daily Mix</b><span>${esc(cover.desc)}</span></div>`;
  }
  if (cover.kind === 'repeat') return `<div class="art cover-repeat ${cls}"><b>ON REPEAT</b>${ICON.repeat}</div>`;
  if (cover.kind === 'rewind') return `<div class="art cover-rewind ${cls}"><b>REWIND</b>${ICON.clock}</div>`;
  if (cover.kind === 'dj') return `<div class="art cover-dj ${cls}"><div class="dj-bars"><i></i><i></i><i></i><i></i></div><b>AI DJ</b></div>`;
  if (cover.kind === 'import') return `<div class="art cover-import ${cls}"><b>IMPORTED</b><span class="initials">${esc(initials(cover.name))}</span></div>`;
  if (cover.kind === 'playlist') return `<div class="art cover-user ${cls}" style="--h:${hue(cover.name)}"><span class="initials">${esc(initials(cover.name))}</span></div>`;
  if (cover.kind === 'ai') return `<div class="art cover-ai ${cls}">${ICON.dj}</div>`;
  if (cover.kind === 'history') return `<div class="art cover-history ${cls}">${ICON.clock}</div>`;
  if (cover.kind === 'chart') return `<div class="art cover-chart ${cls}">${ICON.chart}</div>`;
  if (cover.kind === 'debug') return `<div class="art cover-debug ${cls}">${ICON.debug}</div>`;
  if (cover.kind === 'artist') return artistArt(cover.name, cls);
  return `<div class="art cover-source ${cls}" style="--h:${cover.hue}"><b>${esc(cover.label || 'Playlist')}</b><span>${esc(cover.name)}</span></div>`;
}

/* ---------- library ---------- */

function topArtists(n = 8) {
  const m = new Map();
  for (const t of S.tracks) {
    if (/^unknown artist$/i.test(t.artist)) continue;
    m.set(t.artist, (m.get(t.artist) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n).map(([name, count]) => ({ name, count }));
}

function buildMixes() {
  const by = new Map();
  for (const t of S.tracks) {
    if (/^unknown artist$/i.test(t.artist)) continue;
    if (!by.has(t.artist)) by.set(t.artist, []);
    by.get(t.artist).push(t);
  }
  const top = [...by.entries()].filter(([, ts]) => ts.length >= 2)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])).slice(0, 6);
  S.mixes = top.map(([artist, ts], i) => {
    const rest = S.tracks.filter((x) => x.artist !== artist).slice();
    shuffleArr(rest);
    const ids = ts.map((t) => t.id).concat(rest.slice(0, Math.max(0, 12 - ts.length)).map((t) => t.id));
    return { key: 'mix:' + i, name: 'Daily Mix ' + (i + 1), desc: artist, ids, hue: (hue(artist) + i * 47) % 360 };
  });
}

function buildSources() {
  const m = new Map();
  for (const t of S.tracks) if (t.source) m.set(t.source, (m.get(t.source) || 0) + 1);
  const order = ['On Repeat', 'Music library', 'Downloads', 'Desktop', 'Documents', 'Movies'];
  S.sources = [...m.entries()].map(([name, count]) => ({ name, count }))
    .filter((x) => x.name !== 'On Repeat' && x.name !== 'Liked Songs')
    .sort((a, b) => {
      const ia = order.indexOf(a.name); const ib = order.indexOf(b.name);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return b.count - a.count;
    });
}

function savePlays() {
  try { localStorage.setItem('spotifly:plays', JSON.stringify(S.plays)); } catch { /* ignore */ }
}

function bumpPlay(id) {
  if (!id) return;
  const p = S.plays[id] || { count: 0, last: 0 };
  p.count = (p.count || 0) + 1;
  p.last = Date.now();
  S.plays[id] = p;
  savePlays();
  S.history.unshift({ id, at: Date.now() });
  if (S.history.length > 1000) S.history.length = 1000;
  saveHistory();
  bumpFeedbackPlay(id);
}

function saveDjFeedback() {
  try { localStorage.setItem('spotifly:djFeedback', JSON.stringify(S.djFeedback)); } catch { /* ignore */ }
}

function fbEntry(id) {
  if (!S.djFeedback.tracks[id]) S.djFeedback.tracks[id] = { plays: 0, skips: 0, last: 0 };
  return S.djFeedback.tracks[id];
}

function bumpFeedbackPlay(id) {
  const f = fbEntry(id);
  f.plays = (f.plays || 0) + 1;
  f.last = Date.now();
  saveDjFeedback();
}

function bumpFeedbackSkip(id) {
  if (!id) return;
  const f = fbEntry(id);
  f.skips = (f.skips || 0) + 1;
  f.last = Date.now();
  saveDjFeedback();
}

function toggleNever(id) {
  if (!id) return;
  const i = S.djFeedback.never.indexOf(id);
  if (i >= 0) {
    S.djFeedback.never.splice(i, 1);
    toast('Allowed again');
  } else {
    S.djFeedback.never.push(id);
    toast('Never play again — banned for the DJ');
  }
  saveDjFeedback();
}

function feedbackGenre(t) {
  if (!t) return '';
  if (t.tags && t.tags.genres && t.tags.genres.length) return t.tags.genres[0];
  if (t.genre) return t.genre;
  if (t.audio && t.audio.labels && t.audio.labels.length) {
    return String(t.audio.labels[0].label || '').replace(/---/g, ' ').split(' ').slice(0, 3).join(' ');
  }
  return '';
}

function toggleLess(kind, id) {
  const t = S.trackById.get(id);
  if (!t) return;
  const artist = kind === 'artist';
  const value = artist ? t.artist : feedbackGenre(t);
  if (!value) { toast('No genre available for this track'); return; }
  const list = artist ? S.djFeedback.lessArtists : S.djFeedback.lessGenres;
  const i = list.findIndex((x) => String(x).toLowerCase() === String(value).toLowerCase());
  if (i >= 0) {
    list.splice(i, 1);
    toast('Allowed again: ' + value);
  } else {
    list.push(value);
    toast((artist ? 'Less of artist: ' : 'Less of genre: ') + value);
  }
  saveDjFeedback();
}

function clearDjFeedback() {
  if (!window.confirm('Clear DJ feedback (skips, plays, bans, artist/genre filters)?')) return;
  S.djFeedback = { tracks: {}, never: [], lessArtists: [], lessGenres: [] };
  saveDjFeedback();
  toast('DJ feedback cleared');
}

function onRepeatIds() {
  const now = Date.now();
  const scored = S.tracks.map((t) => {
    const p = S.plays[t.id];
    if (!p || !p.count) return null;
    const days = (now - (p.last || 0)) / 86400000;
    let score = p.count * 3;
    if (days <= 3) score += 3;
    else if (days <= 14) score += 1.5;
    if (S.liked.has(t.id)) score += 1;
    return { id: t.id, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 30).map((x) => x.id);

  if (scored.length >= 8) return scored;
  const seen = new Set();
  const pool = [];
  const folder = S.tracks
    .filter((t) => t.source === 'On Repeat' || (t.folders && t.folders.includes('On Repeat')))
    .map((t) => t.id);
  const extra = folder.length >= 5 ? [] : recentIds();
  for (const id of scored.concat(folder, extra)) {
    if (!seen.has(id)) { seen.add(id); pool.push(id); }
    if (pool.length >= 30) break;
  }
  return pool;
}

function rewindIds() {
  const now = Date.now();
  return S.tracks.map((t) => {
    const p = S.plays[t.id];
    if (!p || !p.count || !p.last) return null;
    const days = (now - p.last) / 86400000;
    return days >= 7 ? { id: t.id, count: p.count, days } : null;
  }).filter(Boolean).sort((a, b) => b.count - a.count || b.days - a.days).slice(0, 20).map((x) => x.id);
}

function recentIds() {
  return S.tracks.slice().sort((a, b) => b.addedAt - a.addedAt).map((t) => t.id);
}

function contextInfo(key) {
  if (!key) return null;
  if (key === 'liked') {
    const ids = S.tracks.filter((t) => S.liked.has(t.id)).sort((a, b) => b.addedAt - a.addedAt).map((t) => t.id);
    return {
      key, label: 'Playlist', name: 'Liked Songs', ids, cover: { kind: 'liked' },
      desc: 'Everything you have hearted, in one place.',
      meta: `${plural(ids.length, 'song')} · ${fmtLong(S.tracks.filter((t) => S.liked.has(t.id)).reduce((s, t) => s + t.duration, 0))}`,
    };
  }
  if (key === 'all') {
    return {
      key, label: 'Playlist', name: 'All songs', ids: S.tracks.map((t) => t.id),
      cover: { kind: 'source', label: 'Playlist', name: 'All songs', hue: 148 },
      desc: 'Every track found in your library.',
      meta: `${plural(S.tracks.length, 'song')} · ${fmtLong(S.tracks.reduce((s, t) => s + t.duration, 0))}`,
    };
  }
  if (key === 'recent') {
    const ids = recentIds();
    return {
      key, label: 'Playlist', name: 'Recently added', ids,
      cover: { kind: 'source', label: 'Playlist', name: 'Recently added', hue: 200 },
      desc: 'The newest additions to your library.',
      meta: plural(ids.length, 'song'),
    };
  }
  if (key === 'history') {
    const ids = historyIds().slice(0, 100);
    const dur = ids.reduce((sum, id) => { const t = S.trackById.get(id); return sum + (t ? t.duration : 0); }, 0);
    return {
      key, label: 'History', name: 'Listening history', ids,
      cover: { kind: 'history' },
      desc: 'Tracks you have played recently.',
      meta: `${plural(ids.length, 'track')} · ${fmtLong(dur)}`,
    };
  }
  if (key === 'mostheard') {
    const ids = topTracks(S.statsRange, 30).map((x) => x.t.id);
    const dur = ids.reduce((sum, id) => { const t = S.trackById.get(id); return sum + (t ? t.duration : 0); }, 0);
    return {
      key, label: 'Stats', name: 'Most heard', ids,
      cover: { kind: 'chart' },
      desc: 'Your top tracks by play count.',
      meta: `${plural(ids.length, 'track')} · ${fmtLong(dur)}`,
    };
  }
  if (key === 'onrepeat') {
    const ids = onRepeatIds();
    const dur = ids.reduce((sum, id) => { const t = S.trackById.get(id); return sum + (t ? t.duration : 0); }, 0);
    return {
      key, label: 'Playlist', name: 'On Repeat', ids,
      cover: { kind: 'repeat' },
      desc: 'The songs you keep coming back to, refreshed as you listen.',
      meta: `${plural(ids.length, 'song')} · ${fmtLong(dur)}`,
    };
  }
  if (key === 'rewind') {
    const ids = rewindIds();
    const dur = ids.reduce((sum, id) => { const t = S.trackById.get(id); return sum + (t ? t.duration : 0); }, 0);
    return {
      key, label: 'Playlist', name: 'Repeat Rewind', ids,
      cover: { kind: 'rewind' },
      desc: 'Songs you played a while back — a trip through your older favorites.',
      meta: `${plural(ids.length, 'song')} · ${fmtLong(dur)}`,
    };
  }
  if (key === 'dj') {
    const d = S.dj;
    if (!d.tracks.length) return null;
    return {
      key, label: 'DJ set', name: 'AI DJ', ids: d.tracks.map((x) => x.id),
      cover: { kind: 'dj' },
      desc: d.intro,
      meta: `${plural(d.tracks.length, 'song')} · mixed by ${d.source === 'ollama' ? 'Ollama' : 'your offline DJ'}`,
    };
  }
  if (key.startsWith('user:')) {
    const pl = S.userPlaylists.find((x) => x.id === key.slice(5));
    if (!pl) return null;
    const dur = pl.trackIds.reduce((sum, id) => { const t = S.trackById.get(id); return sum + (t ? t.duration : 0); }, 0);
    return {
      key, label: 'Playlist', name: pl.name, ids: pl.trackIds.slice(),
      cover: { kind: 'playlist', name: pl.name },
      desc: 'Your playlist.',
      meta: `${plural(pl.trackIds.length, 'song')} · ${fmtLong(dur)}`,
      userPlaylist: pl,
    };
  }
  if (key.startsWith('import:')) {
    const pl = S.imports.find((x) => x.id === key.slice(7));
    if (!pl) return null;
    const isAi = pl.source === 'ai';
    const dur = pl.trackIds.reduce((sum, id) => { const t = S.trackById.get(id); return sum + (t ? t.duration : 0); }, 0);
    return {
      key, label: isAi ? 'AI playlist' : 'Imported playlist', name: pl.name, ids: pl.trackIds.slice(),
      cover: isAi ? { kind: 'ai' } : { kind: 'import', name: pl.name },
      desc: isAi
        ? (pl.description || 'An AI-curated mix from your library.')
        : (pl.counts.missing
          ? `${pl.counts.missing} of ${pl.counts.total} tracks from this Spotify playlist are not in your library yet.`
          : `Imported from Spotify — all ${pl.counts.total} tracks matched.`),
      meta: `${plural(pl.trackIds.length, 'song')} · ${fmtLong(dur)}${pl.counts.missing ? ' · ' + pl.counts.missing + ' missing' : ''}`,
      imported: pl,
    };
  }
  if (key === 'search') {
    return {
      key, label: 'Search', name: 'Search results', ids: S.searchIds,
      cover: { kind: 'source', label: 'Search', name: 'Results', hue: 260 },
      meta: plural(S.searchIds.length, 'song'),
    };
  }
  if (key.startsWith('src:')) {
    const name = key.slice(4);
    const ts = S.tracks.filter((t) => t.source === name);
    return {
      key, label: 'Playlist', name, ids: ts.map((t) => t.id),
      cover: { kind: 'source', label: 'Playlist', name, hue: hue(name) },
      desc: `Imported from ${name}.`,
      meta: `${plural(ts.length, 'song')} · ${fmtLong(ts.reduce((s, t) => s + t.duration, 0))}`,
    };
  }
  if (key.startsWith('mix:')) {
    const mix = S.mixes.find((m) => m.key === key);
    if (!mix) return null;
    return {
      key, label: 'Made for you', name: mix.name, ids: mix.ids,
      cover: { kind: 'mix', desc: mix.desc, hue: mix.hue },
      desc: `Built from ${mix.desc} and similar songs in your library.`,
      meta: plural(mix.ids.length, 'song'),
    };
  }
  if (key.startsWith('artist:')) {
    const name = key.slice(7);
    const ts = S.tracks.filter((t) => t.artist === name);
    return {
      key, label: 'Artist', name, ids: ts.map((t) => t.id),
      cover: { kind: 'artist', name },
      meta: `${plural(ts.length, 'song')} · ${fmtLong(ts.reduce((s, t) => s + t.duration, 0))}`,
    };
  }
  if (key.startsWith('album:')) {
    const id = key.slice(6);
    const a = S.albumById.get(id);
    if (!a) return null;
    return {
      key, label: a.single ? 'Single' : 'Album', name: a.name, ids: a.trackIds.slice(),
      cover: { kind: 'album', album: a },
      desc: a.single ? '' : '',
      meta: [a.artist, a.year, plural(a.trackIds.length, 'song')].filter(Boolean).join(' · '),
      album: a,
    };
  }
  return null;
}

/* ---------- views ---------- */

function quickTile(key, name, cover) {
  return `<div class="quick" data-act="open-playlist" data-key="${attr(key)}">
    ${coverHTML(cover)}
    <span class="q-name">${esc(name)}</span>
    <button class="q-play" data-act="play-playlist" data-key="${attr(key)}" title="Play">${ICON.play}</button>
  </div>`;
}

function albumCard(a) {
  return `<div class="card" data-act="open-album" data-id="${a.id}">
    ${albumArt(a)}
    <div class="c-name">${esc(a.name)}</div>
    <div class="c-sub">${a.year ? esc(a.year) + ' · ' : ''}${esc(a.artist)}</div>
    <button class="fab" data-act="play-album" data-id="${a.id}" title="Play ${esc(a.name)}">${ICON.play}</button>
  </div>`;
}

function playlistCard(key, name, sub, cover) {
  return `<div class="card" data-act="open-playlist" data-key="${attr(key)}">
    ${coverHTML(cover)}
    <div class="c-name">${esc(name)}</div>
    <div class="c-sub">${esc(sub)}</div>
    <button class="fab" data-act="play-playlist" data-key="${attr(key)}" title="Play">${ICON.play}</button>
  </div>`;
}

function artistCard(name) {
  return `<div class="card artist-card" data-act="open-artist" data-artist="${attr(name)}">
    ${artistArt(name)}
    <div class="c-name">${esc(name)}</div>
    <div class="c-sub">Artist</div>
    <button class="fab" data-act="play-artist" data-artist="${attr(name)}" title="Play ${esc(name)}">${ICON.play}</button>
  </div>`;
}

function trackTable(ids, ctxKey) {
  if (!ids.length) return `<div class="empty"><p>No songs here yet.</p></div>`;
  let h = `<div class="tracklist"><div class="trk-head"><div>#</div><div>Title</div><div class="t-album">Album</div><div class="t-added">Date added</div><div class="t-dur">${ICON.clock}</div></div>`;
  ids.forEach((id, i) => { h += trackRow(id, i + 1, ctxKey); });
  return h + '</div>';
}

function trackRow(id, index, ctxKey) {
  const t = S.trackById.get(id);
  if (!t) return '';
  const cur = S.currentId === id;
  const liked = S.liked.has(id);
  return `<div class="trk ${cur ? 'playing' : ''} ${cur && !S.playing ? 'paused' : ''}" data-id="${id}" data-index="${index}" data-ctx="${attr(ctxKey)}" data-act="play-track">
    <div class="trk-idx">
      <span class="idx-num">${cur ? ICON.eq : index}</span>
      <span class="idx-play">${ICON.play}</span>
    </div>
    <div class="trk-main">
      ${albumArt(S.albumById.get(t.albumId), 'trk-art')}
      <div class="trk-text">
        <div class="trk-title-row"><span class="t-title">${esc(t.title)}</span></div>
        <div class="t-artist"><span class="artist-link" data-act="open-artist" data-artist="${attr(t.artist)}">${esc(t.artist)}</span></div>
        ${debugTrackLabel(t)}
      </div>
    </div>
    <div class="t-album" data-act="open-album" data-id="${t.albumId}">${esc(t.album)}</div>
    <div class="t-added">${fmtDate(t.addedAt)}</div>
    <div class="t-dur"><span class="dur">${fmtTime(t.duration)}</span><button class="row-like ${liked ? 'liked' : ''}" data-act="like" data-id="${id}" title="Save to Liked Songs">${ICON.heart}</button><button class="row-more" data-act="row-menu" data-id="${id}" data-ctx="${attr(ctxKey)}" title="More options">${ICON.more}</button></div>
  </div>`;
}

function heroHTML(c) {
  return `<div class="hero" style="--g1:hsl(${hue(c.name)}, 30%, 24%)">
    ${coverHTML(c.cover)}
    <div class="hero-meta">
      <div class="hero-label">${esc(c.label)}</div>
      <div class="hero-title">${esc(c.name)}</div>
      ${c.desc ? `<div class="hero-desc">${esc(c.desc)}</div>` : ''}
      <div class="hero-sub">${c.meta ? esc(c.meta).replace(/ · /g, ' <span class="dot">·</span> ') : ''}</div>
    </div>
  </div>
  <div class="actionbar">
    <button class="bigplay" data-act="play-playlist" data-key="${attr(c.key)}" title="Play">${ICON.play}</button>
    <button class="action-icon" data-act="shuffle-play" data-key="${attr(c.key)}" title="Shuffle play">${ICON.shuffle}</button>
  </div>`;
}

function viewHome() {
  if (!S.tracks.length) {
    return `<div class="empty" style="padding-top:120px">
      <h3>Your library is empty</h3>
      <p>No music found yet. Connect your SSD and rescan, or add files to your Music folder.</p>
      <button class="btn green" data-act="rescan">${ICON.refresh} Rescan library</button>
    </div>`;
  }
  const hour = new Date().getHours();
  const greet = hour < 5 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const recent = S.albums.slice(0, 10);
  const tiles = [];
  tiles.push(quickTile('liked', 'Liked Songs', { kind: 'liked' }));
  tiles.push(quickTile('onrepeat', 'On Repeat', { kind: 'repeat' }));
  tiles.push(quickTile('recent', 'Recently added', { kind: 'source', name: 'Recently added', hue: 200 }));
  for (const a of recent) { if (tiles.length >= 6) break; tiles.push(quickTile('album:' + a.id, a.name, { kind: 'album', album: a })); }

  const recentPlayed = historyIds().slice(0, 6);
  const onRepeatCard = playlistCard('onrepeat', 'On Repeat', plural(onRepeatIds().length, 'song'), { kind: 'repeat' });
  const rw = rewindIds();
  const rewindCard = rw.length >= 3 ? playlistCard('rewind', 'Repeat Rewind', plural(rw.length, 'song'), { kind: 'rewind' }) : '';
  const userCards = S.userPlaylists.map((pl) => playlistCard('user:' + pl.id, pl.name,
    plural(pl.trackIds.length, 'song'), { kind: 'playlist', name: pl.name }));
  const importCards = S.imports.map((pl) => playlistCard('import:' + pl.id, pl.name,
    (pl.source === 'ai' ? 'AI playlist · ' : '') + plural(pl.trackIds.length, 'song') + (pl.counts && pl.counts.missing ? ' · ' + pl.counts.missing + ' missing' : ''),
    pl.source === 'ai' ? { kind: 'ai' } : { kind: 'import', name: pl.name }));
  const madeForYou = [onRepeatCard, rewindCard, ...userCards, ...importCards, ...S.mixes.map((m) => playlistCard(m.key, m.name, m.desc, { kind: 'mix', desc: m.desc, hue: m.hue }))].filter(Boolean);
  const artists = topArtists(6);
  const allIds = S.tracks.map((t) => t.id);

  const djBanner = `<div class="dj-banner" data-act="open-dj">
    <div class="dj-banner-art"><div class="dj-bars big"><i></i><i></i><i></i><i></i><i></i></div></div>
    <div class="dj-banner-meta">
      <div class="dj-kicker">Made for you</div>
      <div class="dj-banner-title">AI DJ</div>
      <div class="dj-banner-sub">A set picked by your local Ollama model, with spoken introductions between tracks.</div>
    </div>
    <button class="btn green" data-act="start-dj">Start listening</button>
  </div>`;

  return `<div class="view-inner">
    <div class="greeting">${esc(greet)}</div>
    <div class="quick-grid">${tiles.join('')}</div>
    ${djBanner}

    ${recentPlayed.length ? `<div class="section">
      <div class="sec-head"><h2>Recently played</h2><span class="sec-more" data-act="nav" data-view="history">Show all</span></div>
      <div class="card-grid">${recentPlayed.map((id) => trackCard(S.trackById.get(id), 'history')).join('')}</div>
    </div>` : ''}

    <div class="section">
      <div class="sec-head"><h2>Recently added</h2><span class="sec-more" data-act="nav" data-view="library">Show all</span></div>
      <div class="card-grid">${recent.map(albumCard).join('')}</div>
    </div>

    <div class="section">
      <div class="sec-head"><h2>Made for you</h2></div>
      <div class="card-grid">${madeForYou.join('')}</div>
    </div>

    <div class="section">
      <div class="sec-head"><h2>Your artists</h2></div>
      <div class="card-grid">${artists.map((a) => artistCard(a.name)).join('')}</div>
    </div>

    <div class="section">
      <div class="sec-head"><h2>All songs</h2><span class="sec-more" data-act="open-playlist" data-key="${attr('all')}">Show all</span></div>
    </div>
    ${trackTable(allIds.slice(0, 12), 'all')}
  </div>`;
}

function searchNorm(v) {
  return String(v || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function editDistance(a, b, max) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      cur.push(v);
      if (v < best) best = v;
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

function fuzzyScore(text, query) {
  const hay = searchNorm(text);
  const q = searchNorm(query);
  if (!q) return 0;
  if (hay === q) return 120;
  if (hay.startsWith(q)) return 100;
  if (hay.includes(q)) return 80;
  const tokens = q.split(' ').filter(Boolean);
  const words = hay.split(' ').filter(Boolean);
  let score = 0;
  let hits = 0;
  for (const tok of tokens) {
    if (hay.includes(tok)) { score += 12; hits++; continue; }
    if (tok.length >= 5) {
      const max = tok.length >= 8 ? 2 : 1;
      if (words.some((w) => Math.abs(w.length - tok.length) <= max && editDistance(w, tok, max) <= max)) {
        score += 7;
        hits++;
      }
    }
  }
  return hits ? score + (hits === tokens.length ? 10 : 0) : 0;
}

async function runSemanticSearch() {
  const q = S.query.trim();
  if (!q || S.searchBusy) return;
  S.searchBusy = true;
  render(false);
  try {
    const r = await fetch('/api/search?q=' + encodeURIComponent(q) + '&limit=40');
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'search failed');
    S.searchSemantic = { q, ids: (j.results || []).map((x) => x.id), model: j.model || null };
    if (!S.searchSemantic.ids.length) toast('No semantic matches');
  } catch (e) {
    S.searchSemantic = { q, ids: [], error: String(e.message || e) };
    toast('Semantic search unavailable');
  } finally {
    S.searchBusy = false;
    render(false);
  }
}

function searchToolsHTML() {
  const tab = S.searchFilter;
  const sources = ['', ...S.sources.map((s) => s.name)];
  const opts = sources.map((s) => `<option value="${esc(s)}" ${S.searchSource === s ? 'selected' : ''}>${esc(s || 'All sources')}</option>`).join('');
  const semantic = S.searchSemantic && S.searchSemantic.q === S.query.trim() ? S.searchSemantic : null;
  return `<div class="search-tools">
    <div class="chip-row">
      ${['all', 'tracks', 'albums', 'artists'].map((x) => `<button class="chip ${tab === x ? 'active' : ''}" data-act="search-filter" data-filter="${x}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}
    </div>
    <select id="search-source" class="search-source" title="Filter by source">${opts}</select>
    ${window.STATIC_MODE ? '' : `<button class="btn ghost" data-act="search-semantic" ${S.searchBusy ? 'disabled' : ''}>${S.searchBusy ? 'Matching…' : semantic ? 'Refresh AI match' : 'AI match'}</button>`}
  </div>
  ${semantic ? (semantic.error
    ? `<div class="small-note">AI search: ${esc(semantic.error)}</div>`
    : semantic.ids.length
      ? `<div class="section-h2">AI matches${semantic.model ? ' · ' + esc(semantic.model) : ''}</div>${trackTable(semantic.ids.slice(0, 20), 'search')}`
      : '<div class="small-note">No semantic matches for this query.</div>') : ''}`;
}

function viewSearch() {
  const q = S.query.trim();
  if (!q) {
    const pls = [
      playlistCard('liked', 'Liked Songs', plural(S.liked.size, 'song'), { kind: 'liked' }),
      playlistCard('recent', 'Recently added', 'Newest in your library', { kind: 'source', name: 'Recently added', hue: 200 }),
      ...S.sources.map((s) => playlistCard('src:' + s.name, s.name, plural(s.count, 'song'), { kind: 'source', label: 'Playlist', name: s.name, hue: hue(s.name) })),
    ];
    return `<div class="view-inner" style="padding-top:14px">
      <div class="section-h2">Browse your library</div>
      <div class="section"><div class="card-grid">${pls.join('')}</div></div>
      <div class="section-h2">Artists</div>
      <div class="section"><div class="card-grid">${topArtists(12).map((a) => artistCard(a.name)).join('')}</div></div>
    </div>`;
  }

  const ql = searchNorm(q);
  const sourceOk = (t) => !S.searchSource || t.source === S.searchSource;
  const scoredTracks = S.tracks.filter(sourceOk).map((t) => {
    const score = fuzzyScore(`${t.title} ${t.artist} ${t.album} ${trackTags(t)}`, q);
    return { t, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score || b.t.addedAt - a.t.addedAt);
  const tracks = scoredTracks.map((x) => x.t);

  const trackArtistScore = new Map();
  const trackAlbumScore = new Map();
  for (const x of scoredTracks) {
    trackArtistScore.set(x.t.artist, Math.max(trackArtistScore.get(x.t.artist) || 0, x.score + 4));
    trackAlbumScore.set(x.t.albumId, Math.max(trackAlbumScore.get(x.t.albumId) || 0, x.score + 2));
  }
  const albumScores = new Map();
  for (const a of S.albums) {
    const direct = fuzzyScore(`${a.name} ${a.artist}`, q);
    const viaTrack = trackAlbumScore.get(a.id) || 0;
    if (direct || viaTrack) albumScores.set(a.id, Math.max(direct, viaTrack));
  }
  const albums = S.albums.filter((a) => albumScores.has(a.id))
    .sort((a, b) => albumScores.get(b.id) - albumScores.get(a.id));
  const artistScores = new Map();
  for (const a of S.artists) {
    const direct = fuzzyScore(a, q);
    const viaTrack = trackArtistScore.get(a) || 0;
    if (direct || viaTrack) artistScores.set(a, Math.max(direct, viaTrack));
  }
  const artists = S.artists.filter((a) => artistScores.has(a)).sort((a, b) => artistScores.get(b) - artistScores.get(a));

  const semantic = S.searchSemantic && S.searchSemantic.q === q ? S.searchSemantic : null;
  S.searchIds = [...new Set(tracks.map((t) => t.id).concat((semantic && semantic.ids) || []))];

  const showTracks = S.searchFilter === 'all' || S.searchFilter === 'tracks';
  const showAlbums = S.searchFilter === 'all' || S.searchFilter === 'albums';
  const showArtists = S.searchFilter === 'all' || S.searchFilter === 'artists';

  let top = null;
  const exactArtist = artists.find((a) => searchNorm(a) === ql);
  if (showArtists && (exactArtist || artists.length)) top = { type: 'artist', name: exactArtist || artists[0] };
  else if (showAlbums && albums.length) top = { type: 'album', album: albums[0] };
  else if (showTracks && tracks.length) top = { type: 'album', album: S.albumById.get(tracks[0].albumId) };

  let topHTML = '';
  if (top && top.type === 'artist') {
    topHTML = `<div class="result-card" data-act="open-artist" data-artist="${attr(top.name)}">
      ${artistArt(top.name)}
      <div><div class="rc-name">${esc(top.name)}</div><div class="rc-sub">Artist · ${trackArtistScore.get(top.name) || ''}</div></div>
    </div>`;
  } else if (top && top.album) {
    topHTML = `<div class="result-card" data-act="open-album" data-id="${top.album.id}">
      ${albumArt(top.album)}
      <div><div class="rc-name">${esc(top.album.name)}</div><div class="rc-sub">${esc(top.album.artist)} · ${top.album.single ? 'Single' : 'Album'}</div></div>
    </div>`;
  }

  const nothing = !tracks.length && !albums.length && !artists.length && !(semantic && semantic.ids.length);
  return `<div class="view-inner" style="padding-top:10px">
    <div class="section-h2">Search results for “${esc(q)}”</div>
    ${searchToolsHTML()}
    ${topHTML ? `<div class="results-top">${topHTML}</div>` : ''}
    ${nothing ? `<div class="empty" style="padding:40px 0"><h3>No results found for “${esc(q)}”</h3><p>Try a different spelling, or use AI match for a semantic search.</p></div>` : ''}
    ${showTracks && tracks.length ? `<div class="section-h2">Songs <span class="small-note">${tracks.length}</span></div>${trackTable(tracks.slice(0, 40).map((t) => t.id), 'search')}` : ''}
    ${showAlbums && albums.length ? `<div class="section-h2">Albums</div><div class="section"><div class="card-grid">${albums.map(albumCard).join('')}</div></div>` : ''}
    ${showArtists && artists.length ? `<div class="section-h2">Artists</div><div class="section"><div class="card-grid">${artists.slice(0, 16).map(artistCard).join('')}</div></div>` : ''}
  </div>`;
}

function viewPlaylist(key) {
  const c = contextInfo(key);
  if (!c) return viewHome();
  if (key === 'liked' && !c.ids.length) {
    return `<div class="view-inner empty" style="padding-top:110px">
      <h3>Liked Songs</h3>
      <p>Songs you like will appear here. Tap the heart on any track to save it.</p>
      <button class="btn green" data-act="nav" data-view="home">Find something to play</button>
    </div>`;
  }
  const imported = c.imported;
  const note = imported ? (imported.source === 'ai'
    ? `<div class="import-note">
        <div class="in-text">
          <b>AI playlist${imported.model ? ' · ' + esc(imported.model) : ''}</b>
          <span>${esc(imported.description || 'Picked from your library by the local model.')}</span>
        </div>
        <div class="in-actions">
          <button class="btn ghost" data-act="delete-import" data-id="${imported.id}">Remove</button>
        </div>
      </div>`
    : `<div class="import-note">
        <div class="in-text">
          <b>${imported.counts.missing ? `${imported.counts.missing} track${imported.counts.missing === 1 ? '' : 's'} not in your library` : 'All tracks matched'}</b>
          <span>Matched ${imported.counts.matched} of ${imported.counts.total} from this Spotify playlist.${imported.counts.missing ? ' Add files you own to ~/Music or your SSD, then rescan.' : ''}</span>
        </div>
        <div class="in-actions">
          ${imported.counts.missing ? `<button class="btn ghost" data-act="copy-missing" data-id="${imported.id}">Copy missing</button>` : ''}
          <button class="btn ghost" data-act="delete-import" data-id="${imported.id}">Remove</button>
        </div>
      </div>`) : '';
  return `<div class="view-inner">${heroHTML(c)}${note}${trackTable(c.ids, key)}</div>`;
}

function viewAlbum(id) {
  const a = S.albumById.get(id);
  if (!a) return viewHome();
  const c = contextInfo('album:' + id);
  const meta = [esc(a.artist), a.year ? esc(a.year) : '', plural(a.trackIds.length, 'song')].filter(Boolean).join(' <span class="dot">•</span> ');
  return `<div class="view-inner">
    <div class="hero" style="--g1:hsl(${hue(a.name + a.artist)}, 30%, 24%)">
      ${albumArt(a)}
      <div class="hero-meta">
        <div class="hero-label">${a.single ? 'Single' : 'Album'}</div>
        <div class="hero-title">${esc(a.name)}</div>
        <div class="hero-sub"><b>${meta}</b></div>
      </div>
    </div>
    <div class="actionbar">
      <button class="bigplay" data-act="play-album" data-id="${a.id}" title="Play">${ICON.play}</button>
      <button class="action-icon" data-act="play-album-shuffle" data-id="${a.id}" title="Shuffle play">${ICON.shuffle}</button>
    </div>
    ${trackTable(a.trackIds, 'album:' + id)}
  </div>`;
}

function viewDj() {
  const d = S.dj;
  const st = S.djStatus;
  const providerName = st && st.provider === 'groq' ? 'Groq' : 'Ollama';
  const statusText = window.STATIC_MODE ? 'Web build · offline DJ picks'
    : !st ? 'Checking AI provider…'
    : st.available ? `Powered by ${providerName} · ${st.model}`
    : st.running ? `${providerName} running · no models available`
    : (st.provider === 'groq' ? 'Groq offline · built-in DJ picks' : 'Ollama offline · built-in DJ picks');
  const statusClass = st && st.available ? 'ok' : 'warn';
  const moods = ['Chill', 'Hype', 'Late night', 'Discover'];
  const chips = moods.map((m) => `<button class="chip ${d.mood === m ? 'active' : ''}" data-act="dj-mood" data-mood="${m}">${m}</button>`).join('');
  const lines = d.tracks.map((seg) => {
    const t = S.trackById.get(seg.id);
    if (!t) return '';
    const cur = S.currentId === seg.id;
    return `<div class="dj-line ${cur ? 'current' : ''}" data-djid="${seg.id}">
      <div class="dj-line-head"><b>${esc(t.title)}</b><span>${esc(t.artist)}</span></div>
      <div class="dj-line-text">${esc(seg.line)}</div>
    </div>`;
  }).join('');

  return `<div class="view-inner">
    <div class="dj-hero">
      <div class="dj-cover">
        <div class="dj-bars big"><i></i><i></i><i></i><i></i><i></i></div>
        <span>AI DJ</span>
      </div>
      <div class="dj-meta">
        <div class="hero-label">Made for you</div>
        <div class="hero-title">AI DJ</div>
        <div class="hero-desc">A continuous set from your own library${d.source === 'ollama' ? ', picked by your local Ollama model' : d.source === 'groq' ? ', picked by Groq' : ''}, with spoken intros between tracks.</div>
        <div class="dj-status ${statusClass}">${esc(statusText)}</div>
        ${st && !st.available ? `<div class="small-note" style="margin-top:8px">${esc(window.STATIC_MODE ? 'The web build uses offline picks. Run the local server for the AI DJ and semantic search.' : (st.provider === 'groq' ? (st.error || 'Groq unavailable — using offline picks.') : (st.running ? 'Ollama is running but no models are available.' : 'Ollama is not reachable. If your models live on an external SSD, reconnect it and reopen this page.')))}</div>` : ''}
        <div class="chip-row" style="padding:16px 0 0">${chips}</div>
        ${(() => {
          const s = Object.values(S.djFeedback.tracks).reduce((n, f) => n + (Number(f.skips) || 0), 0);
          const n = S.djFeedback.never.length;
          const a = S.djFeedback.lessArtists.length;
          const g = S.djFeedback.lessGenres.length;
          const bits = [];
          if (s) bits.push(`${s} skip${s === 1 ? '' : 's'}`);
          if (n) bits.push(`${n} banned track${n === 1 ? '' : 's'}`);
          if (a) bits.push(`${a} artist filter${a === 1 ? '' : 's'}`);
          if (g) bits.push(`${g} genre filter${g === 1 ? '' : 's'}`);
          return bits.length ? `<div class="small-note">DJ memory: ${bits.join(' · ')}</div>` : '';
        })()}
        <div class="dj-actions">
          <button class="bigplay" data-act="${d.active ? 'toggle-play' : 'start-dj'}" title="${d.active ? (S.playing ? 'Pause' : 'Play') : 'Start AI DJ'}">${d.active && S.playing ? ICON.pause : ICON.play}</button>
          ${d.tracks.length ? `<button class="btn ghost" data-act="new-dj">New set</button>` : ''}
          ${d.active ? `<button class="btn ghost" data-act="end-dj">End DJ</button>` : ''}
        </div>
      </div>
    </div>
    <div class="dj-chat">
      ${d.request ? `<div class="dj-msg user"><span>YOU</span><p>${esc(d.request)}</p></div>` : ''}
      ${d.reply ? `<div class="dj-msg dj"><span>DJ</span><p>${esc(d.reply)}</p></div>` : ''}
      <form class="dj-ask" id="dj-form" autocomplete="off">
        <input id="dj-ask-input" type="text" maxlength="160" placeholder='Ask the DJ — e.g. "play edit songs"'>
        <button class="btn green" type="submit">Send</button>
      </form>
      <div class="dj-suggestions">
        <button class="chip" data-act="dj-ask" data-text="edit songs">edit songs</button>
        <button class="chip" data-act="dj-ask" data-text="slowed + reverb">slowed + reverb</button>
        <button class="chip" data-act="dj-ask" data-text="something chill">something chill</button>
        <button class="chip" data-act="dj-ask" data-text="only liked songs">liked songs</button>
        <button class="chip" data-act="dj-ask" data-text="more like this">more like this</button>
      </div>
    </div>
    ${S.djBusy ? `<div class="dj-busy"><div class="dj-bars"><i></i><i></i><i></i><i></i></div><div><b>Building your set…</b><span>${window.STATIC_MODE ? 'Picking tracks from your scanned folder.' : 'The AI model can take up to three minutes on a cold start.'}</span></div></div>` : ''}
    ${d.tracks.length && !S.djBusy ? `<div class="dj-panel">
      <div class="sec-head" style="margin:0 0 10px"><h2>${d.active ? 'Now playing' : 'Last set'}</h2><span class="small-note">${d.source === 'ollama' ? 'Ollama · ' + esc(d.model || '') : d.source === 'groq' ? 'Groq · ' + esc(d.model || '') : 'Offline picks'}${d.retrieval ? ' · ' + d.retrieval + ' candidates' : ''}${d.fetching ? ' · picking more…' : ''}</span></div>
      ${d.intro ? `<div class="dj-intro">${esc(d.intro)}</div>` : ''}
      <div class="dj-lines">${lines}</div>
      ${d.outro ? `<div class="dj-outro">${esc(d.outro)}</div>` : ''}
    </div>` : ''}
    ${!d.tracks.length && !S.djBusy ? `<div class="section" style="padding-bottom:40px"><div class="dj-how">
      <h3>How it works</h3>
      <p>Press play, pick a mood, or just tell the DJ what you want — “play edit songs”, “something chill”, “more like this”. It picks a set from your library and talks you through it out loud, ducking the music while it speaks.</p>
      <p class="small-note">${esc(statusText)}</p>
    </div></div>` : ''}
  </div>`;
}

async function loadDjStatus() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => { try { ctrl.abort(); } catch { /* ignore */ } }, 6000);
  try {
    const r = await fetch('/api/ai/status?ts=' + Date.now(), { signal: ctrl.signal });
    S.djStatus = await r.json();
  } catch {
    S.djStatus = { running: false, available: false, models: [], error: 'unreachable' };
  } finally {
    clearTimeout(timer);
  }
  S.djStatusAt = Date.now();
  if (S.djStatus && S.djStatus.available && !S.djWarmed) {
    S.djWarmed = true;
    fetch('/api/ai/warm', { method: 'POST' }).catch(() => {});
  }
  if (S.view.type === 'dj') {
    render(false);
    if (!S.djStatus.available) {
      clearTimeout(S.djRetryTimer);
      S.djRetryTimer = setTimeout(() => {
        if (S.view.type === 'dj' && S.djStatus && !S.djStatus.available) loadDjStatus();
      }, 12000);
    }
  }
}

function pickVoice() {
  try {
    const vs = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
    if (!vs.length) return null;
    const prefs = [/daniel/i, /alex/i, /aaron/i, /google uk english male/i, /samantha/i, /karen/i, /moira/i];
    for (const re of prefs) {
      const v = vs.find((x) => re.test(x.name));
      if (v) return v;
    }
    return vs[0];
  } catch { return null; }
}

function speakDj(text) {
  if (!text || !('speechSynthesis' in window)) return;
  try { speechSynthesis.cancel(); } catch { /* ignore */ }
  if (!S.ttsVoice) S.ttsVoice = pickVoice();
  const u = new SpeechSynthesisUtterance(text);
  if (S.ttsVoice) u.voice = S.ttsVoice;
  u.rate = 1.02;
  u.pitch = 0.92;
  const base = S.muted ? 0 : S.volume;
  const restore = () => { clearTimeout(guard); S.audio.volume = S.muted ? 0 : S.volume; };
  const guard = setTimeout(restore, 25000);
  S.audio.volume = Math.max(0.02, base * 0.16);
  u.onend = restore;
  u.onerror = restore;
  try { speechSynthesis.speak(u); } catch { restore(); }
}

function cancelSpeech() {
  try { speechSynthesis.cancel(); } catch { /* ignore */ }
  S.audio.volume = S.muted ? 0 : S.volume;
}

function clearHistory() {
  if (!S.history.length) { toast('History is already empty'); return; }
  if (!window.confirm('Clear your listening history? Play counts stay.')) return;
  S.history = [];
  saveHistory();
  render(false);
  toast('Listening history cleared');
}

function resetStats() {
  if (!window.confirm('Reset all play counts and listening history?')) return;
  S.plays = {};
  S.history = [];
  savePlays();
  saveHistory();
  render(false);
  toast('Listening stats reset');
}

function saveQueueAsPlaylist() {
  if (!S.queue.length) { toast('Queue is empty'); return; }
  const ids = S.queue.slice(Math.max(0, S.qIndex));
  const name = window.prompt('Playlist name', 'Queue');
  if (!name || !name.trim()) return;
  const pl = createUserPlaylist(name.trim(), ids);
  renderSidebar();
  if (S.view.type === 'library') render(false);
  toast('Saved “' + pl.name + '” · ' + ids.length + ' songs');
}

function clearQueue() {
  if (!S.queue.length) return;
  if (S.currentId) { S.queue = [S.currentId]; S.qIndex = 0; }
  else { S.queue = []; S.qIndex = -1; }
  renderQueue();
  toast('Queue cleared');
}

function saveUserPlaylists() {
  try { localStorage.setItem('spotifly:playlists', JSON.stringify(S.userPlaylists)); } catch { /* ignore */ }
}

function createUserPlaylist(name, trackIds) {
  const pl = {
    id: 'pl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: String(name || 'New playlist').trim().slice(0, 60) || 'New playlist',
    trackIds: [...new Set(trackIds || [])],
    createdAt: Date.now(),
  };
  S.userPlaylists.unshift(pl);
  saveUserPlaylists();
  return pl;
}

function addToQueue(id) {
  if (!S.currentId) { playIds([id], id, 'custom'); return; }
  S.queue.push(id);
  if (S.queueOpen) renderQueue();
  toast('Added to queue');
}

function playNext(id) {
  if (!S.currentId) { playIds([id], id, 'custom'); return; }
  S.queue.splice(Math.min(S.qIndex + 1, S.queue.length), 0, id);
  if (S.queueOpen) renderQueue();
  toast('Playing next');
}

function addToUserPlaylist(plId, trackId) {
  const pl = S.userPlaylists.find((x) => x.id === plId);
  if (!pl) return;
  if (pl.trackIds.includes(trackId)) { toast('Already in “' + pl.name + '”'); return; }
  pl.trackIds.push(trackId);
  saveUserPlaylists();
  if (S.view.type === 'playlist' && S.view.key === 'user:' + pl.id) render(false);
  else renderSidebar();
  toast('Added to “' + pl.name + '”');
}

function removeFromUserPlaylist(plId, trackId) {
  const pl = S.userPlaylists.find((x) => x.id === plId);
  if (!pl) return;
  pl.trackIds = pl.trackIds.filter((id) => id !== trackId);
  saveUserPlaylists();
  render(false);
  toast('Removed from playlist');
}

function closeRowMenu() {
  const menu = $('#row-menu');
  if (menu) menu.classList.add('hidden');
  S.rowMenu = null;
}

function openRowMenu(btn, id, ctxKey) {
  const t = S.trackById.get(id);
  if (!t) return;
  S.rowMenu = { id, ctxKey: ctxKey || '' };
  const liked = S.liked.has(id);
  const curPl = ctxKey && ctxKey.startsWith('user:')
    ? S.userPlaylists.find((p) => 'user:' + p.id === ctxKey) : null;
  const menu = $('#row-menu');
  const plButtons = S.userPlaylists.length
    ? S.userPlaylists.map((p) => `<button data-act="menu-add" data-pl="${p.id}"><span class="rm-name">${esc(p.name)}</span>${p.trackIds.includes(id) ? '<span class="menu-check">✓</span>' : ''}</button>`).join('')
    : '<div class="rm-empty">No playlists yet</div>';
  const audioLabels = t.audio && t.audio.labels && t.audio.labels.length
    ? `<div class="rm-tags">${t.audio.labels.slice(0, 3).map((l) => esc(String(l.label || '').replace(/---/g, ' / '))).join(' · ')}</div>`
    : '';
  const genre = feedbackGenre(t);
  const lessArtist = S.djFeedback.lessArtists.some((x) => String(x).toLowerCase() === String(t.artist).toLowerCase());
  const lessGenre = genre && S.djFeedback.lessGenres.some((x) => String(x).toLowerCase() === String(genre).toLowerCase());
  menu.innerHTML = `<div class="rm-head"><b>${esc(t.title)}</b><span>${esc(t.artist)}</span>${audioLabels}</div>
    <button data-act="menu-queue">Add to queue</button>
    <button data-act="menu-next">Play next</button>
    <button data-act="menu-like">${liked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}</button>
    <div class="rm-sep"></div>
    <div class="rm-label">Add to playlist</div>
    ${plButtons}
    <button data-act="menu-new">＋ New playlist</button>
    <div class="rm-sep"></div>
    <button data-act="menu-never">${S.djFeedback.never.includes(id) ? 'Allow again' : 'Never play again'}</button>
    <button data-act="menu-less-artist">${lessArtist ? 'Allow artist again' : 'Less like this artist'}</button>
    ${genre ? `<button data-act="menu-less-genre">${lessGenre ? 'Allow genre again' : 'Less like ' + esc(genre)}</button>` : ''}
    <button data-act="menu-album">Go to album</button>
    <button data-act="menu-artist">Go to artist</button>
    ${curPl ? `<div class="rm-sep"></div><button class="danger" data-act="menu-remove">Remove from “${esc(curPl.name)}”</button>` : ''}`;
  menu.classList.remove('hidden');
  let r = btn.getBoundingClientRect();
  if (!r.width || !r.height) {
    const row = btn.closest('.trk');
    r = row ? row.getBoundingClientRect() : { right: window.innerWidth - 90, top: 120, left: window.innerWidth - 90 };
  }
  const mw = menu.offsetWidth;
  const mh = menu.offsetHeight;
  let x = Math.min(r.right + 8, window.innerWidth - mw - 12);
  if (x < 12) x = 12;
  let y = r.top;
  if (y + mh > window.innerHeight - 12) y = Math.max(12, window.innerHeight - mh - 12);
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
}

function newPlaylistPrompt(trackId) {
  const name = window.prompt('Playlist name', 'New playlist');
  if (!name || !name.trim()) return;
  const pl = createUserPlaylist(name.trim(), trackId ? [trackId] : []);
  toast('Playlist “' + pl.name + '” created');
  if (!trackId) nav({ type: 'playlist', key: 'user:' + pl.id });
  else render(false);
}

function addLocalDjPicks(n) {
  const recent = new Set(S.dj.tracks.slice(-40).map((t) => t.id));
  let pool = S.tracks.filter((t) => !recent.has(t.id) && !S.queue.includes(t.id));
  if (pool.length < n) pool = S.tracks.filter((t) => !S.queue.includes(t.id));
  if (pool.length < n) pool = S.tracks.slice();
  shuffleArr(pool);
  const have = new Set(S.dj.tracks.map((t) => t.id));
  let added = 0;
  for (const t of pool) {
    if (added >= n) break;
    if (have.has(t.id)) continue;
    have.add(t.id);
    S.dj.tracks.push({ id: t.id, line: '' });
    S.dj.lines[t.id] = '';
    S.queue.push(t.id);
    added++;
  }
  if (S.view.type === 'dj') render(false);
  return added;
}

async function extendDjQueue() {
  if (!S.dj.active || S.dj.fetching) return;
  S.dj.fetching = true;
  if (S.view.type === 'dj') render(false);
  try {
    const exclude = S.dj.tracks.slice(-40).map((t) => t.id);
    const res = await fetch('/api/dj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history: S.plays,
        likes: [...S.liked],
        mood: S.dj.mood || '',
        request: S.dj.request || '',
        currentId: S.currentId || '',
        exclude,
        feedback: S.djFeedback,
      }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error('status ' + res.status);
    if (!j.tracks || !j.tracks.length) throw new Error('empty set');
    const have = new Set(S.dj.tracks.map((t) => t.id));
    let added = 0;
    for (const seg of j.tracks) {
      if (!seg || !S.trackById.has(seg.id) || have.has(seg.id)) continue;
      have.add(seg.id);
      S.dj.tracks.push({ id: seg.id, line: seg.line || '' });
      S.dj.lines[seg.id] = seg.line || '';
      S.queue.push(seg.id);
      added++;
    }
    if (!added) throw new Error('no new tracks');
    if (j.status) S.djStatus = j.status;
  } catch {
    addLocalDjPicks(8);
  } finally {
    S.dj.fetching = false;
    if (S.view.type === 'dj') render(false);
  }
}

function maybeExtendDj() {
  if (!S.dj.active || S.dj.fetching || !S.queue.length) return;
  if (S.qIndex >= S.queue.length - 4) extendDjQueue();
}

function maybeSpeakDjLine(id) {
  if (!S.dj.active || !id) return;
  const line = S.dj.lines[id];
  if (!line || S.djSpokenFor === id) return;
  S.djSpokenFor = id;
  const first = S.dj.tracks[0] && S.dj.tracks[0].id === id;
  if (first) return;
  speakDj(line);
}

function endDj(silent) {
  cancelSpeech();
  const was = S.dj.active;
  S.dj.active = false;
  S.djSpokenFor = null;
  if (was && !silent) toast('AI DJ ended');
  if (S.view.type === 'dj') render(false);
}

async function startDj(opts = {}) {
  if (S.djBusy) return;
  if (opts.mood !== undefined) S.dj.mood = String(opts.mood || '').slice(0, 40);
  if (opts.request !== undefined) {
    S.dj.request = String(opts.request || '').trim().slice(0, 160);
    if (opts.mood === undefined) S.dj.mood = '';
  }
  if (S.view.type !== 'dj') nav({ type: 'dj' });
  S.djBusy = true;
  render(false);
  try {
    const res = await fetch('/api/dj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history: S.plays,
        likes: [...S.liked],
        mood: S.dj.mood || '',
        request: S.dj.request || '',
        currentId: S.currentId || '',
        feedback: S.djFeedback,
      }),
    });
    if (!res.ok) throw new Error('status ' + res.status);
    const j = await res.json();
    if (!j.tracks || !j.tracks.length) throw new Error('no tracks');
    S.dj = {
      active: true,
      source: j.source,
      model: j.model,
      intro: j.intro || '',
      reply: j.reply || '',
      request: j.request || S.dj.request || '',
      outro: j.outro || '',
      mood: j.mood || S.dj.mood || '',
      startedAt: Date.now(),
      retrieval: j.retrieval || 0,
      fetching: false,
      tracks: j.tracks,
      lines: Object.fromEntries(j.tracks.map((t) => [t.id, t.line || ''])),
    };
    if (j.status) S.djStatus = j.status;
    if (j.source === 'fallback') toast('AI unavailable — using the built-in DJ', 3600);
    S.djSpokenFor = null;
    S.lastDjHighlight = null;
    S.djBusy = false;
    playContext('dj');
    speakDj(S.dj.reply || S.dj.intro);
    render(false);
  } catch (e) {
    S.djBusy = false;
    render(false);
    toast('Could not build a DJ set');
  }
}


function updateDjHighlight() {
  if (S.view.type !== 'dj') return;
  let current = null;
  for (const el of $$('.dj-line')) {
    const on = el.dataset.djid === S.currentId;
    el.classList.toggle('current', on);
    if (on) current = el;
  }
  if (current && S.lastDjHighlight !== S.currentId) {
    S.lastDjHighlight = S.currentId;
    const box = current.closest('.dj-lines');
    if (box) {
      const top = current.offsetTop - box.offsetTop;
      if (top < box.scrollTop || top + current.offsetHeight > box.scrollTop + box.clientHeight) {
        box.scrollTop = Math.max(0, top - 6);
      }
    }
  }
}

function viewHistory() {
  const ids = historyIds();
  if (!ids.length) {
    return `<div class="view-inner empty" style="padding-top:110px">
      <h3>No listening history yet</h3>
      <p>Play something and it will show up here.</p>
      <button class="btn green" data-act="nav" data-view="home">Find something to play</button>
    </div>`;
  }
  const last = historyLastMap();
  const grouped = new Map();
  for (const id of ids) {
    const g = historyGroup(last.get(id) || 0);
    if (!grouped.has(g)) grouped.set(g, []);
    grouped.get(g).push(id);
  }
  const order = ['Today', 'Yesterday', 'This week', 'This month', 'Earlier'];
  const groups = order.filter((g) => grouped.has(g)).map((g) => {
    const rows = grouped.get(g).map((id) => {
      const t = S.trackById.get(id);
      const a = S.albumById.get(t.albumId);
      const count = countInRange(id, 'all');
      const at = last.get(id) || 0;
      return `<div class="hist-row" data-act="play-track" data-id="${id}" data-ctx="history">
        ${albumArt(a)}
        <div class="hist-main"><div class="hr-title">${esc(t.title)}</div><div class="hr-artist">${esc(t.artist)}</div></div>
        <div class="hr-plays">${count} play${count === 1 ? '' : 's'}</div>
        <div class="hr-time">${relTime(at)}</div>
        <div class="hr-dur">${fmtTime(t.duration)}</div>
        <button class="row-more" data-act="row-menu" data-id="${id}" data-ctx="history" title="More options">${ICON.more}</button>
      </div>`;
    }).join('');
    return `<div class="hist-group"><h3>${esc(g)}</h3>${rows}</div>`;
  }).join('');
  const dur = ids.reduce((sum, id) => { const t = S.trackById.get(id); return sum + (t ? t.duration : 0); }, 0);
  return `<div class="view-inner">
    <div class="hero" style="--g1:hsl(210,32%,24%)">
      ${coverHTML({ kind: 'history' })}
      <div class="hero-meta">
        <div class="hero-label">History</div>
        <div class="hero-title">Listening history</div>
        <div class="hero-desc">Recent plays, grouped by when you listened.</div>
        <div class="hero-sub">${plural(ids.length, 'track')} · ${fmtLong(dur)}</div>
      </div>
    </div>
    <div class="actionbar">
      <button class="bigplay" data-act="play-playlist" data-key="history" title="Play history">${ICON.play}</button>
      <button class="action-icon" data-act="shuffle-play" data-key="history" title="Shuffle history">${ICON.shuffle}</button>
      <button class="btn ghost" data-act="clear-history">Clear history</button>
    </div>
    ${groups}
  </div>`;
}

function viewMostHeard() {
  const range = S.statsRange;
  const rangeLabel = range === 'month' ? 'Last 4 weeks' : 'All time';
  const tab = S.statsTab;
  const tracks = topTracks(range, 30);
  const artists = topArtistsByPlays(range, 18);
  const albums = topAlbumsByPlays(range, 18);
  if (!tracks.length) {
    return `<div class="view-inner empty" style="padding-top:110px">
      <h3>No play counts yet</h3>
      <p>Play some music to build your Most heard lists.</p>
      <button class="btn green" data-act="nav" data-view="home">Find something to play</button>
    </div>`;
  }
  const tabs = `<div class="tabs" style="padding:0">
    <button class="tab ${tab === 'tracks' ? 'active' : ''}" data-act="stats-tab" data-tab="tracks">Tracks</button>
    <button class="tab ${tab === 'artists' ? 'active' : ''}" data-act="stats-tab" data-tab="artists">Artists</button>
    <button class="tab ${tab === 'albums' ? 'active' : ''}" data-act="stats-tab" data-tab="albums">Albums</button>
  </div>`;
  const ranges = `<div class="chip-row" style="padding:0">
    <button class="chip ${range === 'all' ? 'active' : ''}" data-act="stats-range" data-range="all">All time</button>
    <button class="chip ${range === 'month' ? 'active' : ''}" data-act="stats-range" data-range="month">Last 4 weeks</button>
  </div>`;
  let body = '';
  if (tab === 'tracks') {
    body = `<div class="stat-list">${tracks.map((x, i) => `<div class="stat-row" data-act="play-track" data-id="${x.t.id}" data-ctx="mostheard">
      <div class="stat-rank">${i + 1}</div>
      ${albumArt(S.albumById.get(x.t.albumId))}
      <div class="hist-main"><div class="hr-title">${esc(x.t.title)}</div><div class="hr-artist">${esc(x.t.artist)}</div></div>
      <div class="stat-count">${x.count} play${x.count === 1 ? '' : 's'}</div>
      <div class="hr-dur">${fmtTime(x.t.duration)}</div>
      <button class="row-more" data-act="row-menu" data-id="${x.t.id}" data-ctx="mostheard" title="More options">${ICON.more}</button>
    </div>`).join('')}</div>`;
  } else if (tab === 'artists') {
    body = `<div class="section"><div class="card-grid">${artists.map((a) => `<div class="card artist-card" data-act="open-artist" data-artist="${attr(a.name)}">
      ${artistArt(a.name)}
      <div class="c-name">${esc(a.name)}</div>
      <div class="c-sub">${a.count} play${a.count === 1 ? '' : 's'}</div>
    </div>`).join('')}</div></div>`;
  } else {
    body = `<div class="section"><div class="card-grid">${albums.map((x) => `<div class="card" data-act="open-album" data-id="${x.album.id}">
      ${albumArt(x.album)}
      <div class="c-name">${esc(x.album.name)}</div>
      <div class="c-sub">${esc(x.album.artist)} · ${x.count} play${x.count === 1 ? '' : 's'}</div>
    </div>`).join('')}</div></div>`;
  }
  const totalPlays = tracks.reduce((sum, x) => sum + x.count, 0);
  return `<div class="view-inner">
    <div class="hero" style="--g1:hsl(18,38%,26%)">
      ${coverHTML({ kind: 'chart' })}
      <div class="hero-meta">
        <div class="hero-label">Stats</div>
        <div class="hero-title">Most heard</div>
        <div class="hero-desc">${rangeLabel} — based on your listening history.</div>
        <div class="hero-sub">${plural(totalPlays, 'play')} across ${plural(tracks.length, 'track')}</div>
      </div>
    </div>
    <div class="actionbar">
      <button class="bigplay" data-act="play-playlist" data-key="mostheard" title="Play top tracks">${ICON.play}</button>
      <button class="action-icon" data-act="shuffle-play" data-key="mostheard" title="Shuffle top tracks">${ICON.shuffle}</button>
      <button class="btn ghost" data-act="reset-stats">Reset stats</button>
    </div>
    <div class="stat-controls">${tabs}${ranges}</div>
    ${body}
  </div>`;
}


function debugStatCard(label, value, sub) {
  return `<div class="debug-stat"><span>${esc(label)}</span><b>${esc(value)}</b>${sub ? `<em>${esc(sub)}</em>` : ''}</div>`;
}

function debugRowsHTML(query) {
  const ql = String(query || '').toLowerCase();
  const list = S.tracks.filter((t) => {
    if (!ql) return true;
    const audio = t.audio && t.audio.labels ? t.audio.labels.map((l) => l.label).join(' ') : '';
    const llm = t.tags
      ? [].concat(t.tags.genres || [], t.tags.moods || [], t.tags.keywords || [], [t.tags.language || '', t.tags.era || '']).join(' ')
      : '';
    return `${t.title} ${t.artist} ${t.album} ${t.source} ${audio} ${llm}`.toLowerCase().includes(ql);
  });
  const shown = list;
  const rows = shown.map((t) => {
    const audio = t.audio && t.audio.labels
      ? t.audio.labels.slice(0, 5).map((l) => `<span class="dbg-tag">${esc(String(l.label || '').replace(/---/g, ' / '))} <em>${Math.round((l.score || 0) * 100)}%</em></span>`).join('')
      : '<span class="dbg-none">—</span>';
    const llmBits = [];
    if (t.tags) {
      for (const g of (t.tags.genres || [])) llmBits.push(`<span class="dbg-tag llm">${esc(g)}</span>`);
      for (const m of (t.tags.moods || [])) llmBits.push(`<span class="dbg-tag mood">${esc(m)}</span>`);
      for (const k of (t.tags.keywords || [])) llmBits.push(`<span class="dbg-tag">${esc(k)}</span>`);
      if (t.tags.language) llmBits.push(`<span class="dbg-tag lang">${esc(t.tags.language)}</span>`);
    }
    const llm = llmBits.length ? llmBits.join('') : '<span class="dbg-none">— no LLM tags</span>';
    const plays = (S.plays[t.id] && S.plays[t.id].count) || 0;
    const kbps = t.bitrate ? Math.round(t.bitrate / 1000) + ' kbps' : '';
    return `<div class="dbg-row" title="${esc(t.file)}">
      <div class="dbg-track"><b>${esc(t.title)}</b><span>${esc(t.artist)}${t.source ? ' · ' + esc(t.source) : ''}</span></div>
      <div class="dbg-labels">${audio}</div>
      <div class="dbg-labels">${llm}</div>
      <div class="dbg-meta">${plays} plays${kbps ? '<br>' + kbps : ''}<br>${fmtTime(t.duration)}</div>
    </div>`;
  }).join('');
  return `<div class="debug-count">${list.length} tracks</div>
    <div class="dbg-table">${rows || '<div class="empty"><p>No matching tracks.</p></div>'}</div>`;
}

function viewDebug() {
  const d = S.debugData;
  if (!d) {
    return `<div class="view-inner"><div class="empty" style="padding-top:110px"><h3>Loading debug…</h3><p>Reading library, labels and retrieval state.</p></div></div>`;
  }
  const dj = d.lastDj;
  const lpd = d.lastPlaylist;
  const emb = d.embeddings;
  const stats = `<div class="debug-stats">
    ${debugStatCard('Tracks', d.counts.tracks)}
    ${debugStatCard('Audio labels', d.counts.audioLabels, d.audio ? d.audio.model.split('/').pop() : '')}
    ${debugStatCard('LLM tags', d.counts.llmTags)}
    ${debugStatCard('Embeddings', emb ? emb.count : 0, emb ? emb.model + ' · ' + emb.dim + 'd' : 'not built')}
    ${debugStatCard('Play counts', Object.keys(S.plays).length)}
    ${debugStatCard('History events', S.history.length)}
  </div>`;

  let djHtml = '<div class="small-note" style="padding:0 24px 20px">No DJ request since the server restarted. Ask the DJ something and hit Refresh.</div>';
  if (dj) {
    const ret = dj.retrieval;
    const picked = new Set(dj.picks || []);
    const cands = ret && ret.candidates ? ret.candidates : [];
    const rows = cands.map((c) => {
      const t = S.trackById.get(c.id);
      return `<div class="dbg-cand ${picked.has(c.id) ? 'picked' : ''}">
        <div class="dbg-rank">${c.rank}</div>
        <div class="dbg-track"><b>${esc(t ? t.title : c.title)}</b><span>${esc(t ? t.artist : c.artist)}</span></div>
        <div class="dbg-num">${c.score != null ? c.score : '—'}</div>
        <div class="dbg-num">${c.cosine != null ? c.cosine : '—'}</div>
        <div class="dbg-pick">${picked.has(c.id) ? '✓' : ''}</div>
      </div>`;
    }).join('');
    const pickBits = (dj.picks || []).map((id) => S.trackById.get(id)).filter(Boolean)
      .map((t) => `<span class="dbg-tag llm">${esc(t.title)} — ${esc(t.artist)}</span>`).join('');
    djHtml = `<div class="debug-section">
      <div class="debug-meta">
        <span>Request <b>${esc(dj.request || '(no request)')}</b></span>
        <span>Model <b>${esc(dj.model || 'fallback')}</b></span>
        <span>Embedding <b>${esc(ret && ret.embeddingModel ? ret.embeddingModel : 'none')}</b></span>
        <span>Shortlist <b>${cands.length}</b></span>
        <span>Picks <b>${(dj.picks || []).length}</b></span>
        <span>Time <b>${dj.elapsedMs || 0} ms</b></span>
      </div>
      <div class="dbg-picks">${pickBits}</div>
      ${cands.length ? `<div class="dbg-table dbg-cands">
        <div class="dbg-cand head"><div class="dbg-rank">#</div><div>Track</div><div class="dbg-num">Score</div><div class="dbg-num">Cosine</div><div class="dbg-pick"></div></div>
        ${rows}
      </div>` : '<div class="small-note">Fallback set — no semantic retrieval for this request.</div>'}
    </div>`;
  }

  let plHtml = '<div class="small-note" style="padding:0 24px 20px">No AI playlist generated since the server restarted.</div>';
  if (lpd) {
    const ret = lpd.retrieval;
    const pickBits = (lpd.picks || []).map((id) => S.trackById.get(id)).filter(Boolean)
      .map((t) => `<span class="dbg-tag">${esc(t.title)} — ${esc(t.artist)}</span>`).join('');
    plHtml = `<div class="debug-section">
      <div class="debug-meta">
        <span>Theme <b>${esc(lpd.theme)}</b></span>
        <span>Name <b>${esc(lpd.name)}</b></span>
        <span>Model <b>${esc(lpd.model || 'fallback')}</b></span>
        <span>Embedding <b>${esc(ret && ret.embeddingModel ? ret.embeddingModel : 'none')}</b></span>
        <span>Candidates <b>${ret && ret.candidates ? ret.candidates.length : 0}</b></span>
      </div>
      <div class="dbg-picks">${pickBits}</div>
    </div>`;
  }

  return `<div class="view-inner">
    <div class="section debug-top">
      <div class="debug-title">Debug</div>
      <div class="lib-head-actions">
        <button class="btn ghost" data-act="refresh-debug">Refresh</button>
        <button class="btn ghost" data-act="copy-debug">Copy JSON</button>
        <button class="btn ghost" data-act="open-settings">Settings</button>
      </div>
    </div>
    ${stats}
    <div class="section"><div class="sec-head"><h2>Last DJ retrieval</h2></div></div>
    ${djHtml}
    <div class="section"><div class="sec-head"><h2>Last AI playlist</h2></div></div>
    ${plHtml}
    <div class="section">
      <div class="sec-head"><h2>Labels explorer</h2></div>
      <input id="debug-filter" class="debug-filter" placeholder="Filter title, artist, MAEST label, LLM tag…" value="${esc(S.debugQuery)}">
      <div id="debug-rows">${debugRowsHTML(S.debugQuery)}</div>
    </div>
  </div>`;
}

async function loadDebug() {
  if (S.debugLoading) return;
  S.debugLoading = true;
  try {
    const r = await fetch('/api/debug?ts=' + Date.now());
    S.debugData = await r.json();
  } catch {
    S.debugData = null;
  } finally {
    S.debugLoading = false;
  }
  if (S.view.type === 'debug') render(false);
}

async function loadSettingsStats() {
  try {
    const r = await fetch('/api/debug?ts=' + Date.now());
    S.settingsDebug = await r.json();
  } catch {
    S.settingsDebug = null;
  }
  renderSettingsStats();
}

async function loadIndexHealth() {
  try {
    const r = await fetch('/api/index/health?ts=' + Date.now());
    S.indexHealth = await r.json();
  } catch {
    S.indexHealth = null;
  }
  if (S.view.type === 'library') render(false);
  if (!$('#settings-modal').classList.contains('hidden')) renderSettingsStats();
  clearTimeout(S.indexTimer);
  if (S.indexHealth && S.indexHealth.status && S.indexHealth.status.running) {
    S.indexTimer = setTimeout(loadIndexHealth, 3000);
  }
}

async function startIndexFix() {
  try {
    const r = await fetch('/api/index/start', { method: 'POST' });
    const j = await r.json();
    if (!r.ok) { toast(j.error || 'Could not start indexer'); return; }
    toast('Indexing started — labels, tags and embeddings');
    setTimeout(loadIndexHealth, 1200);
  } catch {
    toast('Could not start indexer');
  }
}

function indexHealthHTML() {
  const h = S.indexHealth;
  if (!h) return '<div class="small-note">Index status unavailable.</div>';
  const st = h.status || {};
  const missing = h.missing || {};
  const missingTotal = (missing.audioLabels || 0) + (missing.llmTags || 0) + (missing.embeddings || 0);
  const running = !!st.running;
  return `<div class="index-health">
    <div class="settings-grid">
      <div><span>Audio labels</span><b>${h.counts.audioLabels}/${h.tracks}</b></div>
      <div><span>LLM tags</span><b>${h.counts.llmTags}/${h.tracks}</b></div>
      <div><span>Embeddings</span><b>${h.counts.embeddings}/${h.tracks}</b></div>
      <div><span>State</span><b>${running ? 'indexing' : missingTotal ? 'incomplete' : 'ready'}</b><em>${running && st.stage ? esc(st.stage) : ''}</em></div>
    </div>
    <div class="index-actions">
      <span class="small-note">${missingTotal ? `${missingTotal} missing item${missingTotal === 1 ? '' : 's'}` : 'Everything indexed'}</span>
      <button class="btn ghost" data-act="start-index" ${running ? 'disabled' : ''}>${running ? 'Indexing…' : 'Fix index'}</button>
    </div>
    ${st.error ? `<div class="small-note">Index error: ${esc(st.error)}</div>` : ''}
  </div>`;
}

async function loadAiSettings() {
  try {
    const r = await fetch('/api/ai/status?ts=' + Date.now());
    S.settingsAi = await r.json();
  } catch {
    S.settingsAi = null;
  }
  renderSettingsStats();
}

function renderSettingsStats() {
  const el = $('#settings-stats');
  if (!el) return;
  const d = S.settingsDebug;
  let html = d ? `<div class="settings-grid">
    <div><span>Tracks</span><b>${d.counts.tracks}</b></div>
    <div><span>Audio labels</span><b>${d.counts.audioLabels}</b></div>
    <div><span>LLM tags</span><b>${d.counts.llmTags}</b></div>
    <div><span>Embeddings</span><b>${d.embeddings ? d.embeddings.count : 0}</b><em>${d.embeddings ? d.embeddings.model : '—'}</em></div>
  </div>` : '<div class="small-note">Could not read debug stats.</div>';

  if (!window.STATIC_MODE) {
    html += indexHealthHTML();
    const st = S.settingsAi;
    if (!st) {
      html += '<div class="small-note">Loading AI settings…</div>';
    } else {
      const cfg = st.config || {};
      const provider = cfg.provider || st.provider || 'groq';
      const models = st.models || [];
      const model = st.model || cfg.model || '';
      const modelOpts = (models.includes(model) ? models : [model, ...models].filter(Boolean))
        .map((m) => `<option value="${esc(m)}" ${m === model ? 'selected' : ''}>${esc(m)}</option>`).join('');
      const u = st.usage || {};
      const perModel = Object.entries(u.byModel || {}).map(([m, x]) => `${esc(m)}: ${x.calls} calls / ${x.totalTokens} tok`).join(' · ');
      html += `<div class="settings-ai">
        <h3>AI provider</h3>
        <div class="ai-form">
          <label><span>Provider</span><select id="ai-provider">
            <option value="groq" ${provider === 'groq' ? 'selected' : ''}>Groq</option>
            <option value="ollama" ${provider === 'ollama' ? 'selected' : ''}>Ollama</option>
          </select></label>
          <label><span>Model</span><select id="ai-model">${modelOpts}</select></label>
          <button class="btn ghost" data-act="ai-save">Save AI settings</button>
        </div>
        <div class="small-note">${st.available ? 'Online' : esc(st.error || 'Offline')} · ${u.calls || 0} calls · ${u.totalTokens || 0} tokens${perModel ? ' · ' + perModel : ''}</div>
        <div class="small-note">The API key stays in the server environment/Keychain. Switching provider applies immediately.</div>
      </div>`;
    }
  }
  el.innerHTML = html;
}

async function saveAiSettings() {
  const providerEl = $('#ai-provider');
  const modelEl = $('#ai-model');
  if (!providerEl) return;
  const current = (S.settingsAi && (S.settingsAi.config || {}).provider) || (S.settingsAi && S.settingsAi.provider);
  const provider = providerEl.value;
  const model = provider === current && modelEl ? modelEl.value : '';
  try {
    const r = await fetch('/api/ai/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || 'Could not save');
    S.settingsAi = j;
    S.djStatus = j;
    S.djWarmed = false;
    renderSettingsStats();
    if (S.view.type === 'dj') loadDjStatus();
    toast('AI settings saved · ' + (j.model || provider));
  } catch (e) {
    toast(String(e.message || 'Could not save AI settings'));
  }
}

function openSettings() {
  const modal = $('#settings-modal');
  if (!modal) return;
  $('#debug-toggle').checked = S.debug;
  modal.classList.remove('hidden');
  renderSettingsStats();
  loadSettingsStats();
  if (!window.STATIC_MODE) { loadAiSettings(); loadIndexHealth(); }
}

function closeSettings() {
  const modal = $('#settings-modal');
  if (modal) modal.classList.add('hidden');
}

function setDebug(on) {
  S.debug = !!on;
  try { localStorage.setItem('spotifly:debug', S.debug ? '1' : '0'); } catch { /* ignore */ }
  document.body.classList.toggle('debug-mode', S.debug);
  renderSidebar();
  if (!S.debug && S.view.type === 'debug') {
    nav({ type: 'home' });
    toast('Debug mode off');
    return;
  }
  render(false);
  if (S.debug) loadDebug();
  toast(S.debug ? 'Debug mode on' : 'Debug mode off');
}

async function copyDebug() {
  try {
    if (!S.debugData) await loadDebug();
    const text = JSON.stringify(S.debugData, null, 2);
    await navigator.clipboard.writeText(text);
    toast('Debug JSON copied');
  } catch {
    toast('Could not copy debug JSON');
  }
}

function viewLibrary() {
  const tab = S.libTab;
  let content = '';
  if (tab === 'playlists') {
    const rw = rewindIds();
    const cards = [
      navCard('history', 'History', plural(historyIds().length, 'track'), { kind: 'history' }),
      navCard('mostheard', 'Most heard', plural(topTracks('all', 999).length, 'track'), { kind: 'chart' }),
      playlistCard('liked', 'Liked Songs', plural(S.liked.size, 'song'), { kind: 'liked' }),
      playlistCard('onrepeat', 'On Repeat', plural(onRepeatIds().length, 'song'), { kind: 'repeat' }),
      ...(rw.length >= 3 ? [playlistCard('rewind', 'Repeat Rewind', plural(rw.length, 'song'), { kind: 'rewind' })] : []),
      ...S.userPlaylists.map((pl) => playlistCard('user:' + pl.id, pl.name,
        plural(pl.trackIds.length, 'song'), { kind: 'playlist', name: pl.name })),
      ...S.imports.map((pl) => playlistCard('import:' + pl.id, pl.name,
        (pl.source === 'ai' ? 'AI playlist · ' : '') + plural(pl.trackIds.length, 'song') + (pl.counts && pl.counts.missing ? ' · ' + pl.counts.missing + ' missing' : ''),
        pl.source === 'ai' ? { kind: 'ai' } : { kind: 'import', name: pl.name })),
      playlistCard('all', 'All songs', plural(S.tracks.length, 'song'), { kind: 'source', name: 'All songs', hue: 148 }),
      playlistCard('recent', 'Recently added', 'Newest first', { kind: 'source', name: 'Recently added', hue: 200 }),
      ...S.sources.map((s) => playlistCard('src:' + s.name, s.name, plural(s.count, 'song'), { kind: 'source', label: 'Playlist', name: s.name, hue: hue(s.name) })),
      ...S.mixes.map((m) => playlistCard(m.key, m.name, m.desc, { kind: 'mix', desc: m.desc, hue: m.hue })),
    ];
    content = `<div class="card-grid">${cards.join('')}</div>`;
  } else if (tab === 'albums') {
    content = `<div class="card-grid">${S.albums.map(albumCard).join('')}</div>`;
  } else {
    const names = S.artists.filter((a) => !/^unknown artist$/i.test(a));
    content = `<div class="card-grid">${names.map(artistCard).join('')}</div>`;
  }

  return `<div class="view-inner">
    <div class="section library-top">
      <div class="greeting">Your Library</div>
      <div class="lib-head-actions">
        <button class="btn ghost" data-act="open-ai-playlist">AI playlist</button>
        <button class="btn ghost" data-act="new-playlist">New playlist</button>
        ${window.STATIC_MODE ? '' : `<button class="btn ghost" data-act="start-embed">Embed library</button>
        <button class="btn ghost" data-act="start-tags">Tag library</button>
        <button class="btn ghost" data-act="start-audio-tags">Audio labels</button>
        <button class="btn ghost" data-act="open-import">Import playlist</button>`}
      </div>
    </div>
    <div class="tabs">
      <button class="tab ${tab === 'playlists' ? 'active' : ''}" data-act="lib-tab" data-tab="playlists">Playlists</button>
      <button class="tab ${tab === 'albums' ? 'active' : ''}" data-act="lib-tab" data-tab="albums">Albums</button>
      <button class="tab ${tab === 'artists' ? 'active' : ''}" data-act="lib-tab" data-tab="artists">Artists</button>
    </div>
    <div class="section">${content}</div>
    <div class="section"><div class="small-note">${S.tracks.length} songs · ${S.albums.length} albums · ${S.statsHours || 0}h of music${S.lib && S.lib.generatedAt ? ' · scanned ' + fmtDate(S.lib.generatedAt) : ''}</div>
    ${window.STATIC_MODE ? '' : indexHealthHTML()}
    ${S.tagsStatus ? `<div class="small-note">AI tags: ${S.tagsStatus.count || 0}/${S.tracks.length}${S.tagsStatus.running ? ' · tagging ' + (S.tagsStatus.done || 0) + '/' + (S.tagsStatus.total || S.tracks.length) + '…' : ''}</div>` : ''}
    ${S.embedStatus ? `<div class="small-note">Semantic index: ${S.embedStatus.count || 0}/${S.tracks.length}${S.embedStatus.running ? ' · embedding ' + (S.embedStatus.done || 0) + '/' + (S.embedStatus.total || S.tracks.length) + '…' : S.embedStatus.exists ? ' · ready' : ''}</div>` : ''}
    ${S.audioStatus ? `<div class="small-note">Audio labels: ${S.audioStatus.count || 0}/${S.tracks.length}${S.audioStatus.running ? ' · labeling ' + (S.audioStatus.done || 0) + '/' + (S.audioStatus.total || S.tracks.length) + '…' : ' · ready'}</div>` : ''}</div>
  </div>`;
}

/* ---------- render ---------- */

function render(resetScroll = false) {
  const v = S.view;
  let html = '';
  if (v.type === 'search') html = viewSearch();
  else if (v.type === 'library') html = viewLibrary();
  else if (v.type === 'dj') html = viewDj();
  else if (v.type === 'history') html = viewHistory();
  else if (v.type === 'mostheard') html = viewMostHeard();
  else if (v.type === 'debug') html = viewDebug();
  else if (v.type === 'playlist') html = viewPlaylist(v.key);
  else if (v.type === 'album') html = viewAlbum(v.id);
  else html = viewHome();

  $('#view').innerHTML = html;
  renderSidebar();
  updateNavButtons();
  updatePlayer();
  renderQueue();
  if (resetScroll) {
    const main = $('#main');
    main.scrollTop = 0;
    $('#topbar').classList.remove('scrolled');
  }
  markCurrentRows();
}

function renderSidebar() {
  const list = $('#lib-list');
  const scroll = list.scrollTop;
  const v = S.view;
  let html = '';
  const item = (key, name, sub, cover, extraCls = '') => {
    const active = v.type === 'playlist' && v.key === key;
    return `<button class="lib-item ${active ? 'active' : ''} ${extraCls}" data-act="open-playlist" data-key="${attr(key)}">
      ${coverHTML(cover)}
      <div class="li-meta"><div class="li-name">${esc(name)}</div><div class="li-sub">${esc(sub)}</div></div>
    </button>`;
  };

  html += item('liked', 'Liked Songs', plural(S.liked.size, 'song'), { kind: 'liked' });
  html += item('onrepeat', 'On Repeat', plural(onRepeatIds().length, 'song'), { kind: 'repeat' });
  {
    const rw = rewindIds();
    if (rw.length) html += item('rewind', 'Repeat Rewind', plural(rw.length, 'song'), { kind: 'rewind' });
  }
  html += item('all', 'All songs', plural(S.tracks.length, 'song'), { kind: 'artist', name: 'All songs' });
  html += item('recent', 'Recently added', 'Newest first', { kind: 'artist', name: 'Recently added' });

  const navItem = (view, name, sub, cover) => {
    const active = v.type === view;
    return `<button class="lib-item ${active ? 'active' : ''}" data-act="nav" data-view="${view}">
      ${coverHTML(cover)}
      <div class="li-meta"><div class="li-name">${esc(name)}</div><div class="li-sub">${esc(sub)}</div></div>
    </button>`;
  };
  html += `<div class="lib-divider">Your listening</div>`;
  html += navItem('history', 'History', plural(historyIds().length, 'track'), { kind: 'history' });
  html += navItem('mostheard', 'Most heard', plural(topTracks('all', 999).length, 'track'), { kind: 'chart' });
  if (S.debug) html += navItem('debug', 'Debug', 'labels & retrieval', { kind: 'debug' });

  for (const s of S.sources) {
    html += item('src:' + s.name, s.name, plural(s.count, 'song'), { kind: 'artist', name: s.name });
  }

  if (S.userPlaylists.length) {
    html += `<div class="lib-divider">Your playlists</div>`;
    for (const pl of S.userPlaylists) {
      html += item('user:' + pl.id, pl.name, plural(pl.trackIds.length, 'song'), { kind: 'playlist', name: pl.name });
    }
  }

  const aiPls = S.imports.filter((p) => p.source === 'ai');
  const extPls = S.imports.filter((p) => p.source !== 'ai');
  if (aiPls.length) {
    html += `<div class="lib-divider">AI playlists</div>`;
    for (const pl of aiPls) {
      html += item('import:' + pl.id, pl.name, plural(pl.trackIds.length, 'song'), { kind: 'ai' });
    }
  }
  if (extPls.length) {
    html += `<div class="lib-divider">Imported</div>`;
    for (const pl of extPls) {
      const missing = pl.counts && pl.counts.missing ? ' · ' + pl.counts.missing + ' missing' : '';
      html += item('import:' + pl.id, pl.name, plural(pl.trackIds.length, 'song') + missing, { kind: 'import', name: pl.name });
    }
  }

  html += `<div class="lib-divider">Albums</div>`;
  for (const a of S.albums.slice(0, 30)) {
    const active = v.type === 'album' && v.id === a.id;
    html += `<button class="lib-item ${active ? 'active' : ''}" data-act="open-album" data-id="${a.id}">
      ${albumArt(a)}
      <div class="li-meta"><div class="li-name">${esc(a.name)}</div><div class="li-sub">${esc(a.artist)}</div></div>
    </button>`;
  }

  list.innerHTML = html;
  list.scrollTop = scroll;

  $('#nav-home').classList.toggle('active', v.type === 'home');
  $('#nav-search').classList.toggle('active', v.type === 'search');
  const navDj = $('#nav-dj');
  if (navDj) navDj.classList.toggle('active', v.type === 'dj');
}

function updateNavButtons() {
  $('#btn-back').disabled = S.hi <= 0;
  $('#btn-forward').disabled = S.hi >= S.hist.length - 1;
}

function markCurrentRows() {
  for (const row of $$('.trk')) {
    const cur = row.dataset.id === S.currentId;
    row.classList.toggle('playing', cur);
    row.classList.toggle('paused', cur && !S.playing);
    if (cur) {
      const idx = row.querySelector('.idx-num');
      if (idx) idx.innerHTML = ICON.eq;
    } else {
      const idx = row.querySelector('.idx-num');
      if (idx) idx.innerHTML = row.dataset.index || '';
    }
  }
  updateDjHighlight();
}

/* ---------- navigation ---------- */

function serializeView(v) {
  if (!v) return '';
  if (v.type === 'album') return 'album=' + v.id;
  if (v.type === 'playlist') return 'playlist=' + encodeURIComponent(v.key);
  if (v.type === 'library') return 'library';
  if (v.type === 'history') return 'history';
  if (v.type === 'mostheard') return 'mostheard';
  if (v.type === 'debug') return 'debug';
  if (v.type === 'dj') return 'dj';
  if (v.type === 'search') return S.query.trim() ? 'search=' + encodeURIComponent(S.query) : 'search';
  return '';
}

function parseHash() {
  const h = (location.hash || '').replace(/^#/, '');
  if (!h) return { type: 'home' };
  if (h.startsWith('album=')) return { type: 'album', id: h.slice(6) };
  if (h.startsWith('playlist=')) return { type: 'playlist', key: decodeURIComponent(h.slice(9)) };
  if (h === 'library') return { type: 'library' };
  if (h === 'history') return { type: 'history' };
  if (h === 'mostheard') return { type: 'mostheard' };
  if (h === 'debug') return { type: 'debug' };
  if (h === 'dj') return { type: 'dj' };
  if (h.startsWith('search=')) return { type: 'search', q: decodeURIComponent(h.slice(7)) };
  if (h === 'search') return { type: 'search' };
  return { type: 'home' };
}

function nav(view, opts = {}) {
  const same = JSON.stringify(view) === JSON.stringify(S.view);
  if (opts.replace) {
    S.hist[S.hi] = view;
  } else if (!same) {
    S.hist = S.hist.slice(0, S.hi + 1);
    S.hist.push(view);
    S.hi = S.hist.length - 1;
  }
  S.view = view;
  const h = serializeView(view);
  try {
    if (h) history.replaceState(null, '', '#' + h);
    else history.replaceState(null, '', location.pathname + location.search);
  } catch { /* ignore */ }
  render(true);
  if (view.type === 'dj') loadDjStatus();
  if (view.type === 'debug') loadDebug();
}

function syncHash() {
  const h = serializeView(S.view);
  try {
    if (h) history.replaceState(null, '', '#' + h);
    else history.replaceState(null, '', location.pathname + location.search);
  } catch { /* ignore */ }
}

function goBack() {
  if (S.hi <= 0) return;
  S.hi--;
  S.view = S.hist[S.hi];
  syncHash();
  render(true);
}

function goForward() {
  if (S.hi >= S.hist.length - 1) return;
  S.hi++;
  S.view = S.hist[S.hi];
  syncHash();
  render(true);
}

/* ---------- playback ---------- */

function playIds(ids, startId, ctxKey) {
  if (!ids || !ids.length) { toast('Nothing to play here'); return; }
  const start = startId && ids.includes(startId) ? startId : ids[0];
  S.ctxKey = ctxKey || null;
  if (S.shuffle) {
    const rest = ids.filter((x) => x !== start);
    shuffleArr(rest);
    S.queue = [start].concat(rest);
    S.qIndex = 0;
  } else {
    S.queue = ids.slice();
    S.qIndex = S.queue.indexOf(start);
    if (S.qIndex < 0) S.qIndex = 0;
  }
  loadCurrent(true);
}

function playContext(key, startId) {
  if (key !== 'dj') endDj(true);
  const c = contextInfo(key);
  if (!c) return;
  if (!c.ids.length) { toast('Nothing to play here'); return; }
  S.ctxKey = key;
  playIds(c.ids, startId || c.ids[0], key);
}

function currentTrack() {
  return S.currentId ? S.trackById.get(S.currentId) : null;
}

function loadCurrent(autoplay) {
  const id = S.queue[S.qIndex];
  const t = S.trackById.get(id);
  if (!t) return;
  const prevId = S.currentId;
  if (prevId && prevId !== id) {
    const played = S.audio.currentTime || 0;
    if (played > 5 && played < 25) bumpFeedbackSkip(prevId);
  }
  S.currentId = id;
  S.pendingCount = !!autoplay;
  S.audio.src = window.LOCAL_MEDIA ? window.LOCAL_MEDIA.mediaUrl(id) : '/api/stream/' + id;
  S.audio.load();
  S.audio.volume = S.muted ? 0 : S.volume;
  if (autoplay) {
    const p = S.audio.play();
    if (p && p.catch) p.catch(() => toast('Could not play this file'));
  }
  updatePlayer();
  markCurrentRows();
  updateMediaSession();
  updateDjHighlight();
  document.title = `${t.title} • ${t.artist}`;
  if (S.queueOpen) renderQueue();
  maybeExtendDj();
}

function togglePlay() {
  if (!S.currentId) {
    const first = contextInfo('all');
    if (first && first.ids.length) playIds(first.ids, first.ids[0], 'all');
    return;
  }
  if (S.audio.paused) {
    const p = S.audio.play();
    if (p && p.catch) p.catch(() => toast('Could not play this file'));
  } else {
    S.audio.pause();
  }
}

function nextTrack(auto = false) {
  if (!S.queue.length) return;
  if (S.qIndex < S.queue.length - 1) {
    S.qIndex++;
    loadCurrent(true);
  } else if (S.dj.active) {
    addLocalDjPicks(6);
    if (S.qIndex < S.queue.length - 1) {
      S.qIndex++;
      loadCurrent(true);
    }
    extendDjQueue();
  } else if (S.repeat === 'all' || (!auto && S.queue.length > 1)) {
    S.qIndex = 0;
    loadCurrent(true);
  } else {
    S.audio.pause();
    S.audio.currentTime = 0;
    paintProgress(0);
  }
}

function prevTrack() {
  if (!S.queue.length) return;
  if (S.audio.currentTime > 3) { S.audio.currentTime = 0; return; }
  if (S.qIndex > 0) S.qIndex--;
  else if (S.repeat === 'all') S.qIndex = S.queue.length - 1;
  else { S.audio.currentTime = 0; return; }
  loadCurrent(true);
}

function onEnded() {
  const t = currentTrack();
  if (!t) return;
  if (S.repeat === 'one') {
    S.audio.currentTime = 0;
    S.audio.play().catch(() => {});
    return;
  }
  if (S.qIndex < S.queue.length - 1) {
    S.qIndex++;
    loadCurrent(true);
    return;
  }
  if (S.dj.active) {
    addLocalDjPicks(6);
    if (S.qIndex < S.queue.length - 1) {
      S.qIndex++;
      loadCurrent(true);
    }
    extendDjQueue();
    return;
  }
  if (S.repeat === 'all') {
    S.qIndex = 0;
    loadCurrent(true);
  } else {
    S.playing = false;
    updatePlayIcons();
    markCurrentRows();
    paintProgress(1);
  }
}

function toggleShuffle() {
  S.shuffle = !S.shuffle;
  localStorage.setItem('spotifly:shuffle', S.shuffle ? '1' : '0');
  if (S.queue.length) {
    const cur = S.queue[S.qIndex];
    if (S.shuffle) {
      const rest = S.queue.filter((id) => id !== cur);
      shuffleArr(rest);
      S.queue = [cur].concat(rest);
    } else if (S.ctxKey) {
      const c = contextInfo(S.ctxKey);
      if (c) S.queue = c.ids.slice();
      else S.queue = [cur];
    }
    S.qIndex = Math.max(0, S.queue.indexOf(cur));
  }
  updatePlayer();
  if (S.queueOpen) renderQueue();
}

function cycleRepeat() {
  S.repeat = S.repeat === 'off' ? 'all' : S.repeat === 'all' ? 'one' : 'off';
  localStorage.setItem('spotifly:repeat', S.repeat);
  updatePlayer();
}

function toggleLike(id) {
  if (!id) return;
  const was = S.liked.has(id);
  if (was) S.liked.delete(id); else S.liked.add(id);
  localStorage.setItem('spotifly:liked', JSON.stringify([...S.liked]));
  updateLikeUI();
  if (S.view.type === 'playlist' && S.view.key === 'liked') render(false);
  renderSidebar();
  updatePlayer();
  toast(was ? 'Removed from Liked Songs' : 'Added to Liked Songs');
}

function updateLikeUI() {
  for (const b of $$('.row-like')) {
    b.classList.toggle('liked', S.liked.has(b.dataset.id));
  }
  const np = $('#np-like');
  if (np) np.classList.toggle('liked', S.currentId ? S.liked.has(S.currentId) : false);
  const likedRow = $('.action-icon[data-act="like-current"]');
  if (likedRow) likedRow.classList.toggle('liked', S.currentId ? S.liked.has(S.currentId) : false);
}

/* ---------- player UI ---------- */

function paintBar(bar, ratio) {
  const pct = Math.max(0, Math.min(100, ratio * 100));
  const fill = bar.querySelector('.fill');
  const knob = bar.querySelector('.knob');
  if (fill) fill.style.width = pct + '%';
  if (knob) knob.style.left = pct + '%';
}

function paintProgress(ratio) {
  const bar = $('#seek');
  if (!bar) return;
  paintBar(bar, ratio);
  const dur = S.audio.duration || (currentTrack() ? currentTrack().duration : 0);
  $('#t-cur').textContent = fmtTime((ratio || 0) * dur);
  $('#t-dur').textContent = fmtTime(dur);
}

function setupBar(bar, onRatio) {
  let dragging = false;
  const apply = (e) => {
    const r = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    paintBar(bar, ratio);
    onRatio(ratio);
  };
  bar.addEventListener('pointerdown', (e) => {
    dragging = true;
    bar.classList.add('dragging');
    bar.setPointerCapture(e.pointerId);
    apply(e);
  });
  bar.addEventListener('pointermove', (e) => { if (dragging) apply(e); });
  const end = () => { dragging = false; bar.classList.remove('dragging'); };
  bar.addEventListener('pointerup', end);
  bar.addEventListener('pointercancel', end);
}

function updatePlayIcons() {
  const icon = $('#play-icon');
  if (!icon) return;
  icon.innerHTML = S.playing ? ICON.pause : ICON.play;
  icon.classList.toggle('play-nudge', !S.playing);
  $('#btn-play').title = S.playing ? 'Pause' : 'Play';
}

function updatePlayer() {
  const t = currentTrack();
  const a = t ? S.albumById.get(t.albumId) : null;
  const art = $('#np-art');
  if (t) {
    const artSrc = a && a.art ? (window.LOCAL_MEDIA ? window.LOCAL_MEDIA.artUrl(a.id) : '/api/art/' + a.id) : '';
    if (a && a.art && artSrc) {
      art.style.backgroundImage = `url("${artSrc}")`;
      art.style.background = `center / cover no-repeat url("${artSrc}")`;
      art.innerHTML = '';
    } else {
      art.style.background = `linear-gradient(145deg, hsl(${hue((a ? a.name : '') + (t ? t.artist : ''))}, 50%, 32%), hsl(${hue((t ? t.title : '') + 'x')}, 45%, 16%))`;
      art.innerHTML = `<span style="font-weight:800;color:#ffffffcc">${esc(initials(t ? t.title : '♪'))}</span>`;
    }
    $('#np-title').textContent = t.title;
    $('#np-title').title = t.title;
    $('#np-artist').textContent = t.artist;
    $('#np-artist').title = t.artist;
    $('#np-like').classList.toggle('liked', S.liked.has(t.id));
  } else {
    art.style.background = '#242424';
    art.style.backgroundImage = '';
    art.innerHTML = ICON.volume;
    $('#np-title').textContent = 'Nothing playing';
    $('#np-artist').textContent = 'Pick a song to start';
    $('#np-like').classList.remove('liked');
  }
  $('#np-like').style.visibility = t ? 'visible' : 'hidden';

  updatePlayIcons();
  $('#btn-shuffle').classList.toggle('on', S.shuffle);
  const rep = $('#btn-repeat');
  rep.classList.toggle('on', S.repeat !== 'off');
  rep.classList.toggle('one', S.repeat === 'one');
  rep.title = S.repeat === 'one' ? 'Repeat one' : S.repeat === 'all' ? 'Repeat all' : 'Repeat off';

  const dur = S.audio.duration || (t ? t.duration : 0);
  $('#t-dur').textContent = fmtTime(dur);
  $('#t-cur').textContent = fmtTime(S.audio.currentTime || 0);
  paintBar($('#seek'), dur ? (S.audio.currentTime || 0) / dur : 0);
  paintBar($('#vol'), S.muted ? 0 : S.volume);
  $('#vol-icon').innerHTML = S.muted || S.volume === 0 ? ICON.mute : ICON.volume;
  $('#btn-mute').title = S.muted ? 'Unmute' : 'Mute';
}

function updateMediaSession() {
  if (!('mediaSession' in navigator)) return;
  const t = currentTrack();
  if (!t) return;
  const a = S.albumById.get(t.albumId);
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: t.title,
      artist: t.artist,
      album: t.album,
      artwork: (() => {
        const artSrc = a && a.art ? (window.LOCAL_MEDIA ? window.LOCAL_MEDIA.artUrl(a.id) : '/api/art/' + a.id) : '';
        return artSrc ? [{ src: artSrc, sizes: '640x640', type: 'image/jpeg' }] : [];
      })(),
    });
  } catch { /* ignore */ }
}

/* ---------- queue ---------- */

function renderQueue() {
  const drawer = $('#queue-drawer');
  drawer.classList.toggle('hidden', !S.queueOpen);
  if (!S.queueOpen) return;
  const list = $('#q-list');
  if (!S.queue.length) {
    list.innerHTML = '<div class="q-empty">Queue is empty. Play something to fill it.</div>';
    return;
  }
  list.innerHTML = S.queue.map((id, i) => {
    const t = S.trackById.get(id);
    if (!t) return '';
    const a = S.albumById.get(t.albumId);
    return `<button class="q-item ${id === S.currentId ? 'current' : ''}" data-act="play-queue" data-index="${i}">
      ${albumArt(a)}
      <div class="qi-meta"><div class="qi-title">${esc(t.title)}</div><div class="qi-artist">${esc(t.artist)}</div></div>
    </button>`;
  }).join('');
  const cur = $('.q-item.current');
  if (cur) cur.scrollIntoView({ block: 'nearest' });
}

function toggleQueue() {
  S.queueOpen = !S.queueOpen;
  renderQueue();
}

/* ---------- library load ---------- */

async function loadImports() {
  try {
    const r = await fetch('/api/imports?ts=' + Date.now());
    const j = await r.json();
    S.imports = Array.isArray(j.playlists) ? j.playlists : [];
  } catch {
    S.imports = [];
  }
}

async function loadEmbedStatus() {
  try {
    const r = await fetch('/api/embeddings/status?ts=' + Date.now());
    S.embedStatus = await r.json();
  } catch {
    S.embedStatus = null;
  }
}

async function pollEmbeds() {
  clearTimeout(S.embedTimer);
  S.embedTimer = null;
  const wasRunning = !!(S.embedStatus && S.embedStatus.running);
  await loadEmbedStatus();
  if (S.view.type === 'library') render(false);
  if (S.embedStatus && S.embedStatus.running) {
    S.embedTimer = setTimeout(pollEmbeds, 3000);
  } else if (wasRunning && S.embedStatus && S.embedStatus.exists) {
    toast('Semantic index ready — the DJ now shortlists songs');
    await loadLibrary();
  }
}

async function startEmbeddings(quiet) {
  try {
    const res = await fetch('/api/embeddings/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    const j = await res.json();
    if (!res.ok) {
      if (!quiet) toast(j.error || 'Could not start embedding');
      return;
    }
    if (!quiet) toast('Building the semantic index — this takes a few seconds');
    await loadEmbedStatus();
    if (S.view.type === 'library') render(false);
    pollEmbeds();
  } catch {
    if (!quiet) toast('Could not start embedding');
  }
}

async function loadAudioStatus() {
  try {
    const r = await fetch('/api/audio-tags/status?ts=' + Date.now());
    S.audioStatus = await r.json();
  } catch {
    S.audioStatus = null;
  }
}

async function pollAudio() {
  clearTimeout(S.audioTimer);
  S.audioTimer = null;
  const wasRunning = !!(S.audioStatus && S.audioStatus.running);
  await loadAudioStatus();
  if (S.view.type === 'library') render(false);
  if (S.audioStatus && S.audioStatus.running) {
    S.audioTimer = setTimeout(pollAudio, 5000);
  } else if (wasRunning) {
    toast('Audio labels ready — refreshing library');
    await loadLibrary();
  }
}

async function startAudioTags() {
  try {
    const res = await fetch('/api/audio-tags/start', { method: 'POST' });
    const j = await res.json();
    if (!res.ok) { toast(j.error || 'Could not start audio labeling'); return; }
    toast('Audio labeling started in the background');
    await loadAudioStatus();
    if (S.view.type === 'library') render(false);
    pollAudio();
  } catch {
    toast('Could not start audio labeling');
  }
}

async function loadTagsStatus() {
  try {
    const r = await fetch('/api/tags/status?ts=' + Date.now());
    S.tagsStatus = await r.json();
  } catch {
    S.tagsStatus = null;
  }
}

async function pollTags() {
  clearTimeout(S.tagTimer);
  S.tagTimer = null;
  const wasRunning = !!(S.tagsStatus && S.tagsStatus.running);
  await loadTagsStatus();
  if (S.view.type === 'library') render(false);
  if (S.tagsStatus && S.tagsStatus.running) {
    S.tagTimer = setTimeout(pollTags, 5000);
  } else if (wasRunning) {
    toast('Tagging finished — refreshing library');
    await loadLibrary();
    const st = S.embedStatus;
    if (st && st.count < S.tracks.length) startEmbeddings(true);
  }
}

async function startTagging() {
  try {
    const res = await fetch('/api/tags/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    const j = await res.json();
    if (!res.ok) { toast(j.error || 'Could not start tagging'); return; }
    toast('Tagging started — it runs in the background');
    await loadTagsStatus();
    if (S.view.type === 'library') render(false);
    pollTags();
  } catch {
    toast('Could not start tagging');
  }
}

async function loadLibrary() {
  const res = await fetch('/api/library?ts=' + Date.now());
  const lib = await res.json();
  S.lib = lib;
  S.tracks = lib.tracks || [];
  S.albums = lib.albums || [];
  S.artists = lib.artists || [];
  S.statsHours = lib.stats ? lib.stats.hours : 0;
  S.trackById = new Map(S.tracks.map((t) => [t.id, t]));
  S.albumById = new Map(S.albums.map((a) => [a.id, a]));

  const valid = new Set(S.tracks.map((t) => t.id));
  S.liked = new Set([...S.liked].filter((id) => valid.has(id)));
  S.plays = Object.fromEntries(Object.entries(S.plays).filter(([id]) => valid.has(id)));
  S.userPlaylists = S.userPlaylists.map((pl) => ({ ...pl, trackIds: (pl.trackIds || []).filter((id) => valid.has(id)) }));
  S.history = S.history.filter((h) => valid.has(h.id)).slice(0, 1000);
  S.djFeedback.tracks = Object.fromEntries(Object.entries(S.djFeedback.tracks).filter(([id]) => valid.has(id)));
  S.djFeedback.never = S.djFeedback.never.filter((id) => valid.has(id));

  let seeded = new Set();
  try { seeded = new Set(JSON.parse(localStorage.getItem('spotifly:likedSeed') || '[]')); } catch { /* ignore */ }
  let changed = false;
  for (const t of S.tracks) {
    const inLikedFolder = t.source === 'Liked Songs' || (t.folders && t.folders.includes('Liked Songs'));
    if (inLikedFolder && !seeded.has(t.id)) {
      S.liked.add(t.id);
      seeded.add(t.id);
      changed = true;
    }
  }
  if (changed) {
    localStorage.setItem('spotifly:liked', JSON.stringify([...S.liked]));
    localStorage.setItem('spotifly:likedSeed', JSON.stringify([...seeded]));
  }
  if (S.dj.tracks.length) {
    S.dj.tracks = S.dj.tracks.filter((seg) => S.trackById.has(seg.id));
    S.dj.lines = Object.fromEntries(Object.entries(S.dj.lines).filter(([id]) => S.trackById.has(id)));
  }

  buildSources();
  buildMixes();
  await loadImports();
  await loadTagsStatus();
  await loadEmbedStatus();
  await loadAudioStatus();
  if (S.tagsStatus && S.tagsStatus.running) {
    clearTimeout(S.tagTimer);
    S.tagTimer = setTimeout(pollTags, 5000);
  }
  if (S.embedStatus && S.embedStatus.running) {
    clearTimeout(S.embedTimer);
    S.embedTimer = setTimeout(pollEmbeds, 3000);
  }
  if (S.audioStatus && S.audioStatus.running) {
    clearTimeout(S.audioTimer);
    S.audioTimer = setTimeout(pollAudio, 5000);
  }

  if (S.view.type === 'album' && !S.albumById.has(S.view.id)) S.view = { type: 'home' };
  if (S.view.type === 'playlist' && !contextInfo(S.view.key)) S.view = { type: 'home' };
  if (S.currentId && !S.trackById.has(S.currentId)) {
    S.currentId = null;
    S.queue = [];
    S.qIndex = -1;
    S.audio.pause();
    S.audio.removeAttribute('src');
  }
  render(true);
  if (!window.STATIC_MODE) loadIndexHealth();
}

function openAiPlaylistModal() {
  const modal = $('#ai-playlist-modal');
  if (!modal) return;
  $('#ai-playlist-prompt').value = '';
  $('#ai-playlist-run').disabled = false;
  $('#ai-playlist-run').textContent = 'Create';
  $('#ai-playlist-result').innerHTML = '';
  modal.classList.remove('hidden');
  setTimeout(() => { try { $('#ai-playlist-prompt').focus(); } catch { /* ignore */ } }, 30);
}

function closeAiPlaylistModal() {
  const modal = $('#ai-playlist-modal');
  if (modal) modal.classList.add('hidden');
}

async function runAiPlaylist() {
  const input = $('#ai-playlist-prompt');
  const promptText = input.value.trim();
  if (!promptText) { toast('Describe the playlist first'); input.focus(); return; }
  const btn = $('#ai-playlist-run');
  const result = $('#ai-playlist-result');
  btn.disabled = true;
  btn.textContent = 'Creating…';
  result.innerHTML = '<div class="small-note">The AI model is picking tracks…</div>';
  try {
    const res = await fetch('/api/playlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptText, feedback: S.djFeedback }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(j.error || 'Could not create playlist');
    await loadImports();
    closeAiPlaylistModal();
    nav({ type: 'playlist', key: 'import:' + j.playlist.id });
    toast('Created “' + j.playlist.name + '” · ' + j.playlist.trackIds.length + ' songs');
  } catch (e) {
    result.innerHTML = `<div class="import-error">${esc(e.message || 'Could not create playlist')}</div>`;
    btn.disabled = false;
    btn.textContent = 'Create';
  }
}

function openImportModal() {
  const modal = $('#import-modal');
  if (!modal) return;
  S.importFile = null;
  $('#import-name').value = '';
  $('#import-file').value = '';
  $('#import-file-label').textContent = 'Choose a CSV file';
  $('#import-run').disabled = true;
  $('#import-run').textContent = 'Import';
  $('#import-result').innerHTML = '';
  modal.classList.remove('hidden');
  setTimeout(() => { try { $('#import-name').focus(); } catch { /* ignore */ } }, 30);
}

function closeImportModal() {
  const modal = $('#import-modal');
  if (modal) modal.classList.add('hidden');
}

function importResultHTML(pl) {
  const miss = pl.missing || [];
  return `<div class="import-summary">Matched <b>${pl.counts.matched}</b> of <b>${pl.counts.total}</b> tracks${miss.length ? ` · <b>${miss.length}</b> missing` : ' · everything found'}</div>
    ${miss.length ? `<div class="missing-list">${miss.slice(0, 40).map((m) => `<div class="missing-row"><span>${esc(m.title)}</span><em>${esc(m.artists)}</em></div>`).join('')}${miss.length > 40 ? `<div class="small-note" style="padding:8px 10px">+ ${miss.length - 40} more</div>` : ''}</div>` : ''}
    <div class="modal-actions">
      ${miss.length ? `<button class="btn ghost" data-act="copy-missing" data-id="${pl.id}">Copy missing</button>` : ''}
      <button class="btn green" data-act="open-imported" data-id="${pl.id}">Open playlist</button>
    </div>`;
}

async function runImport() {
  const file = S.importFile;
  if (!file) return;
  const btn = $('#import-run');
  const result = $('#import-result');
  const nameInput = $('#import-name');
  const name = (nameInput && nameInput.value.trim()) || file.name.replace(/\.csv$/i, '').replace(/[_-]+/g, ' ').trim() || 'Imported playlist';
  btn.disabled = true;
  btn.textContent = 'Importing…';
  result.innerHTML = '';
  try {
    const csv = await file.text();
    const res = await fetch('/api/import/spotify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, csv }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(j.error || 'Import failed');
    await loadImports();
    render(false);
    result.innerHTML = importResultHTML(j.playlist);
    btn.textContent = 'Import';
    btn.disabled = false;
  } catch (e) {
    result.innerHTML = `<div class="import-error">${esc(e.message || 'Import failed')}</div>`;
    btn.textContent = 'Import';
    btn.disabled = false;
  }
}

async function copyMissing(id) {
  const pl = S.imports.find((x) => x.id === id);
  if (!pl || !pl.missing || !pl.missing.length) { toast('No missing tracks'); return; }
  const text = pl.missing.map((m) => `${m.artists} – ${m.title}`).join('\n');
  try {
    await navigator.clipboard.writeText(text);
    toast(`Copied ${pl.missing.length} missing tracks`);
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      toast(`Copied ${pl.missing.length} missing tracks`);
    } catch { toast('Could not copy'); }
  }
}

async function deleteImport(id) {
  const pl = S.imports.find((x) => x.id === id);
  if (!pl) return;
  if (!window.confirm(`Remove “${pl.name}” from your library?`)) return;
  try { await fetch('/api/imports/' + id, { method: 'DELETE' }); } catch { /* ignore */ }
  await loadImports();
  if (S.view.type === 'playlist' && S.view.key === 'import:' + id) nav({ type: 'library' });
  else render(false);
  toast('Imported playlist removed');
}

async function rescan(btn) {
  if (btn && btn.disabled) return;
  if (btn) btn.disabled = true;
  toast('Scanning for music…', 120000);
  try {
    const res = await fetch('/api/rescan', { method: 'POST' });
    const j = await res.json();
    if (j.ok) {
      await loadLibrary();
      if (!window.STATIC_MODE) setTimeout(loadIndexHealth, 1500);
      toast(`Library updated · ${S.tracks.length} tracks · ${S.albums.length} albums`);
    } else {
      toast(j.error || 'Scan failed');
    }
  } catch {
    toast('Scan failed');
  } finally {
    if (btn) btn.disabled = false;
  }
}

/* ---------- events ---------- */

function bindAudio() {
  const audio = S.audio;
  audio.addEventListener('play', () => {
    S.playing = true;
    if (S.pendingCount && S.currentId) { S.pendingCount = false; bumpPlay(S.currentId); }
    maybeSpeakDjLine(S.currentId);
    updatePlayIcons();
    markCurrentRows();
  });
  audio.addEventListener('pause', () => {
    S.playing = false;
    if (S.dj.active) cancelSpeech();
    updatePlayIcons();
    markCurrentRows();
  });
  audio.addEventListener('timeupdate', () => {
    if (S.seeking) return;
    const d = audio.duration || (currentTrack() ? currentTrack().duration : 0);
    const ratio = d ? audio.currentTime / d : 0;
    paintProgress(ratio);
    $('#t-cur').textContent = fmtTime(audio.currentTime);
    $('#t-dur').textContent = fmtTime(d);
  });
  audio.addEventListener('loadedmetadata', () => { updatePlayer(); });
  audio.addEventListener('ended', onEnded);
  audio.addEventListener('error', () => { if (audio.src) toast('Could not play this file'); });

  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.setActionHandler('play', () => audio.play());
      navigator.mediaSession.setActionHandler('pause', () => audio.pause());
      navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
      navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack(false));
      navigator.mediaSession.setActionHandler('seekto', (d) => {
        if (d.seekTime != null) audio.currentTime = d.seekTime;
      });
    } catch { /* ignore */ }
  }
}

function bindBars() {
  setupBar($('#seek'), (ratio) => {
    S.seeking = true;
    const d = S.audio.duration || (currentTrack() ? currentTrack().duration : 0);
    if (d) {
      S.audio.currentTime = ratio * d;
      $('#t-cur').textContent = fmtTime(ratio * d);
      $('#t-dur').textContent = fmtTime(d);
    }
    setTimeout(() => { S.seeking = false; }, 60);
  });
  setupBar($('#vol'), (ratio) => {
    S.volume = ratio;
    S.muted = ratio === 0;
    S.audio.volume = ratio;
    localStorage.setItem('spotifly:volume', String(ratio));
    $('#vol-icon').innerHTML = S.muted ? ICON.mute : ICON.volume;
    paintBar($('#vol'), ratio);
  });
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;

  if (act === 'nav') {
    nav({ type: el.dataset.view || 'home' });
    return;
  }
  if (act === 'back') { goBack(); return; }
  if (act === 'forward') { goForward(); return; }
  if (act === 'search-filter') { S.searchFilter = el.dataset.filter || 'all'; render(false); return; }
  if (act === 'search-semantic') { runSemanticSearch(); return; }
  if (act === 'stats-tab') { S.statsTab = el.dataset.tab || 'tracks'; render(false); return; }
  if (act === 'stats-range') { S.statsRange = el.dataset.range === 'month' ? 'month' : 'all'; render(false); return; }
  if (act === 'clear-history') { clearHistory(); return; }
  if (act === 'reset-stats') { resetStats(); return; }
  if (act === 'save-queue') { saveQueueAsPlaylist(); return; }
  if (act === 'clear-queue') { clearQueue(); return; }
  if (act === 'row-menu') { openRowMenu(el, el.dataset.id, decodeURIComponent(el.dataset.ctx || '')); return; }
  if (act === 'menu-queue') { if (S.rowMenu) { addToQueue(S.rowMenu.id); closeRowMenu(); } return; }
  if (act === 'menu-next') { if (S.rowMenu) { playNext(S.rowMenu.id); closeRowMenu(); } return; }
  if (act === 'menu-like') { if (S.rowMenu) { toggleLike(S.rowMenu.id); closeRowMenu(); } return; }
  if (act === 'menu-add') { if (S.rowMenu) { addToUserPlaylist(el.dataset.pl, S.rowMenu.id); closeRowMenu(); } return; }
  if (act === 'menu-new') { const id = S.rowMenu && S.rowMenu.id; closeRowMenu(); newPlaylistPrompt(id); return; }
  if (act === 'menu-remove') {
    const key = S.view.type === 'playlist' ? S.view.key : '';
    if (S.rowMenu && key.startsWith('user:')) removeFromUserPlaylist(key.slice(5), S.rowMenu.id);
    closeRowMenu();
    return;
  }
  if (act === 'menu-never') { if (S.rowMenu) { toggleNever(S.rowMenu.id); closeRowMenu(); } return; }
  if (act === 'menu-less-artist') { if (S.rowMenu) { toggleLess('artist', S.rowMenu.id); closeRowMenu(); } return; }
  if (act === 'menu-less-genre') { if (S.rowMenu) { toggleLess('genre', S.rowMenu.id); closeRowMenu(); } return; }
  if (act === 'clear-dj-feedback') { clearDjFeedback(); return; }
  if (act === 'menu-album') {
    const id = S.rowMenu && S.rowMenu.id;
    closeRowMenu();
    const t = id ? S.trackById.get(id) : null;
    if (t) nav({ type: 'album', id: t.albumId });
    return;
  }
  if (act === 'menu-artist') {
    const id = S.rowMenu && S.rowMenu.id;
    closeRowMenu();
    const t = id ? S.trackById.get(id) : null;
    if (t) nav({ type: 'playlist', key: 'artist:' + t.artist });
    return;
  }
  if (act === 'new-playlist') { newPlaylistPrompt(); return; }
  if (act === 'start-tags') { startTagging(); return; }
  if (act === 'start-audio-tags') { startAudioTags(); return; }
  if (act === 'start-index') { startIndexFix(); return; }
  if (act === 'ai-save') { saveAiSettings(); return; }
  if (act === 'open-settings') { openSettings(); return; }
  if (act === 'close-settings') { closeSettings(); return; }
  if (act === 'refresh-debug') { loadDebug(); return; }
  if (act === 'copy-debug') { copyDebug(); return; }
  if (act === 'open-debug-view') { closeSettings(); nav({ type: 'debug' }); return; }
  if (act === 'start-embed') { startEmbeddings(false); return; }
  if (act === 'open-ai-playlist') { openAiPlaylistModal(); return; }
  if (act === 'close-ai-playlist') { closeAiPlaylistModal(); return; }
  if (act === 'run-ai-playlist') { runAiPlaylist(); return; }
  if (act === 'ai-suggest') { const input = $('#ai-playlist-prompt'); if (input) { input.value = el.dataset.text || ''; input.focus(); } return; }
  if (act === 'open-import') { openImportModal(); return; }
  if (act === 'close-import') { closeImportModal(); return; }
  if (act === 'run-import') { runImport(); return; }
  if (act === 'open-imported') { closeImportModal(); nav({ type: 'playlist', key: 'import:' + el.dataset.id }); return; }
  if (act === 'copy-missing') { copyMissing(el.dataset.id); return; }
  if (act === 'delete-import') { deleteImport(el.dataset.id); return; }
  if (act === 'open-dj') { nav({ type: 'dj' }); return; }
  if (act === 'start-dj') { startDj({ request: '' }); return; }
  if (act === 'new-dj') { startDj({ request: S.dj.request, mood: S.dj.mood }); return; }
  if (act === 'dj-mood') { startDj({ mood: el.dataset.mood, request: '' }); return; }
  if (act === 'dj-ask') { startDj({ request: el.dataset.text || '' }); return; }
  if (act === 'end-dj') { endDj(false); return; }
  if (act === 'open-playlist') { nav({ type: 'playlist', key: decodeURIComponent(el.dataset.key) }); return; }
  if (act === 'open-album') { nav({ type: 'album', id: el.dataset.id }); return; }
  if (act === 'open-artist') {
    const name = decodeURIComponent(el.dataset.artist || '');
    if (name) nav({ type: 'playlist', key: 'artist:' + name });
    return;
  }
  if (act === 'play-playlist') { playContext(decodeURIComponent(el.dataset.key)); return; }
  if (act === 'play-album') { playContext('album:' + el.dataset.id); return; }
  if (act === 'play-album-shuffle') {
    const wasShuffle = S.shuffle;
    S.shuffle = true;
    playContext('album:' + el.dataset.id);
    S.shuffle = wasShuffle;
    updatePlayer();
    return;
  }
  if (act === 'play-artist') {
    const name = decodeURIComponent(el.dataset.artist || '');
    playContext('artist:' + name);
    return;
  }
  if (act === 'shuffle-play') {
    const wasShuffle = S.shuffle;
    S.shuffle = true;
    playContext(decodeURIComponent(el.dataset.key));
    S.shuffle = wasShuffle;
    updatePlayer();
    return;
  }
  if (act === 'play-track') {
    const id = el.dataset.id;
    const ctx = decodeURIComponent(el.dataset.ctx || '');
    if (ctx) playContext(ctx, id); else playIds([id], id, 'custom');
    return;
  }
  if (act === 'play-queue') {
    S.qIndex = Number(el.dataset.index) || 0;
    loadCurrent(true);
    return;
  }
  if (act === 'toggle-play') { togglePlay(); return; }
  if (act === 'next') { nextTrack(false); return; }
  if (act === 'prev') { prevTrack(); return; }
  if (act === 'shuffle') { toggleShuffle(); return; }
  if (act === 'repeat') { cycleRepeat(); return; }
  if (act === 'like') { toggleLike(el.dataset.id); return; }
  if (act === 'like-current') { toggleLike(S.currentId); return; }
  if (act === 'queue') { toggleQueue(); return; }
  if (act === 'close-queue') { S.queueOpen = false; renderQueue(); return; }
  if (act === 'mute') {
    S.muted = !S.muted;
    S.audio.volume = S.muted ? 0 : S.volume;
    updatePlayer();
    return;
  }
  if (act === 'expand') {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
    return;
  }
  if (act === 'lib-tab') {
    S.libTab = el.dataset.tab;
    render(false);
    return;
  }
  if (act === 'rescan') { rescan(el.closest('button')); return; }
});

document.addEventListener('click', (e) => {
  const menu = $('#row-menu');
  if (!menu || menu.classList.contains('hidden')) return;
  if (e.target.closest('#row-menu') || e.target.closest('[data-act="row-menu"]')) return;
  closeRowMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !$('#import-modal').classList.contains('hidden')) {
    e.preventDefault();
    closeImportModal();
    return;
  }
  if (e.key === 'Escape' && !$('#ai-playlist-modal').classList.contains('hidden')) {
    e.preventDefault();
    closeAiPlaylistModal();
    return;
  }
  if (e.key === 'Escape' && !$('#settings-modal').classList.contains('hidden')) {
    e.preventDefault();
    closeSettings();
    return;
  }
  if (e.key === 'Escape') {
    const menu = $('#row-menu');
    if (menu && !menu.classList.contains('hidden')) { closeRowMenu(); return; }
  }
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea') {
    if (e.key === 'Escape' && e.target.id === 'search') {
      e.target.value = '';
      S.query = '';
      if (S.view.type === 'search') render(false);
      e.target.blur();
    }
    return;
  }
  if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  }
});

document.addEventListener('submit', (e) => {
  if (!e.target || e.target.id !== 'dj-form') return;
  e.preventDefault();
  const input = e.target.querySelector('#dj-ask-input');
  const text = input ? input.value.trim() : '';
  if (text) startDj({ request: text });
});

document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'debug-filter') {
    S.debugQuery = e.target.value;
    const box = $('#debug-rows');
    if (box) box.innerHTML = debugRowsHTML(S.debugQuery);
  }
});

$('#ai-playlist-prompt').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); runAiPlaylist(); }
});

$('#import-file').addEventListener('change', (e) => {
  const f = e.target.files && e.target.files[0];
  S.importFile = f || null;
  const label = $('#import-file-label');
  if (label) label.textContent = f ? f.name : 'Choose a CSV file';
  if (f && !$('#import-name').value.trim()) {
    $('#import-name').value = f.name.replace(/\.csv$/i, '').replace(/[_-]+/g, ' ').trim();
  }
  $('#import-run').disabled = !f;
});

$('#search').addEventListener('input', (e) => {
  S.query = e.target.value;
  if (S.searchSemantic && S.searchSemantic.q !== S.query.trim()) S.searchSemantic = null;
  if (S.view.type !== 'search') nav({ type: 'search' }, { replace: false });
  else render(false);
});

$('#search').addEventListener('focus', () => {
  if (S.view.type !== 'search') nav({ type: 'search' });
});

$('#debug-toggle').addEventListener('change', (e) => setDebug(e.target.checked));

document.addEventListener('change', (e) => {
  if (e.target && e.target.id === 'search-source') {
    S.searchSource = e.target.value || '';
    render(false);
  }
});

$('#np-artist').addEventListener('click', () => {
  const t = currentTrack();
  if (t) nav({ type: 'playlist', key: 'artist:' + t.artist });
});

$('#main').addEventListener('scroll', () => {
  $('#topbar').classList.toggle('scrolled', $('#main').scrollTop > 12);
  closeRowMenu();
});

/* ---------- init ---------- */

window.localReload = () => loadLibrary().catch(() => {});

(function init() {
  try { S.debug = localStorage.getItem('spotifly:debug') === '1'; } catch { /* ignore */ }
  document.body.classList.toggle('debug-mode', S.debug);
  try {
    const liked = JSON.parse(localStorage.getItem('spotifly:liked') || '[]');
    if (Array.isArray(liked)) S.liked = new Set(liked);
  } catch { /* ignore */ }
  try {
    const plays = JSON.parse(localStorage.getItem('spotifly:plays') || '{}');
    if (plays && typeof plays === 'object' && !Array.isArray(plays)) S.plays = plays;
  } catch { /* ignore */ }
  try {
    const hist = JSON.parse(localStorage.getItem('spotifly:history') || '[]');
    if (Array.isArray(hist)) {
      S.history = hist.filter((h) => h && h.id && Number.isFinite(h.at)).slice(0, 1000);
    }
  } catch { /* ignore */ }
  try {
    const fb = JSON.parse(localStorage.getItem('spotifly:djFeedback') || '{}');
    if (fb && typeof fb === 'object') {
      S.djFeedback = {
        tracks: fb.tracks && typeof fb.tracks === 'object' ? fb.tracks : {},
        never: Array.isArray(fb.never) ? fb.never : [],
        lessArtists: Array.isArray(fb.lessArtists) ? fb.lessArtists : [],
        lessGenres: Array.isArray(fb.lessGenres) ? fb.lessGenres : [],
      };
    }
  } catch { /* ignore */ }
  try {
    const raw = JSON.parse(localStorage.getItem('spotifly:playlists') || '[]');
    if (Array.isArray(raw)) {
      S.userPlaylists = raw.filter((p) => p && p.id && Array.isArray(p.trackIds))
        .map((p) => ({ id: p.id, name: String(p.name || 'Playlist').slice(0, 60), trackIds: p.trackIds, createdAt: p.createdAt || Date.now() }));
    }
  } catch { /* ignore */ }
  if ('speechSynthesis' in window) {
    S.ttsVoice = pickVoice();
    try { speechSynthesis.addEventListener('voiceschanged', () => { S.ttsVoice = pickVoice(); }); } catch { /* ignore */ }
  }
  const vol = parseFloat(localStorage.getItem('spotifly:volume'));
  if (!Number.isNaN(vol)) S.volume = Math.min(1, Math.max(0, vol));
  S.shuffle = localStorage.getItem('spotifly:shuffle') === '1';
  const rep = localStorage.getItem('spotifly:repeat');
  if (rep === 'all' || rep === 'one' || rep === 'off') S.repeat = rep;
  S.audio.volume = S.volume;

  bindAudio();
  bindBars();

  S.view = parseHash();
  if (S.view.type === 'search' && S.view.q) {
    S.query = S.view.q;
    $('#search').value = S.view.q;
  }
  S.hist = [S.view];
  S.hi = 0;

  loadLibrary().then(() => {
    if (S.view.type === 'dj') loadDjStatus();
    if (S.view.type === 'debug') loadDebug();
  }).catch(() => {
    $('#view').innerHTML = `<div class="empty" style="padding-top:100px"><h3>Could not reach the library</h3><p>Make sure the server is running.</p><button class="btn" onclick="location.reload()">Retry</button></div>`;
  });
})();
