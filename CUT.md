# How the clip was cut (all commands run in the build session)

Source: the official Rockstar Games upload "Grand Theft Auto VI Trailer 2"
(https://www.youtube.com/watch?v=VQRLujxTm3c, 167 s, 1920x1080), downloaded with
yt-dlp as `source-trailer2.mp4` (not shipped in this repo — Rockstar's footage).

## 1. Pick the moment

Frames were extracted every 8 s across the whole trailer and every 2 s across the
finale (126–166 s), and inspected. Chosen: the continuous stretch **02:06–02:46**
(40 s) — neon Vice City nightlife, Lucia & Jason at home, helicopter / jetski /
motorcycle / seaplane action, night chase, sunset skyline, GTA VI logo card.
One continuous segment of the trailer, not a montage of scattered clips.

## 2. Render (one ffmpeg command)

```sh
ffmpeg -y -ss 126 -i source-trailer2.mp4 -t 40 -filter_complex \
"[0:v]split[a][b]; \
 [a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=45[bg]; \
 [b]scale=1080:-1[fg]; \
 [bg][fg]overlay=(W-w)/2:(H-h)/2, \
 drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:textfile=hook.txt:fontsize=72:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=180:enable='between(t,0,4)', \
 drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:textfile=pitch1.txt:fontsize=58:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=240:enable='between(t,30,40)', \
 drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:textfile=pitch2.txt:fontsize=58:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=1330:enable='between(t,30,40)', \
 drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:textfile=pitch3.txt:fontsize=52:fontcolor=#FFD166:borderw=3:bordercolor=black:x=(w-text_w)/2:y=1420:enable='between(t,30,40)'[v]" \
-map "[v]" -map 0:a -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
-c:a aac -b:a 128k -movflags +faststart -shortest gta6-clip-vertical.mp4
```

Text files (in this repo):
- `hook.txt` — `VICE CITY IS BACK` (first 4 s, top band)
- `pitch1.txt` — `MAKE CLIPS LIKE THIS WITH AI` (last 10 s, top band)
- `pitch2.txt` — `AND EARN MONEY ON make.fun` (last 10 s, bottom band)
- `pitch3.txt` — `make.fun/bounty/gta6-clipper-01` (last 10 s, bottom band)

## 3. Verify

```sh
ffprobe -v error -show_entries format=duration,size \
  -show_entries stream=width,height,codec_name -of default=noprint_wrappers=1 \
  gta6-clip-vertical.mp4
```

Result: 1080x1920, 40.0 s, H.264 + AAC (exact size in the build report).
Frames at t=2 s, t=20 s and t=35 s were extracted and inspected to confirm the
vertical framing, the hook text and the pitch text.
