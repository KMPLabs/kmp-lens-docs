---
layout: default
title: Getting started
description: Install KMP Lens in a normal Gradle build and open its report.
eyebrow: Installation
permalink: /getting-started/
---

# Getting started

KMP Lens observes the project’s normal Gradle lifecycle. There is no separate KMP Lens workflow to learn.

## Availability

KMP Lens `0.1.0-rc.5` is the current public release.

Implementation coordinate:

```text
io.github.kmplabs:kmp-lens-gradle-plugin:<published-version>
```

Gradle plugin ID:

```text
io.github.kmplabs.kmp-lens
```

Apply it to the KMP module that produces the Apple framework:

```kotlin
plugins {
    id("io.github.kmplabs.kmp-lens") version "0.1.0-rc.5"
}
```

Apply KMP Lens to the Kotlin Multiplatform module that produces
the Apple framework when you know it. You may instead apply it at the root when
you are discovering a larger build; KMP Lens reports the plugin host separately
from the framework producer when they differ. Root placement does not mean that
KMP Lens scans every repository file.

See [Applying KMP Lens]({{ '/applying-analyzer/' | relative_url }}) for producer
and root examples.

## 1. Run your normal build

Use the lifecycle or Apple link task your project already uses, for example:

```shell
./gradlew build
```

KMP Lens observes automatically after installation. It does not change compiler options, exports, dependencies, or the artifacts it analyzes.

## 2. Open the report

The default developer report is:

```text
build/reports/kmp-lens/<target>-<buildType>/kmp-lens-report.html
```

Its assets and detail pages are kept in the adjacent `kmp-lens-report/`
directory. The report directory is replaced in place and retains no per-run
history. Apple reports always use a slice-qualified directory, including
single-slice projects; for example `iosSimulatorArm64-debug`. Open the exact
`KMP Lens report:` path printed after a successful build. Other slices' reports
remain untouched. An old unscoped report at the root is historical and is not
updated or automatically deleted.

## Optional: observe Kotlin source

SOURCE observation is **off by default**. Enable it when you want KMP Lens to correlate qualified declarations with local Kotlin source:

```kotlin
kmpLens {
    sourceObservation {
        enabled.set(true)
    }
}
```

SOURCE ON reads authorized local source roots during the build. It does not upload source. See [Source observation]({{ '/source-observation/' | relative_url }}), [Privacy]({{ '/privacy/' | relative_url }}) and [Configuration]({{ '/configuration/' | relative_url }}).

<div class="callout"><strong>Expected behavior:</strong> applying the plugin enables KMP Lens. If an optional integration is absent or incompatible, the build continues with the information that is available; KMP Lens does not guess missing details.</div>
