+++
title = "Bukku"
draft = false
tagline = "Launcher for your browser tabs, bookmarks and history"
description = "Bukku is a keyboard launcher for your browser tabs, bookmarks and history on macOS. Everything stays on your Mac - no account, no cloud, no telemetry."
keywords = ["macOS", "launcher", "browser", "bookmarks", "tabs", "history", "productivity", "swift"]
icon = "images/icon_1024x1024.png"
hero = "images/website-hero_2400x1350.webp"
heroAlt = "The Bukku launcher showing tabs, bookmarks and history results for one search"
requirement = "Requires macOS 15 or later"
links = [
  { name = "Coming Soon", url = "" },
]
anchors = [
  { name = "Features", id = "unified-search" },
  { name = "Shortcuts", id = "shortcuts" },
  { name = "Tips", id = "tips" },
  { name = "FAQ", id = "faq" },
]
[open]
title = "Single search for tabs, bookmarks and history"
body = '''
Bukku runs in the background and indexes all tabs, bookmarks and history from your browsers.\
Summon it from anywhere.

Jump directly to a tab, close it, open a bookmark or any page you visited in the past, copy any link, all from the keyboard.

Local, no account, no cloud, no telemetry.
'''
label = "Keyboard shortcut: Option B"
keys = [
  { glyph = "⌥", name = "option" },
  { glyph = "B" },
]

[[features]]
title = "Unified Search"
summary = "Type once to search every open tab, bookmark and history entry in all your browsers."
body = "Results appear as you type, even across thousands of entries."
image = "images/website-unified-search_1440x1080.webp"
alt = "One search showing open tabs, bookmarks and history together"

[[features]]
title = "Scoped Search"
summary = "Start with a letter and a space to search just one place."
body = """
- [[b space]] [[sf:bookmark]] Bookmarks only
- [[t space]] [[sf:rectangle.stack]] Tabs only
- [[h space]] [[sf:clock.arrow.circlepath]] History only
- [[/]] [[sf:command]] Commands

The icon in the search field always shows where you're searching. [[sf:magnifyingglass]] means everywhere. Press [[⌫]] in an empty field to go back to everywhere.
"""
image = "images/website-scoped-search_1440x1080.webp"
alt = "A history-only search, shown by the clock icon in the search field"

[[features]]
title = "Tab Management"
summary = "Switch to or close any open tab, in any browser, without leaving the keyboard."
body = """
- [[↩]] **Activate** - jump straight to the tab and bring its window forward.
- [[⌘ ⌫]] **Close** - close the tab without switching to it first.
"""
image = "images/website-tab-management_1440x1080.webp"
alt = "Bukku listing the same three tabs that are open in the Safari window behind it"

[[features]]
title = "Copy Links"
summary = "Copy the link of any tab, bookmark or history item without opening it."
body = """
Select a result and press [[⌘ C]].

<span class="footnote">Tabs need their browser open. Bookmarks and history copy even when it's closed.</span>
"""
image = "images/website-copy-links_1440x1080.webp"
alt = "Bookmarks with their folders, and the Copy shortcut in the footer"

[[features]]
title = "Browser Support"
summary = "Works with the browsers you already use, all at once."
body = "Firefox: history and bookmarks only. Firefox has no AppleScript support, so no app can switch or close its tabs."
browsers = [
  { id = "safari", name = "Safari" },
  { id = "chrome", name = "Chrome" },
  { id = "arc", name = "Arc" },
  { id = "brave", name = "Brave" },
  { id = "edge", name = "Edge" },
  { id = "vivaldi", name = "Vivaldi" },
  { id = "opera", name = "Opera" },
  { id = "firefox", name = "Firefox" },
]

[[features]]
title = "Privacy Focused"
summary = "Bukku only reads the browsers you allow, and nothing ever leaves your Mac."
body = """
- **You choose.** Grant access one browser at a time, and take it back whenever you like in Settings.
- **It stays local.** Bukku reads your browsers' own files on your Mac. No account, no cloud, no telemetry.
- **It works offline.** Search keeps working with no internet connection.
"""
image = "images/website-privacy_1440x1080.webp"
alt = "Browser access, granted one browser at a time"

[[features]]
title = "Shortcuts Integration"
summary = "Use your tabs, bookmarks and history in your own shortcuts, from Spotlight, or by voice."
body = """
Each action takes an optional query (required for Search Browsers) and an optional limit, and returns each item with its type, browser, title and URL.

- **Get Browser Tabs** - open tabs across every supported browser.
- **Get Browser Bookmarks** - bookmarks across every supported browser.
- **Get Browser History** - history, most recent first.
- **Search Browsers** - tabs, bookmarks and history in one search.
"""
image = "images/website-shortcuts_1440x1080.webp"
alt = "A shortcut in the Shortcuts app that searches browsers for swift and shows the first result"

