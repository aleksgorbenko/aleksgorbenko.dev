+++
title = "Bukku"
draft = true
tagline = "Launcher for your browser tabs, bookmarks and history"
icon = "images/bukku-icon.png"
requirement = "Requires macOS 15 or later"
links = [
  { name = "Download", url = "" },
  { name = "GitHub", url = "https://github.com/aleksgorbenko" },
]
anchors = [
  { name = "Tips", id = "tips" },
  { name = "FAQ", id = "faq" },
]
+++

Bukku is a native macOS launcher summoned by a global hotkey. It searches and
acts on your browser tabs, bookmarks, and history from one Spotlight-style bar —
so you never dig through windows or menus to find that one tab again.

Everything is read locally from the browsers already on your Mac. No account,
no cloud sync, no telemetry.

#### Unified fuzzy search

One search bar over tabs, bookmarks, and history. Sub-keystroke matching across thousands of entries.

#### Scoped search

Narrow the search scope with a one-letter prefix: `{prefix}␣{query}`

Type `h␣` to search history only, `t␣` for tabs, `b␣` for bookmarks.

#### Tab management

Jump to or close any open tab from anywhere, without leaving the keyboard.

- **Activate** — jump straight to any open tab.
- **Close** — close any tab without switching to it first.

#### Copy links

Copy the URL of any tab, bookmark, or history item without opening the browser.<span class="footnote">*</span>

<p class="footnote">*The browser must be open for tabs — history and bookmarks copy even when it's closed.</p>

#### Browser support

Safari, Chrome, Brave, Edge, Vivaldi, Arc, and Opera are fully supported. Firefox is supported for search (history and bookmarks), but not tab automation — Mozilla doesn't implement AppleScript, so switching and closing Firefox tabs isn't possible.

#### Built-in commands

A command palette for quick Bukku actions — type `/␣` to see all commands available.

#### Apple Shortcuts integration

Query Bukku from your own shortcuts, from Spotlight, or by voice. Both actions take an optional search query and result limit, and return each item with its title, URL, and source browser.

- **Get Browser Tabs** — returns your currently open tabs across every supported browser.
- **Get Browser Bookmarks** — returns your bookmarks across every supported browser.

#### Command-line interface

Script Bukku from the terminal — search everything, or list tabs, bookmarks, and history.

```bash {linenos=false}
# Search tabs, bookmarks, and history for "github"
bukku search github

# Scope the search to one source
bukku search github --tabs
bukku search docs --history

# List open tabs
bukku list tabs

# List your 20 most recent history entries
bukku list history --limit 20

# List all bookmarks
bukku list bookmarks
```

#### Native, not Electron

SwiftUI + AppKit, Spotlight-native look and feel.

## Tips {#tips}

- Set a global hotkey you can reach one-handed — see [my note on launcher ergonomics](https://aleksgorbenko.dev/). <!-- TODO: link real blog post -->
- Type a slash (`/␣`) to open the command palette.
- Bukku respects macOS sandboxing — grant browser access once in the permissions center.

## FAQ {#faq}

{{< faq q="Does Bukku send my browsing data anywhere?" >}}
No. Everything is read locally on your Mac. No account, no cloud, no telemetry.
{{< /faq >}}

{{< faq q="Why can't I switch or close Firefox tabs?" >}}
Firefox doesn't implement AppleScript, so no app can automate its tabs. Bukku still searches your Firefox history and bookmarks.
{{< /faq >}}

{{< faq q="Does it show a Dock icon?" >}}
No. Bukku is a lightweight menu-bar accessory app — no Dock icon, no heavy background service. It lives in the menu bar and is summoned by your global hotkey.
{{< /faq >}}

{{< faq q="Can I automate it?" >}}
Yes — via Apple Shortcuts (App Intents) and the command-line interface. AppleScript support is in progress.
{{< /faq >}}

{{< faq q="How do I change the hotkey?" >}}
Open Settings → the permissions & shortcut center.
{{< /faq >}}
