---
layout: default
title: Applying KMP Lens
description: Choose producer-module or root placement and find the resulting report.
eyebrow: Placement and discovery
permalink: /applying-analyzer/
---

# Applying KMP Lens

KMP Lens is a passive Gradle plugin. It observes the normal build task that
produces an Apple framework; it does not introduce a replacement build flow.

## Apply it to the producer when known

For a module that directly produces the framework, use the KMP Lens plugin ID
`io.github.kmplabs.kmp-lens` with version `0.1.0-rc.5`, available from Maven
Central.

Run that module's normal Apple link task or the project lifecycle you already
use. The report identifies the framework, target and producer observed in that
run.

## Apply it at the root when discovering the build

Root placement is useful when the framework producer is not yet obvious. The
report distinguishes:

- **Plugin host** — the Gradle project where KMP Lens is applied;
- **Producer** — the Gradle project that produced the observed Apple framework.

When both are the same, the report keeps the presentation compact. When they
differ, both roles are visible. Root placement authorizes build observation; it
does not imply a scan of every repository file.

## Where the report is written

By default:

```text
build/reports/kmp-lens/<target>-<buildType>/kmp-lens-report.html
```

The path is relative to the project where KMP Lens is applied. A custom
location can be set with [`reporting.directory`]({{ '/configuration/' |
relative_url }}). For Apple reports this configures the root: the resolved
target/build-type directory is always appended. Use the `KMP Lens report:` path
printed after successful build completion, rather than constructing the path.
