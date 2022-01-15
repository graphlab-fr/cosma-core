---
title: Data format
id: 20210901133701
type: documentation
---

Cosma does not require the use of any particular writing application. On the other hand, creating content for Cosma requires the use of plain text and the adoption of several writing conventions, which may be facilitated by some writing applications. These conventions are:

- YAML for the [[20210901133736]] metadata written at the beginning of each record ;
- Markdown for the rest of the [[20210901133951]] file contents;
- wiki-like syntax (double brackets `[[ ]]`) for creating [[20210901134026]] internal links;
- unique [[20210901134136]] identifiers that serve as anchors for internal links.

Cosma also features automatic [[20210901134745]] citations and bibliographies. This relies on the CSL standard and the Pandoc citation syntax.

This combination of writing conventions shapes Cosma's required data format. It lies at the intersection of several textual cultures: documentation (describing and indexing content with metadata); hypertext and wikis (interrelating knowledge); the Zettelkasten method (organizing one's notes); academic writing with Pandoc (plain text as the basis for single-source publishing). Therefore, Cosma works particularly well when used in tandem with writing environments that also adopt this approach, such as [Zettlr](https://zettlr.com) or the [Foam](https://foambubble.github.io/foam/) extension for Visual Studio Code and VSCodium.

You can create a record that conforms to this data format via the application's record creation form, or directly in your favorite text editor. Some text editors can save you time by allowing you to use document templates, which you can use to quickly create appropriately formatted records.

