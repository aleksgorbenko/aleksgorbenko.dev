+++
title = "Bukku"
draft = false
tagline = "Launcher for your browser tabs, bookmarks and history"
description = "Bukku is a Spotlight-style launcher for your browser tabs, bookmarks, and history on macOS. Everything local and private - no account, no cloud, no telemetry."
keywords = ["macOS", "launcher", "browser", "bookmarks", "tabs", "history", "productivity", "swift"]
icon = "images/bukku-icon.png"
demo_gif = "images/bukku-demo.gif"
requirement = "Requires macOS 15 or later"
links = [
  { name = "Coming Soon", url = "" },
]
anchors = [
  { name = "Tips", id = "tips" },
  { name = "FAQ", id = "faq" },
]
+++

Bukku is a Spotlight-style launcher to control tabs, open bookmarks and history items across all your browsers.

Open it from anywhere with one global shortcut.

Jump to an active tab, close a tab, open a bookmark, open a history item, copy any link - all from the keyboard.

Works offline. Everything stays on your Mac.\
No account. No cloud. No telemetry.

## Features

### Unified Fuzzy Search

One search bar over tabs, bookmarks, and history. Sub-keystroke matching across thousands of entries.

### Scoped Search

Narrow the search scope with a one-letter prefix: `{prefix}␣{query}`

- `b␣` to search bookmarks only
- `t␣` to search tabs only
- `h␣` to search history only

### Tab Management

Jump to or close any open tab from anywhere, without leaving the keyboard.

- **Activate** - jump straight to any open tab.
- **Close** - close any tab without switching to it first.

### Copy Links

Copy the URL of any tab, bookmark, or history item without opening the browser.<span class="footnote">*</span>

<p class="footnote">*The browser must be open for tabs - history and bookmarks copy even when it's closed.</p>

### Browser Support

- **Safari** - full support
- **Chrome** - full support
- **Brave** - full support
- **Edge** - full support
- **Vivaldi** - full support
- **Arc** - full support
- **Opera** - full support
- **Firefox** - search history and bookmarks only; Firefox doesn't support AppleScript, so Bukku can't switch or close its tabs

### Built-in Commands

A command palette for quick Bukku actions - type `/` to see all commands available.

### Apple Shortcuts Integration

Query Bukku from your own shortcuts, from Spotlight, or by voice. Every action takes an optional query and limit (all results by default) and returns each item with its type, browser, title and URL.

- **Get Browser Tabs** - open tabs across every supported browser.
- **Get Browser Bookmarks** - bookmarks across every supported browser.
- **Get Browser History** - history, most recent first.
- **Search Browsers** - tabs, bookmarks and history in one search.

### Native, Not Electron

SwiftUI + AppKit, Spotlight-native look and feel.

### Command Line Interface†

Script Bukku from the terminal, with the same four operations as Shortcuts. JSON by default, `--output csv` for CSV.

```bash {linenos=false}
# Search tabs, bookmarks and history for "github"
bukku search github

# Open tabs, bookmarks or history, optionally filtered
bukku tabs
bukku bookmarks docs
bukku history github --limit 20
```

_†Not available in the App Store version: Apple doesn't allow sandboxed App Store apps to add a command-line tool._

## Tips {#tips}

- Type a slash (`/`) to open the command palette.
- Bukku respects macOS sandboxing - grant browser access once in the permissions center.

## FAQ {#faq}

{{< faq q="Does Bukku send my browsing data anywhere?" >}}
No. Everything is read locally on your Mac. No account, no cloud, no telemetry.
{{< /faq >}}

{{< faq q="Why can't I switch or close Firefox tabs?" >}}
Firefox doesn't implement AppleScript, so no app can automate its tabs. Bukku still searches your Firefox history and bookmarks.
{{< /faq >}}

{{< faq q="Does it show a Dock icon?" >}}
No. Bukku is a lightweight menu-bar accessory app - no Dock icon, no heavy background service. It lives in the menu bar and is summoned by your global hotkey.
{{< /faq >}}

{{< faq q="Can I automate it?" >}}
Yes - via Apple Shortcuts (App Intents) and the command-line interface. AppleScript support is in progress.
{{< /faq >}}

{{< faq q="How do I change the hotkey?" >}}
You can change it in the main Settings menu. Press `cmd+,` or type `/settings` to open Settings.
{{< /faq >}}
