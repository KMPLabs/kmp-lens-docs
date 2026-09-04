---
layout: default
title: Compatibility
description: How KMP Lens reports compatibility for the build it observed.
eyebrow: Current run authority
permalink: /compatibility/
---

# Compatibility

Use Java 17 and a Kotlin Multiplatform project that produces an Apple framework.

KMP Lens evaluates compatibility from the exact toolchain and build information
observed in the current run. The report's Compatibility block is the authority
for that run.

- **Qualified** means the displayed family and exact profile were exercised.
- **Unverified** means analysis continues on a best-effort basis without a
  compatibility promise for that exact profile.
- **Not active** means an optional input was not present.

These states do not form a continuous version range. An unverified family does
not erase independently established results, and KMP Lens does not invent
missing information.
