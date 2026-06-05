---
title: "Zettelkasten in 1500 Words or Less"
description: "Short, opinionated guide for anyone who still finds themselves confused about what Zettelkasten is and how to start using it."
date: "2026-06-05"
tags:
  - "note-taking"
---

# Zettelkasten in 1500 Words or Less

Around 2020 I migrated to Zettelkasten (from Notion to Obsidian). I never looked back. 

This is short, opinionated guide for anyone who still finds themselves confused about what Zettelkasten is and how to start using it.

## Why People Still Struggle with Zettelkasten
1. Too much upfront terminology - most of it can be ignored in the beginning
2. No idea where to start and what to capture
3. Not using templates from the start
4. Friction - no quick and easy way to add new notes/capture ideas

## Before We Begin...
1. Don't set yourself any goals
2. Don't question "what am I going to write notes about"

If you are still reading this, you probably have a mild interest in understanding Zettelkasten. This is enough.

I will be using Obsidian as an example, which I highly recommend you do too for following reasons:
- Simple, minimal interface
- Everything is a standard Markdown file
- Works offline

This guide is structured
1. Main Ideas of Zettelkasten
2. Notes and Templates
3. Where to Start
4. How to Capture and Link Notes
5. Misc advice
6. Next Steps

## Bottoms Up and Backlinks
The system has Two Main Ideas:
1. Bottoms Up approach - you are not meant to "architect" your knowledge base from the start, instead begin by writing/capturing everything and anything that might interest you and then build connections with...
2. Backlinks - every note is connected to some other note. The result is an ever-growing and ever-changing web or a graph that you can traverse and explore topics in. Ideally the moment when you create and fill a note, you also connect it to some other existing notes

