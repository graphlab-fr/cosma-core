---
title: Identifiers
id: 20210901134136
type: documentation
---

There are many applications that allow you to create interlinked notes. Some use file names or titles to link between files, and automatically update links when names and titles are modified. Others use a more classical approach, similar to the way the Web works: each file has a unique identifier, and links use these identifiers as anchors.

Cosma uses the second approach. We feel very strongly about this choice, which eliminates the dependency to automated link maintenance and reduces the risk of [link rot](https://en.wikipedia.org/wiki/Link_rot).

By default, Cosma generates 14-digit identifiers structured as timestamps (year, month, day, hours, minutes and seconds) after Zettelkasten note-taking software such as [The Archive](https://zettelkasten.de/the-archive/) or [Zettlr](https://www.zettlr.com).

**Tip:** 14-digit identifiers can be cumbersome. Use the Link symbol option in Preferences to visually lighten the text of your records by replacing the identifiers with a personal convention (for example a small manicule: ☞). This is only applied to the cosmoscope, not to the Markdown files (Cosma only reads the files, never writes to them).