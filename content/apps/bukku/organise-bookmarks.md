+++
title = "Organise Your Bookmarks"
description = "Turn a messy bookmarks export into short, searchable folders with an AI agent, then import it back into your browser."
draft = false
weight = 3
+++

Give every bookmark a short folder path and a clean title, so a few keystrokes in Bukku find it. An AI agent does the sorting. You approve each step.

## Before you start

| Need | Detail |
| --- | --- |
| An AI agent that can read and run code on local files | For example Claude Code. Chat apps struggle with large exports (500 KB and up). |
| A browser that exports bookmarks as HTML | Every browser Bukku supports does, except Dia. |
| 15 minutes | Mostly review time. |

## Export your bookmarks

| Browser | Export |
| --- | --- |
| Safari, Safari Technology Preview | **File › Export › Bookmarks…** |
| Chrome, Chrome Canary, Brave | **Bookmarks › Bookmark Manager** ([[⌥ ⌘ B]]), then **⋮ › Export bookmarks** |
| Edge | **Favourites**, then **⋯ › Export favourites** |
| Vivaldi | **File › Export Bookmarks** |
| Opera | Open `opera://bookmarks`, then **Export bookmarks** at the bottom of the side panel |
| Firefox | **Bookmarks › Manage Bookmarks** ([[⇧ ⌘ O]]), then **Import and Backup › Export Bookmarks to HTML…** |
| Dia | No export. Import from another browser first: **Dia › Import from Another Browser**. |

Then back it up:

1. Save the export as `bookmarks_YYYY-MM-DD.html`.
2. Copy it to `bookmarks_BACKUP_YYYY-MM-DD.html`.
3. Keep the backup outside the working folder, on a cloud drive or an external disk.
4. Make the backup read-only: `chmod 444 bookmarks_BACKUP_YYYY-MM-DD.html`.
5. Create an empty working folder, such as `bookmarks-cleanup`, and copy the export (not the backup) into it.
6. Keep your current bookmarks in the browser for now.

> [!WARNING]
> Make the backup before any AI agent touches the file. It's your only undo.

## Run the prompt

1. Open your AI agent in the working folder.
2. Paste the prompt below.
3. Replace `{{INPUT_FILE}}` with the name of your export.
4. The agent stops twice for your approval. Don't skip either stop.

````markdown
# Task

Reorganise a messy bookmarks export into a namespaced folder structure. Rename titles and move bookmarks. Do not lose any bookmark.

Input file: `{{INPUT_FILE}}` (Netscape bookmark HTML)

# Safety rules

- Never modify `{{INPUT_FILE}}`. Read only. Write all output to new files in `./out/`.
- Before anything else, confirm a backup of the original exists elsewhere. If I have not confirmed it, ask me.
- Parse with a real HTML parser. Never use regex over the whole file.
- The file is large. Read it in portions or process with a script. Never paste it whole into context.
- Do not visit any URL. No network requests.
- Do not delete any bookmark. Flag duplicates, junk and dead-looking entries for my decision.

# Hard constraints

1. Nothing may remain in the toolbar folder (Bookmarks bar, Favourites or Bookmarks Toolbar). Move every item out.
2. Place everything in new top-level folders, siblings of each other. Do not mark any folder as the toolbar folder.
3. You may create new folders.
4. You may not change URLs, except removing marketing query parameters.
   - Remove: `utm_*`, `fbclid`, `gclid`, `dclid`, `msclkid`, `mc_cid`, `mc_eid`, `igshid`, `_hsenc`, `_hsmi`, `mkt_tok`, `sh_kit`, `ref`, `ref_`, `pf_rd_*`, `source`, `campaign`, `cmp`.
   - Keep everything else that affects what the page shows: `id`, `q`, `v`, `t`, `list`, `page`, `gid`, `node`, `binding`, language and filter params, fragments, path segments.
   - When unsure, keep the parameter and list it as uncertain.
   - Edit the query string by string surgery. Never re-encode or reorder what you keep.
5. `chrome://`, `about:`, `javascript:` (bookmarklets) and `file://` URLs stay unchanged.

# Namespace standard

## Folders

- Lowercase, singular, one word. No spaces, no camelCase, no plurals (`tool` not `Tools`, `place` not `places`).
- Maximum 3 levels deep.
- Create a folder only when it holds 2 or more items or is an obvious domain.
- Suggested top level, adapt to what the file contains: `my`, `tool`, `dev`, `ai`, `edu`, `job`, `fin`, `shop`, `place`, `travel`, `event`, `media`, `book`, `food`, `read`.

## Titles

`<folder path, space separated> <Name>`

- Prefix is the full folder path, lowercase.
- `Name` keeps the site's own capitalisation.
- Strip: site taglines, `| Site Name` suffixes, `- Home`, emoji, email addresses, old tag prefixes.
- Untitled or junk titles (`New Tab`, `Untitled`, `Home`, `Login`, empty): use the site or product name from the domain.
- Two bookmarks end up with the same title: add the domain in brackets, e.g. `(ytb2mp4)`.
- British English in any text you write. No em dashes.
- Long titles: aim for 6 words or fewer.

