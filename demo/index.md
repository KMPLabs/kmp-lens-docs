---
layout: default
title: KMP Lens RC5 demo report
description: Explore a real Apple-framework report generated with KMP Lens 0.1.0-rc.5.
permalink: /demo/
---

# KMP Lens RC5 demo report

This [interactive report]({{ '/demo/kmp-lens-report.html' | relative_url }}) was generated with **KMP Lens 0.1.0-rc.5** from the public [KMP Lens showcase](https://github.com/KMPLabs/kmp-lens-showcase), using its `iosSimulatorArm64` Debug framework with source observation enabled. Explore the [showcase ground truth](https://github.com/KMPLabs/kmp-lens-showcase/blob/main/GROUND_TRUTH.md) alongside the report.

The report covers 2,175 Apple symbols: 1,543 exact Origins, 575 Kotlin/Native generated-support symbols, 57 Context-only symbols, and 0 Not established. It identifies 42 exact Kotlin Source locations.

The [documented RC5 interpretation and limits](https://github.com/KMPLabs/kmp-lens-showcase#interpretation-and-limits) apply. Redeclared `ShowcaseService.name` and `title` retain their `:showcase` Origin, `KotlinSuspendFunction1` is shown as generated support, and `PlatformIdentity` points to its iOS actual source. The `SettlementPlan.dueDate` card shows its `LocalDate` source signature but does not establish an explicit card-level type relation to the Maven declaration. Kotlin/Native 2.2.21 is unverified for this run, and dependency paths do not establish exact build-script source locations. Use the showcase ground truth as an independent comparison authority.

This is a demonstration of an observed Apple surface—not a proof of dependency replacement compatibility, runtime equivalence, or binary-size impact.
