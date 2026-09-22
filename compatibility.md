---
layout: default
title: Compatibility
description: Exact qualified configurations and the best-effort behavior of every other profile.
eyebrow: Exact profiles, not version ranges
permalink: /compatibility/
---

# Compatibility

KMP Lens reports observation and compatibility by **knowledge family**. It does not collapse
Kotlin, Kotlin/Native, Gradle, Apple targets and optional integrations into one
global pass/fail verdict.

| State | Meaning |
|---|---|
| **Observed** | KMP Lens acquired this family's input in the current run. This is not by itself a compatibility claim. |
| **Not observed** | The required input was absent from this run. This is not a version verdict. |
| **Qualified** | This exact family profile was exercised. |
| **Unverified / best effort** | KMP Lens continues, but makes no compatibility promise for this exact profile. |
| **Not active** | The optional integration was not present in this run. |
| **Out of scope** | That knowledge family does not apply to the observed product. |

An unverified family does not erase independently qualified answers. Missing
facts remain missing; KMP Lens does not invent them to make a profile appear
compatible.

## Complete profiles exercised end to end

At these exact points, all listed knowledge families were exercised together.
They remain useful integration controls, but are not one global compatibility
authority and do not create continuous Kotlin or Gradle ranges.

| KGP | Effective compiler | Kotlin/Native | Gradle |
|---|---|---|---|
| 2.4.10 | 2.4.10 | 2.4.10 | 9.5.0 |
| 2.4.10 | 2.4.10 | 2.4.10 | 9.3.0 |
| 2.3.21 | 2.3.21 | 2.3.21 | 9.3.0 |
| 2.3.21 | 2.3.21 | 2.3.21 | 9.1.0 |

Individual knowledge families are also qualified on additional exact authority
points. This does not create a continuous support range.

| Exact profile | Framework and Apple header | Gradle graph | Stock declaration relation |
|---|---|---|---|
| Kotlin/KGP/Native 2.0.21 · Gradle 8.5 | **Qualified** | **Qualified** | **Not active** — the required selector observation is not exposed by this compiler |
| Kotlin/KGP/Native 2.1.20 · Gradle 8.11.1 | **Qualified** | **Qualified** | **Not active** — the required selector observation is not exposed by this compiler |
| Kotlin/KGP/Native 2.2.20 · Gradle 8.5, 8.9 or 8.14 | **Qualified at each listed point** | **Qualified at each listed point** | **Not active** — the required selector observation is not exposed by this compiler |
| Kotlin/KGP/Native 2.3.21 · Gradle 9.3.0 | **Qualified** | **Qualified** | **Qualified exact profile** |
| Kotlin/KGP/Native 2.4.10 · Gradle 9.1.0, 9.3.0 or 9.5.0 | **Qualified at each listed point** | **Qualified at each listed point** | **Qualified at each listed point** |

“Not active” is not “unsupported”. KMP Lens still reports the framework,
published Apple header and Gradle architecture facts that it can observe; it
does not invent the missing KLIB-to-Apple relation. A complete Kotlin/Native
profile can remain unverified even when its independently qualified Gradle graph
is observed correctly.

## Qualification by knowledge family

This matrix is factorized. Each row states its own exact scope; it does not
claim that every cross-product of the rows was executed.

| Knowledge family | Kotlin / Native scope | Gradle scope | Target | Optional plugin scope | Notes |
|---|---|---|---|---|---|
| Framework and final Apple header | exact `2.0.21`, `2.1.20`, `2.2.20`, `2.3.21`, `2.4.10` cells above | the matching exact Gradle cells above | `iosSimulatorArm64` | none | Framework and final header observed; this does not imply a declaration relation. |
| Gradle graph, provider inputs and paths | Kotlin/KGP is an independent graph input, not graph-observer authority | exact Gradle authorities `8.5`, `8.9`, `8.11.1`, `8.14`, `9.1.0`, `9.3.0`, `9.5.0`, `9.6.1`, `9.7.0`, `9.7.1` | producer and selected root-host controls | none | Each listed version is an exact point, not an interval. KGP may legitimately change graph content. Graph facts never reconstruct source or Apple export causality. |
| Stock declaration relation | exact qualified KGP/effective compiler/Kotlin/Native profiles for `2.3.21` and `2.4.10` | independent; provider/path facts retain their separate Gradle graph authority | `iosSimulatorArm64` debug framework | none | Exact Native relation authorities only. On earlier tested compilers this family is not active. |
| Local Kotlin source attachment | SOURCE ON cells in the representative matrix | matching exact cells | `iosSimulatorArm64` | none | Source is attached only after an exact symbol relation exists. SOURCE OFF omits it. |
| SKIE generated suspend wrappers | exact Kotlin/KGP/Native `2.4.10` | independently confronted profile | `iosSimulatorArm64` | SKIE `0.10.14` | Other SKIE versions and targets remain unverified. |

Matching version strings alone do not guarantee that two compiler distributions expose the same observable build
facts, so the report records compiler and Kotlin/Native identities separately
when they are available.

## Qualified Apple targets

| Apple target | Status | Scope |
|---|---|---|
| `iosArm64` | **Qualified** | Existing KMP Lens 0.1 Apple-target coverage. |
| `iosSimulatorArm64` | **Qualified** | Existing KMP Lens 0.1 simulator coverage. |
| `macosArm64` | **Qualified — exact cell** | macOS Apple Silicon host; KGP/compiler/Kotlin/Native 2.4.10; Gradle 9.5.0. |
| `macosX64` | **Unverified** | Not exercised by the macOS ARM64 campaign. |

This table does not mean that every host, architecture or toolchain combination
for those targets is qualified.

## Qualified SKIE contribution

SKIE-generated suspend-wrapper forms are qualified for SKIE 0.10.14 with
Kotlin/KGP/Kotlin/Native 2.4.10 on `iosSimulatorArm64`. Other SKIE versions or
Apple targets remain unverified; their presence is not treated as an
incompatibility.

## Unverified configurations

Any family whose required authority does not exactly match a qualified point is
**Unverified / best effort**, not unsupported. KMP Lens continues and reports
the facts available in that run. This includes older and future versions,
KGP/compiler decoupling, unregistered Gradle versions and Kotlin 2.5 development
canaries. An unrelated version does not invalidate an independently qualified
family.

## Known incompatibilities

None are currently published. A profile belongs here only after an exact
incompatibility is reproduced and documented. Absence from the qualified tables
is not an incompatibility.