## Examples

| Old folder | Old title | New folder | New title |
|---|---|---|---|
| Bookmarks bar | Go by Example - learn Go with annotated programs | `dev/go` | `dev go Go by Example` |
| Bookmarks bar/Tools | tools regex101: build, test, and debug regex | `tool/dev` | `tool dev regex101` |
| Other/Stuff | Unsplash \| High-Resolution Photos | `tool/stock` | `tool stock Unsplash` |
| Bookmarks bar | New Tab | by domain | `my account <Site name>` |
| Misc | Levels.fyi - salary data | `job/pay` | `job pay Levels.fyi` |
| Bookmarks bar/Travel | Skyscanner - cheap flights \| compare | `travel/flight` | `travel flight Skyscanner` |
| Old/UK | Expenses if you're self-employed - GOV.UK | `fin/tax/uk` | `fin tax uk Self-employed expenses` |
| Bookmarks bar | Inbox - me@example.com - Gmail | `my/google` | `my google Gmail inbox` |

# Steps

## Step 1: Inventory (no changes)

Report:
- total bookmark count and total folder count
- folder tree with item counts
- empty folders
- exact duplicate URLs
- untitled or junk-titled items
- URLs carrying marketing parameters
- items directly in the toolbar folder

Then propose the top-level folder list and any sub-folders, and **stop for my approval**.

## Step 2: Classify

For every bookmark decide: new folder, new title, cleaned URL. Judge by title, URL and current folder. When the purpose is unclear, make your best guess and add the item to an "uncertain" list.

## Step 3: Review table (stop for approval)

Output markdown, grouped by new folder, one heading per folder with its count:

| Old title | New title |
| --- | --- |

Then add:
- URL changes table: bookmark, old URL, new URL.
- Empty folders proposed for deletion.
- Duplicate URLs flagged (keep both unless I say otherwise).
- Uncertain placements.
- Reconciliation: `input N = output N`, per-folder counts add up.

Do not generate the import file yet. **Wait for my approval or corrections.**

## Step 4: Build the import file

After approval, write `./out/bookmarks_clean.html`:
- Same Netscape header as the input.
- Folders as siblings at the top level.
- No folder carries `PERSONAL_TOOLBAR_FOLDER`.
- Keep `ADD_DATE` and `ICON` attributes.
- Escape HTML entities correctly.

## Step 5: Verify, then report

Run these checks with a script and show the results:
- Output parses cleanly.
- Bookmark count equals input count.
- Every output URL equals its input URL, or differs only by removed marketing params.
- Zero items at root level or in a toolbar folder.
- Zero duplicate titles.
- Checks report a non-zero number of items examined. A check that examined zero items is unverified.

End with bullets only: counts, file path, what to do next.
````

## Check the result

- `out/bookmarks_clean.html` exists.
- The verification shows `input N = output N`.
- You read the review table and the URL changes.
- You opened the file and spot-checked 5 bookmarks.

## Import the clean file

1. Check that the backup still exists.
2. Turn off bookmark sync in the browser, so a bad import doesn't reach your other devices.
3. Choose how to replace the old bookmarks:
   - **Safer:** keep them, import, compare, then delete the old ones.
   - **Cleaner:** delete them all first. The backup is your undo.
4. Import `bookmarks_clean.html` with your browser's import command below.
5. Find where the import landed. Most browsers put it in a new folder named `Imported`.
6. Move the new top-level folders out of that folder, and keep the toolbar folder empty.
7. Delete the old bookmarks if you kept them.
8. Turn sync back on once everything looks right.

| Browser | Import |
| --- | --- |
| Safari, Safari Technology Preview | **File › Import From › Bookmarks HTML File…** |
| Chrome, Chrome Canary, Brave | **Bookmark Manager**, then **⋮ › Import bookmarks** |
| Edge | **Favourites**, then **⋯ › Import favourites**, and choose **Favourites or bookmarks HTML file** |
| Vivaldi | **File › Import from Applications or Files…**, then **Bookmarks HTML File** |
| Opera | Open `opera://settings/importData`, then choose **Bookmarks HTML file** |
| Firefox | **Manage Bookmarks**, then **Import and Backup › Import Bookmarks from HTML…** |
| Dia | **Dia › Import from Another Browser**, then import from a file |

> [!NOTE]
> Where an import lands differs between browsers and versions. Check instead of assuming.

## Roll back

1. Delete the imported folders.
2. Import `bookmarks_BACKUP_YYYY-MM-DD.html` the same way.

## Search them with Bukku

Bukku matches the title, link and folder of every bookmark, so the folder path in each title works as a search prefix. Type [[b space]], then the path:

- `dev go` finds Go by Example.
- `travel flight` finds Skyscanner.
- `fin tax` finds every tax bookmark.

## Keep it tidy

- Name new bookmarks the same way: folder path first, then the name.
- Run the process again once a year, with the clean file as the new input.

> [!TIP]
> The prompt comes from a real clean-up of one large export. Review every table it shows you before you approve.
