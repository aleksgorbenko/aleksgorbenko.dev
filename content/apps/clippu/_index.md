+++
title = "Clippu"
draft = false
weight = 2
status = "building"
category = "Clipboard manager"
tagline = "Find anything you copied. Privately."
description = "Clippu keeps the text, links, images and files you copy on your Mac and finds any of them as you type. No network, no account."
keywords = ["macOS", "clipboard", "clipboard manager", "clipboard history", "paste", "productivity", "swift"]
icon = "images/icon_1024x1024.png"
hero = "images/website-hero_2400x1350.webp"
heroAlt = "Writing an email in Mail with the Clippu bar open below it and a link card ready to paste"
requirement = "Requires macOS 26 or later"
anchors = [
  { name = "Features", id = "every-kind-of-copy" },
  { name = "Shortcuts", id = "shortcuts" },
  { name = "FAQ", id = "faq" },
]

[open]
title = "Your clipboard history as a row of cards"
body = '''
Clippu runs in the background and keeps what you copy.\
Press the shortcut and your history opens along the bottom of the screen.

Find an item, press Return, and Clippu pastes it into the app you were using.
'''
label = "Keyboard shortcut: Command Shift V"
keys = [
  { glyph = "⌘", name = "command" },
  { glyph = "⇧", name = "shift" },
  { glyph = "V" },
]

[[features]]
title = "Every Kind of Copy"
summary = "Text, links, code, colours, images and files each get a card that shows what they are."
body = """
- **Code** is syntax highlighted.
- **Colours** show as a swatch with their value.
- **Images** show a preview.
- **Files and folders** show their Finder icon and name.
- **Links** show the title the app copied with them. Clippu never loads the page.

Image, file and code cards show their file type or language in the corner.
"""

image = "images/website-paste-messages_1440x1080.webp"
alt = "A Messages conversation with the Clippu bar open and a photo card ready to paste"
[[features]]
title = "Search Everything"
summary = "Start typing to search every item, including the text inside images."
body = "Text in images is recognised on your Mac, so a screenshot of an error message turns up when you search for it."

image = "images/website-paste-browser_1440x1080.webp"
alt = "A support form in Safari with the order number field selected and a search for order in the Clippu bar"
[[features]]
title = "Search Scopes"
summary = "Narrow the search to one kind, one file type or one app."
body = """
Type a scope word, then your search:

- **Kind:** `txt`, `url`, `code`, `colour`, `img`, `file`
- **File type:** `png`, `jpeg`, `pdf`
- **App:** `safari`, `notes`, `mail`

The scope shows as a capsule in the search field.
"""
image = "images/website-scopes_1440x1080.webp"
alt = "The Safari scope shown as a capsule in the search field, with Safari items only"
[[features]]
title = "Paste in Order"
summary = "Pick several cards and paste them in the order you picked them."
body = """
- [[⇧ ←]] [[⇧ →]] select a range
- [[space]] add or remove any card
- [[↩]] paste them all
- [[⇧ ↩]] paste them all as plain text

Each selected card shows its number, so you see the order before you paste.
"""

image = "images/website-paste-notes_1440x1080.webp"
alt = "A note in Notes with three cards selected in the Clippu bar, numbered in the order they will paste"
[[features]]
title = "Undo Any Change"
summary = "Delete, edit, rename, move or clear, then press [[⌘ Z]] to take it back."

[[features]]
title = "Private by Design"
summary = "Clippu works offline and leaves out what it should not keep."
body = """
- **It stays local.** No network, no account, no telemetry.
- **Passwords stay out.** Copies that password managers mark as confidential are never kept.
- **You choose the apps.** Ignore any app in Settings, and nothing you copy from it is kept.
- **You set the limits.** History ages out by the age and storage size you choose.
"""

image = "images/website-privacy_1440x1080.webp"
alt = "The Privacy tab in Settings listing ignored applications"
[[features]]
title = "History Limits"
summary = "Choose how long Clippu keeps your history and how much space it can use."
body = """
- **Keep history for** a day, a week, a month, a year or forever.
- **Storage limit** from 1 GB to 100 GB. The oldest items go first.
- **Clear History** removes everything, and [[⌘ Z]] brings it back.
"""
image = "images/website-history_1440x1080.webp"
alt = "The History section of Clippu Settings with the keep history and storage limit sliders"

[[shortcuts]]
group = "Anywhere"
keys = [
  { keys = "⌘ ⇧ V", action = "Open the clipboard bar. Change it in Settings." },
]

[[shortcuts]]
group = "Search"
keys = [
  { keys = "↓ ⇥", action = "Go from the search field to the first card" },
  { keys = "↑ ⇧ ⇥", action = "Go back to the search field" },
]

[[shortcuts]]
group = "Cards"
keys = [
  { keys = "← →", action = "Move between cards" },
  { keys = "⇧ ← ⇧ →", action = "Select a range" },
  { keys = "space", action = "Add the card to the selection or remove it" },
  { keys = "↩", action = "Paste the selection" },
  { keys = "⇧ ↩", action = "Paste as plain text" },
  { keys = "⌘ ⌫", action = "Delete the selection" },
  { keys = "⌘ ⌥ ← ⌘ ⌥ →", action = "Move the selection" },
  { keys = "⌘ E", action = "Edit the text of a text or link card" },
  { keys = "⌘ Z", action = "Undo" },
  { keys = "⌘ /", action = "Show every keyboard shortcut" },
]

[[faq]]
question = "Does Clippu send my clipboard anywhere?"
answer = "No. Clippu has no network access, no account and no telemetry. Everything you copy stays on your Mac."

[[faq]]
question = "Will it keep my passwords?"
answer = "No. Password managers mark the passwords you copy as confidential, and Clippu never keeps those copies. You can also ignore whole apps in Settings › Privacy."

[[faq]]
question = "How long does Clippu keep my history?"
answer = "Until it reaches the limits you set in Settings: a maximum age and a maximum storage size. The oldest items go first."

[[faq]]
question = "Does it show a Dock icon?"
answer = "No. Clippu works in the background and opens with your shortcut. A menu bar icon is optional."

[[faq]]
question = "Can I automate it?"
answer = "Yes. Apple Shortcuts can paste an item, delete an item or clear your history."

[[faq]]
question = "When can I get it?"
answer = "Clippu is in development. This page will have the download and App Store links when it is ready."
+++
