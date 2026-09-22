---
layout: default
title: Known limitations
description: Current KMP Lens 0.1 boundaries, exact qualification limits and known performance constraints.
eyebrow: Honest stopping points
permalink: /limitations/
---

# Known limitations

KMP Lens 0.1 reports only what the observed build can establish. Current limits include:

- compatibility claims are exact profiles, not continuous Kotlin, Gradle,
  Apple-target or SKIE version ranges;
- Kotlin 2.5 development runs are forward canaries and remain unverified;
- `macosX64` is unverified; the current macOS qualification is limited to one
  exact `macosArm64` profile;
- complete declaration-by-declaration Swift semantics are outside KMP Lens 0.1;
- SOURCE ON cannot attach every generated representation to an exact Kotlin
  declaration, keeps multiple compatible candidates unresolved, and does not
  automatically download Maven dependency sources;
- the resolved Gradle graph does not reconstruct Gradle build-script source;
- large Apple APIs can produce large reports. Investigate offers population and provenance/context groups before
  symbol cards; this reduces browsing effort, not the underlying report size;
- with the observed Kotlin/Native 2.4.0 macOS arm64 baseline, a cold metadata inspection of some Compose
  Foundation libraries can spend about 86–87 seconds inside the Kotlin/Native
  `klib dump-metadata-signatures` tool. KMP Lens is not the cause of that tool
  hotspot; later runs can reuse KMP Lens's bounded cache.

An unavailable answer is not automatically a KMP Lens defect. The report
distinguishes a relevant answer that was not established from a dimension that
does not apply.

See [Understanding the report]({{ '/understanding-the-report/' | relative_url
}}) and [Compatibility]({{ '/compatibility/' | relative_url }}).