## Note Template and Structure
At the start you only need **ONE** template (let's call it `Base Note`), which will be literally a template for every new note you create.

E.g this is how mine looks:

```markdown
links: [[My Interests]] // breadcrumb style navigation

---
# // title goes here
Date: {{date}} // (links to my journal)

---
// content goes here


### Related // links to other notes or resources (blog posts, vidoes, etc)
- 
```

With time you will create as many as you need (I have 20+ now, but it took me years to reach this number).

### Adding templates
1. Create `_template` folder in your vault
2. Create template file `new_note.md`
3. Add path `/_template` to `Settings -> Templates`

### Using templates
Now you can trigger template by `cmd+p`, type `template`, choose `Templates: Insert template` and choose `new_note.md`. You should have a new notes pasted.

## How to Start, What to Capture
Start from within. Create a note and call it `[[Name Surname]]` or simply `[[me]]`. Write a brief intro about yourself.

Next, create `[[My Interests]]` and link to it from `[[me]]` note.

Now, dump as much as comes to your mind about your interests and things you care about. Do not create more notes at this stage, just keep writing in whatever format the writing flows.

Take as much time as needed, days if necessary.

After you dumped enough, start looking for patterns:

1. What subjects did you write more about than the others?
2. What subjects would you like to learn more about?

Use `Base Note` template to create one or more notes based on what you uncovered. Link them to `[[My Interests]]` and vice versa.

Your new Vault could look like this at this stage:

```shell
.
me.md
My Interests.md
Cooking.md
AI.md
Cyberpunk Music.md
```

At some point, you will notice that you capture similar types of ideas. E.g cooking recipes, meeting notes, tasting notes, travelogues, podcast notes. This is how your collection of templates will grow.

Here are some of my `_templates`:

```markdown
new_museum_visit.md // I now know a lot about my taste in Art
new_trip.md
new_project.md
new_quote.md
new_weekly_review.md
new_book.md // highlights from a book/pdf
```

## How to Capture
A useful starting point - a note called `Inbox` (similar idea to GDT). Here, dump whatever you happen to capture in the moment. Decide on a lightweight format how you will capture things to distinguish them easily. E.g:

```markdown
links: [[My Interests]]

---
# Inbox
All things I capture in the moment
---

### June 1 Dream Log
I had a weird-ass dream today...

--- // separator  between different items in Inbox
### Meeting with Vlad June 5 2026
Topic: [[Personal Knowledge Management]]
Vlad wanted to learn more about it, so i decided to write a small guide with examples
```

You need to keep this note clean, and review this weekly to extract the information into separate notes or remove it. This process will allow you to see in one place the types of things you capture and notice *patterns*. When that happens, it is a good idea to consider creating a new template.

If you are a software engineer, optionally, create an `Engineering Daybook` note, which is essentially an `Inbox` type scoped to a single topic. I have used it for years and it has been invaluable in learning new things and keeping my work organised.

Vault has potentially grown to:

```shell
.
me.md
My Interests.md
Cooking.md
Inbox.md
Engineering Daybook.md # optional
AI.md
Cyberpunk Music.md
```

## How to Link
There are two ways

1. You already know what to link to and you do it manually. Just type `[[Note Name|you can also use aliases]]` (think of alias as a `<a href="URL">alias</a>` tag in HTML)
2. Have a look at `Unlinked Mentions` section of the current note in Obsidian (typically at the bottom) that the current note has and press `Link`

Link lavishly, don't worry if you link too much. The more interconnected your web of knowledge becomes the more easier it is to traverse and see patterns.

Yes, for the nerds out there - you are building an undirected graph.

#### Optional Daily Notes
Obsidian has a native `Daily Notes` functionality which is a good starting point for journaling/thinking in writing. **Writing *is* thinking**.

Go to `Settings -> Core Plugins -> Daily Notes`, enabled it.

Configure how the note is named, it's template and where is placed.
Or leave defaults:
- format: `2020-05-25.md`
- location: root of your vault
- template: I would suggest adding something simple

Configure a shortcut to trigger creation of a Daily Note.

Use `Inbox` to see WHAT you capture in one place.

Use `Daily Notes` to see WHY you capture notes you capture. E.g

```markdown
Today I added a new note [[Astophysics]], I have always been into it since high school...hm... I keep watching these Frank Green videos which are really fun, but I can never remember stuff he talks about...maybe I can create a note for capturing YouTube summaries?
```

Link your `Daily Notes` to notes that you create and vice versa.

Your Vault after some journaling:

```shell
.
me.md
My Interests.md
Astophysics.md
Cooking.md
Inbox.md
Engineering Daybook.md
AI.md
Cyberpunk Music.md
2026-06-05.md # Daily Note
```

## Things to be Aware of
- Folder structure - apart from `_template`, don't create more. Use linking instead. Add folders if needed after your system matured.
- `Collector's Fallacy` - I think inevitably we all end up there when it comes to note taking. It is a good concept to be aware of so you can stop in time and re-evaluate whether you really need to capture that note or not?
- Ignore advanced features/plugins (databases, kanban boards, calendars, todo lists, all interlinking between all these components). You will end up in the "architect my system" trap instead of what is important - taking notes.
- Keep your notes, calendar and management separate. Different tools for different contexts.
- Tags - just ignore them for now, they are mostly useful for people who are engaged in research and academia, if you are not one of them, do not complicate things for yourself
- AI - for privacy reasons to start with. Do not create notes using AI, if you are learning something - retention drops significantly. Write them by hand to build habit and intuition, you can always decide to AI in some capacity later

## Next Steps
Do this type of note taking for some weeks, don't go crazy with dozens of templates on a first day. 

**Get used to the process.** 

#### Focus on
1. Using 1-2 templates (`Base Note` and `Daily Note`) and linking all of them
2. Making the whole process frictionless and fast. If you need to do too many things manually, like typing dates every time - you will eventually stop. Learn and customise `Settings -> Hokeys` to make note management seamless.

**Build habit.**

**Experiment.**

Later, when you feel ready to build more structure into your knowledge base, here are more things to explore in Zettelkasten:
- MOC (map of content) - index notes that act as a way to link many notes of the same subjects
- Types of notes: Evergreen Notes, Fleeting Notes, Literature Notes
	- You don't have to follow this! I tried, it didn't work for me, but I found my own way that works for me :)
- **Dewey Index System** - some people like to structure their interests following it. I just kept a few category of names
- **Obsidian Web Clipper** - saving articles/highlights
- Advanced Templating - Use other tools to make it even easier and frictionless to capture thing you care about: **Apple Shortcuts** (great on iOS), **Keyboard Maestro**, **Alfred** (I use all)
- Explore the idea of *appending to a file*. E.g instead of creating notes, you can quickly append smaller information chunks. I used to capture new entries in `[[My Questions]]` or `[[My Theories]]`
- Plugins...well if you insist :)
	- `Templater` plugin is popular, I am using Obsidian since waaay before the plugin was born, so I manage templates with tools I mentioned above from *outside* of Obsidian (which means I can migrate to any other tool preserving all my automations). Perhaps a post for another time...

Happy ~~note taking~~ *thinking*! 🙌
