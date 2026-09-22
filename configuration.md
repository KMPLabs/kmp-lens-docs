---
layout: default
title: Configuration
description: The complete public KMP Lens 0.1 DSL for enabling analysis, source observation, and a custom report directory.
eyebrow: Public KMP Lens 0.1 DSL
permalink: /configuration/
---

# Configuration

Applying the plugin enables analysis, keeps SOURCE observation off, and uses the standard report directory.

```kotlin
kmpLens {
    enabled.set(true)

    sourceObservation {
        enabled.set(true)
    }

    reporting {
        directory.set(
            layout.buildDirectory.dir("reports/kmp-lens")
        )
    }
}
```

| Option | Default | Meaning |
|---|---:|---|
| `enabled` | `true` | Enables or disables KMP Lens for the project. |
| `sourceObservation.enabled` | `false` | Adds qualified local Kotlin source correlation. |
| `reporting.directory` | `build/reports/kmp-lens` | Changes where the developer report is written. |

## Automatic build observation

KMP Lens uses the Kotlin/Native and transformation information available during
the build. When optional information is unavailable, analysis continues and the
report explains what remains unknown.

## SOURCE OFF and SOURCE ON

SOURCE OFF analyzes build, Kotlin-library identity, Origin, dependency paths and
Apple symbols without reading project source roots for correlation. SOURCE ON
adds local structural source observation.

## Select one Apple slice

A report observes exactly one Apple product and one slice. If the authoritative
build context identifies a unique product and slice, no selector is required.
For a product with several eligible slices, KMP Lens requires a typed selection:

```kotlin
import io.github.kmplabs.kmplens.AppleTarget
import io.github.kmplabs.kmplens.AppleBuildType

kmpLens {
    slice(AppleTarget.IOS_SIMULATOR_ARM64, AppleBuildType.DEBUG)
}
```

Supported target values are `IOS_ARM64`, `IOS_SIMULATOR_ARM64`, and `MACOS_ARM64`;
build types are `DEBUG` and `RELEASE`. The selected pair must identify an actual
KGP Framework. It does not create a target or change the build type.

An XCFramework is a distribution containing slices, not a merged analysis input.
Multiple independent products or multiple binaries matching the same typed pair
fail explicitly. KMP Lens has no free-text product selector.
