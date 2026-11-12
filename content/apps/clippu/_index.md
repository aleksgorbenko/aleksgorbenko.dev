+++
title = "Clippu"
draft = false
weight = 2
status = "building"
category = "Clipboard manager"
tagline = "Your clipboard history, one keystroke away"
description = "Clippu keeps the text, links, images and files you copy, and pastes any of them back from the keyboard. Offline, with no account."
keywords = ["macOS", "clipboard", "clipboard manager", "clipboard history", "paste", "productivity", "swift"]
icon = "images/icon_1024x1024.png"
requirement = "In development. Requires macOS 26 or later"
links = [
  { name = "Coming soon" },
]
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
label = "Keyboard shortcut: Shift Command V"
keys = [
  { glyph = "⇧", name = "shift" },
  { glyph = "⌘", name = "command" },
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
"""

[[features]]
title = "Search Everything"
summary = "Start typing to search every item, including the text inside images."
body = "Text in images is recognised on your Mac, so a screenshot of an error message turns up when you search for it."

[[features]]
title = "Search Scopes"
summary = "Narrow the search to one kind, one file type or one app."
body = """
Type a scope word, then your search:

- `txt`, `url`, `code`, `colour`, `img` or `file` for one kind
- a file extension, such as `png` or `pdf`
- an app name, such as `safari`

The scope shows as a capsule in the search field.
"""

[[features]]
title = "Paste in Order"
summary = "Pick several cards and paste them in the order you picked them."
body = """
- [[⇧ ←]] [[⇧ →]] select a range
- [[space]] add or remove any card
- [[↩]] paste
- [[⇧ ↩]] paste as plain text
"""

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

[[features]]
title = "Shortcuts Integration"
summary = "Paste an item, delete an item or clear your history from your own shortcuts."

[[shortcuts]]
group = "Anywhere"
keys = [
  { keys = "⇧ ⌘ V", action = "Open the clipboard bar. Change it in Settings." },
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
  { keys = "⌥ ⌘ ← ⌥ ⌘ →", action = "Move the selection" },
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
question = "When can I get it?"
answer = "Clippu is in development. This page will have the download and App Store links when it is ready."
+++