[[more]]
id = "commands"
eyebrow = "Commands"
title = "Built-in Commands"
summary = "Type [[/]] in the launcher to run a command."
image = "images/website-commands_1440x1080.webp"
alt = "The command list, opened by typing a slash"
commands = [
  { token = "/settings", symbol = "gear", text = "Open Bukku Settings" },
  { token = "/appearance", symbol = "paintpalette", text = "Open Appearance settings: theme and launcher position" },
  { token = "/permissions", symbol = "lock.shield", text = "Open Permissions: grant or remove browser access" },
  { token = "/about", symbol = "info.circle", text = "Show the version and links" },
  { token = "/onboarding", symbol = "hand.wave", text = "Show the welcome tour again" },
  { token = "/check-updates", symbol = "arrow.triangle.2.circlepath", text = "Check for updates (direct download version)" },
  { token = "/quit", symbol = "power", text = "Quit Bukku" },
  { token = "/review", symbol = "star.bubble", text = "Write a review on the App Store (App Store version)" },
]

[[more]]
id = "cli"
eyebrow = "Command line"
title = "Command Line Interface"
summary = "Script Bukku from Terminal with the same four actions as Shortcuts. JSON by default, `--output csv` for CSV."
body = """
Turn on **Settings › General › Command-line tool**, then:

```bash {linenos=false}
# Search tabs, bookmarks and history
bukku search github

# Tabs, bookmarks or history, optionally filtered
bukku tabs
bukku bookmarks docs
bukku history github --limit 20
```
"""
footnote = "Not in the App Store version. App Store apps run in a sandbox and can't add a command to your Terminal."
image = "images/website-cli_1440x1080.webp"
alt = "Bukku's command output in Terminal"

[stats]
title = "Small, native, private"

[stats.lead]
symbol = "arrow.down.circle"
value = "5"
unit = "MB"
label = "download"
text = "Small enough to download in seconds. Bukku lives in the menu bar until you need it."

[stats.side]
image = "images/swift_218x196.png"
title = "Built native in Swift"
note = "No Electron"

[[stats.items]]
symbol = "internaldrive"
value = "10"
unit = "MB"
label = "on disk"
note = "Installed size"

[[stats.items]]
symbol = "cpu"
value = "Universal"
label = "app"
note = "Apple silicon and Intel"

[[stats.items]]
symbol = "checkmark.shield"
value = "100"
unit = "%"
label = "local"
note = "No account, no telemetry"

[[shortcuts]]
group = "Anywhere"
keys = [
  { keys = "⌥ B", action = "Open or close Bukku. Change it in Settings." },
]

[[shortcuts]]
group = "In the launcher"
keys = [
  { keys = "↑ ↓", action = "Move through results. [[↑]] on the first result selects your search." },
  { keys = "↩", action = "Open the selected tab, bookmark or page, or run the command" },
  { keys = "⌘ C", action = "Copy the selected link" },
  { keys = "⌘ ⌫", action = "Close the selected tab" },
  { keys = "⌫", action = "In an empty field, go back to searching everywhere" },
  { keys = "⎋", action = "Hide Bukku" },
]

[[shortcuts]]
group = "Scopes"
keys = [
  { keys = "b space", action = "[[sf:bookmark]] Search bookmarks" },
  { keys = "t space", action = "[[sf:rectangle.stack]] Search tabs" },
  { keys = "h space", action = "[[sf:clock.arrow.circlepath]] Search history" },
  { keys = "/", action = "[[sf:command]] Show commands" },
]
+++

## Tips {#tips}

- Type a slash ([[/]]) to see every command.
- Bukku respects macOS sandboxing - grant browser access once in Settings › Permissions.

## FAQ {#faq}

{{< faq q="How does Bukku read browser data?" >}}

- **Tabs.** Bukku asks each open browser for its tabs through AppleScript, the automation built into macOS. macOS asks your permission once per browser. Tabs are kept in memory only.
- **Bookmarks.** Bukku reads each browser's bookmarks file and keeps the bookmarks in memory only.
- **History.** Bukku copies each browser's history into its own folder on your Mac and builds a search index from it, so results stay fast across years of browsing.

Bukku only reads. It never changes your browsers' files, and nothing leaves your Mac.
{{< /faq >}}

{{< faq q="Does Bukku send my browsing data anywhere?" >}}
No. Everything is read locally on your Mac. No account, no cloud, no telemetry.
{{< /faq >}}

{{< faq q="Why can't I switch or close Firefox tabs?" >}}
Firefox doesn't implement AppleScript, so no app can automate its tabs. Bukku still searches your Firefox history and bookmarks.
{{< /faq >}}

{{< faq q="Does it show a Dock icon?" >}}
Only while one of its windows, such as Settings, is open. The rest of the time Bukku lives in the menu bar and opens with your shortcut, with no heavy background service.
{{< /faq >}}

{{< faq q="Can I automate it?" >}}
Yes - via Apple Shortcuts (App Intents) and the command-line interface.
{{< /faq >}}

{{< faq q="How do I change the hotkey?" >}}
You can change it in the main Settings menu. Press [[⌘ ,]] or type `/settings` to open Settings.
{{< /faq >}}
