# Moony — Pencil Studio

Moony opens inside the existing Rakan app at `#moony`. Static ES modules, no build,
backend, keys or paid runtime services. Existing kids lessons and `rk_*` storage
remain unchanged. `RakanBridge` exposes only speech, silence and return-home.

## Course

20 studies: six foundations, four forms, two perspective, eight landscapes.
Each lesson has nine written/narrated instructions, a pencil grade, a self-check,
a timed practice suggestion and a visual stage. The first stage shows the final
reference for observation. Completion means self-reported practice, not mastery.
Dedicated glass/metal/fabric still-life lessons are not in this release.

## Add a lesson

1. Copy an existing `lessons/<id>.json`, assigning a unique URL-safe `id`.
2. Write 7–9 subject-specific steps: `title`, `grade`, `text`, `talk`, `check`,
   `visual` and `minutes`. Current navigation expects **nine** stages; update its
   bounds in `app.js` if you choose a different length.
3. Add its summary to `catalog.json` in the intended prerequisite order.
4. Provide a renderer in `render.js`, or a reference in `art/<id>.jpg` and add its
   ID to `app.js`'s reference list. Record provenance in the lesson and ARTWORK.md.
5. Add all new runtime files to `sw.js`'s ASSETS array. Change VERSION in sw.js and
   version.json together. Publish all files in one commit to avoid mixed versions.
6. Check all stages and narration, narrow screens, offline reopening, photo save,
   backup export/import and the original kids lessons before publishing.

## Visual honesty

Landscape references are original AI-generated raster drawings, not photographs,
not claimed to be CC0, and not records of human drawing. `reference.js` derives
contour/value/layer views from the same reference. They are explicitly labelled
analytical views, not authentic hand-drawn intermediate stages. Foundations and
form diagrams are deterministic canvas illustrations. There is no AI assessment.

## Storage and backups

IndexedDB `moony-studio`: `entries` for photos and `state` for progression.
Legacy `rk_pics` images are copied idempotently; originals are never changed.
Import validates the entire backup before a single atomic transaction and merges
IDs/completed lessons. It never clears the journal. Export backups before clearing
browser data. Persistence is requested only after a user gesture and is not assured.
The journal is shared in the sense that it includes copies of Rakan pictures;
Rakan's original gallery remains independent and does not show Moony entries.

## Offline and updates

Service worker precaches the complete course, images, modules and original shell.
Wait for offline-ready status before disconnecting. Same-origin app assets are
served as a coherent cached version; version.json is network-only. A newly
installed worker waits for the learner's reload action to avoid losing a drawing.
Web Speech uses device voices and may require a voice download or network access.
No prerecorded audio is bundled. Google fonts used by the existing kids app are
optional; system-font fallbacks keep it usable offline.

## Verification limits

Desktop browser interaction and physical Android/iPad testing are separate checks.
Do not interpret syntax checks or rendered diagrams as proof of device compatibility.
