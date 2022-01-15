---
title: Metadata
id: 20210901133736
type: documentation
---

The required data format for Cosma includes a header in [YAML](http://yaml.org) at the beginning of the file. Example:

```yaml
---
title: Title of the record
id: 20201209111625
type: undefined
tags:
- keyword1
- keyword2
---
```

The YAML header is delimited by two sets of three single dashes on a line (`---`).

A field in YAML consists of a name and a value separated by a colon. Cosma recognizes and uses the following four fields:

`title`: Title of the record. Mandatory.

`id`: Unique identifier of the record. Mandatory. By default, Cosma generates 14-digit identifiers structured as timestamps (year, month, day, hours, minutes and seconds) after Zettelkasten note-taking software such as [The Archive](https://zettelkasten.de/the-archive/) or [Zettlr](https://www.zettlr.com).

`type`: Type of the record. Optional. Only one type can be assigned to a record. If the `type` field is not specified or its value does not match one of the types stored in the configuration under the `record_types` parameter, Cosma will interpret the type of the record as “undefined”.

`tags`: Keywords for the record. Optional. The value must be a list. A record can have as many keywords as you want.

According to the YAML specification, the list of keywords can be written in *block* mode:

```yaml
tags:
- keyword1
- keyword2
```

Or in *flow* mode:

```yaml
tags: [keyword1, keyword2]
```

You can add additional fields arbitrarily, for example a `description` field.

**Note:** Some note-taking applications detect metadata by applying heuristics. For example, if the first line of the file is a level 1 title, then it is the title of the file; if the second line contains words prefixed with a `#' bracket, then it is keywords. This is convenient if you want to write less, but it is not interoperable: each software has its own conventions, which limits the user's ability to change tools. Using a YAML header is a better solution, as it allows you to declare metadata such as the title and the unique identifier of a record in an **explicit** way. This has the advantage of making the detection and manipulation of this metadata trivial, both by a machine and by a human. The use of a common format (such as YAML) increases the number of tools compatible with the same set of files. And widely used computer tools such as regular expressions and shell scripts allow users to convert their data themselves in a relatively simple way if needed.
