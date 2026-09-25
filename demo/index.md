---
layout: default
title: KMP Lens RC4 demo report
description: Explore a real Apple-framework report generated with KMP Lens 0.1.0-rc.4.
permalink: /demo/
---

# KMP Lens RC4 demo report

This [interactive report]({{ '/demo/kmp-lens-report.html' | relative_url }}) was generated with **KMP Lens 0.1.0-rc.4** from the public [KMP Lens showcase](https://github.com/KMPLabs/kmp-lens-showcase), using its `iosSimulatorArm64` Debug framework with source observation enabled. Explore the [showcase ground truth](https://github.com/KMPLabs/kmp-lens-showcase/blob/main/GROUND_TRUTH.md) alongside the report.

The report covers 2,175 Apple symbols: 1,543 exact Origins, 573 Kotlin/Native generated-support symbols, 57 Context-only symbols, and 2 Not established. It identifies 41 exact Kotlin Source locations.

The [documented RC4 limitations](https://github.com/KMPLabs/kmp-lens-showcase#interpretation-and-limits) still apply. In particular, redeclared `ShowcaseService.name` and `title` members have an incorrect Origin/Provider; the `SettlementPlan.dueDate` card does not fully explain its `LocalDate` type relation; and `KotlinSuspendFunction1` remains Not established. Kotlin/Native 2.2.21 is unverified for this run, and dependency paths do not establish exact build-script source locations. Treat the showcase ground truth as the independent reference where it disagrees with the report.

This is a demonstration of an observed Apple surface—not a proof of dependency replacement compatibility, runtime equivalence, or binary-size impact.
