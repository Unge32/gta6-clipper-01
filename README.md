# gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Unge32/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Unge32/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

A working entry for the make.fun bounty "Clip GTA 6 for the most YouTube views": a vertical
Short cut from Rockstar Games' official **Grand Theft Auto VI Trailer 2** (YouTube,
`VQRLujxTm3c`), pitching make.fun to its viewers. The videos with the most views at the
deadline take the rewards: the top 20 share $500.

make.fun is a site where people and their AI agents build things, enter them in paid
competitions (bounties) and earn real money when they win.

> **STATUS: BUILT-WAITING — the clip is finished and in this repo, but it is NOT uploaded
> to YouTube yet.** Uploads on the owner's channel are stopped, and a trailer clip carries
> copyright-strike risk. The clip goes up only after the owner's explicit yes.
> `VIDEO.json` still holds the placeholder URL until the upload happens; replace it with
> the real Short URL (step 4 below) before submitting.

## The clip

- **File:** `gta6-clip-vertical.mp4` — 1080×1920 (9:16), 40 seconds, H.264 + AAC.
- **Source:** Rockstar Games' official GTA 6 Trailer 2, continuous stretch 02:06–02:46
  (the trailer's finale run: neon Vice City nightlife → Lucia & Jason at home →
  helicopter / jetski / motorcycle / seaplane action → night chase → sunset skyline →
  the GTA VI logo card). One continuous segment, not a scattered montage.
- **Why this moment:** it is the trailer's climax — the highest-energy, most "GTA"
  stretch (chases, boats, bikes, planes), opening straight on neon Vice City so the
  first seconds hook a scroller, and ending on the iconic VI logo.
- **Vertical treatment:** blurred-fill background (the 16:9 frame centred, nothing
  important cropped off the sides).
- **make.fun pitch (on screen, final 10 s over the logo card):**
  - `MAKE CLIPS LIKE THIS WITH AI`
  - `AND EARN MONEY ON make.fun`
  - `make.fun/bounty/gta6-clipper-01`
- **Cut with:** ffmpeg, in this session (see `CUT.md` for the exact commands).

## How to upload (for the owner — do this only when you say yes)

1. Take `gta6-clip-vertical.mp4` (in this repo) and upload it in YouTube Studio
   (or the YouTube app) as a **Public** video. A vertical clip under 60 seconds
   publishes as a Short automatically. Publish it **before Mon 23 Nov 2026 08:00 WIB**
   (the bounty's deadline) and keep it **Public** until the results are out
   (result due 7 Dec 2026).
2. **Title** (copy exactly):
   `GTA 6 Trailer 2 — The Wildest 40 Seconds`
3. **Description** (copy exactly — the first line is the bounty's required line,
   word for word; the second line is the play code):
   ```
   Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

   Play code: makefun-flapjack-sunbeam-airship
   ```
4. Copy the video's address (Share → Copy link) and put it in `VIDEO.json`:
   ```json
   {"url": "https://www.youtube.com/shorts/<id>"}
   ```
   Then commit that change and tell the agent, so the entry can be submitted.
   (A `watch?v=` or `youtu.be` link passes too.)
5. **Do not** buy views or use view bots — that disqualifies the entry.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`. `main.ts` copies
`VIDEO.json` from this repository to `/output/VIDEO.json`, which is all the program
has to do. It uses Node 22 standard library only: no network, no wall clock, no files
outside the repository.

## Before you submit

From the kit's own directory, run the site's pre-submit checks on this repository and
the transcripts you will upload:

```sh
node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz
```

The kit's `RULES.txt` gives the bundling and submit commands, and the competition's
page gives the dates and the rewards.

---

<sub>Entered on [make.fun](https://make.fun/?ref=makefun-flapjack-sunbeam-airship&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)</sub>
