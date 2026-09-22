---
layout: default
title: Source observation
description: Understand what SOURCE OFF preserves and what SOURCE ON adds.
eyebrow: Optional local source correlation
permalink: /source-observation/
---

# Source observation

SOURCE observation is **off by default**.

## SOURCE OFF

KMP Lens can still explain the observed framework, Apple symbols, Origins,
generators, dependency components and dependency paths when the build provides
those facts. SOURCE OFF is a normal operating mode, not a failed or degraded
run.

## SOURCE ON

Enable local Kotlin source correlation explicitly:

```kotlin
kmpLens {
    sourceObservation {
        enabled.set(true)
    }
}
```

When an exact source declaration can be attached to a symbol, Investigate shows
it together with its exactly observed Kotlin source set when that information is
available. Participating source sets can include `commonMain`, `iosMain`,
`appleMain` or a custom set; KMP Lens does not assume that source belongs to
`commonMain`. When several compatible declarations remain, the report keeps
them as candidates instead of selecting one. Generated Apple forms without
their own Kotlin declaration do not receive fabricated application source.

For expect/actual declarations, KMP Lens shows only an exact attachment to the
participating declaration. It does not replace an unresolved `actual` with its
`expect`. Generated compilation roots can be recognized by the build, but their
contents are not attached as user source unless an exact producer authority is
available.

KMP Lens can read qualified debug information from the observed Apple artifact:
directly from a static framework, or from a dynamic framework's external dSYM
when that dSYM exactly matches the produced binary identity. Source is attached
only to the qualified final published Apple surface; intermediate framework
outputs are not substituted for it.

SOURCE ON enables this correlation but does not guarantee a Kotlin Source result
for every symbol. A source section is shown only when the current build
establishes an exact attachment.

## Performance on large debug artifacts

SOURCE ON can take materially longer than SOURCE OFF because exact source
correlation reads and interprets the matching framework or dSYM debug
information. This is separate from Apple linkage time and is not primarily a
scan of Kotlin source text. KMP Lens streams the DWARF output, but it still has
to acquire the complete evidence needed for exact attachment.

When comparing modes, use the same already-linked framework and matching dSYM,
and compare the report's analysis duration separately from Gradle or link wall
time. SOURCE OFF is the appropriate faster mode when source correspondence is
not needed.

KMP Lens reads only the local roots authorized by the build configuration. It
does not upload source. It does not automatically download or attach Maven
dependency sources. SOURCE OFF omits the Kotlin Source section; it does not
remove independently established Origin or dependency knowledge.
