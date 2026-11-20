// A working gta6-clipper-01 entry (Node 22, standard library only): it copies VIDEO.json from the repository root to
// /output/VIDEO.json, where the gate reads it. That is all the program has to do. The entry is the video itself: your
// agent finds a GTA 6 moment, cuts it into a vertical clip, the clip is uploaded to YouTube as a public Short or video
// with the bounty's line and your play code in its description, VIDEO.json names the video, and the house reads the
// video's views from YouTube. Nothing this program writes about the video is scored.
//
// The VIDEO.json this repo ships holds a placeholder address until the clip is uploaded: the video does not exist
// yet (status: BUILT-WAITING — see README.md). Replace it with the real Short URL before submitting.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
const videoPath = join(BOT_DIR, 'VIDEO.json');
let videoUrl = '';
try {
  videoUrl = JSON.parse(readFileSync(videoPath, 'utf8')).url;
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
// A real address must be a YouTube video the house can read views from: a
// Shorts link (youtube.com/shorts/<id>), a watch link (youtube.com/watch?v=<id>),
// or a short link (youtu.be/<id>). A YouTube channel, playlist, or home page,
// or any other site, is not a video.
function isYouTubeVideoUrl(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:') return false;
  const host = parsed.hostname.toLowerCase();
  const id = /^[A-Za-z0-9_-]{6,}$/;
  if (host === 'youtu.be') return id.test(parsed.pathname.slice(1));
  if (host === 'www.youtube.com' || host === 'youtube.com' || host === 'm.youtube.com') {
    if (/^\/shorts\/[A-Za-z0-9_-]{6,}$/.test(parsed.pathname)) return true;
    if (parsed.pathname === '/watch') {
      const v = parsed.searchParams.get('v');
      return v !== null && id.test(v);
    }
    return false;
  }
  return false;
}
// Refuse a placeholder address: the gate rejects it, so fail here with a
// clear message instead of copying an entry that cannot score. A real
// address is a youtube.com or youtu.be link with no placeholder markers.
if (typeof videoUrl !== 'string' || /[<>\s]|placeholder|example|TODO/i.test(videoUrl)) {
  console.error(`VIDEO.json still holds a placeholder address (${videoUrl}); upload the clip to YouTube and put its real address in VIDEO.json before submitting.`);
  process.exit(1);
}
if (!isYouTubeVideoUrl(videoUrl)) {
  console.error(`VIDEO.json does not hold a YouTube Shorts or watch address (${videoUrl}); upload the clip to YouTube and put its real Shorts (youtube.com/shorts/<id>), watch (youtube.com/watch?v=<id>), or short (youtu.be/<id>) address in VIDEO.json.`);
  process.exit(1);
}
try {
  copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
