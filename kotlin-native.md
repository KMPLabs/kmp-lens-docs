---
layout: default
title: Kotlin/Native analysis
description: Understand the Apple symbols KMP Lens can explain from a Kotlin/Native framework build.
eyebrow: KMP Lens 0.1 Apple API boundary
permalink: /kotlin-native/
---

# Kotlin/Native analysis

KMP Lens 0.1 analyzes the Apple API observed in the framework produced by the current
Kotlin/Native build.

For an exact Apple symbol, the report may establish:

- its Objective-C declaration and container;
- its Kotlin library identity;
- an Origin such as a local module, Maven component or Kotlin standard library;
- dependency paths from the framework producer to that Origin;
- a qualified generator for a generated Apple form;
- local Kotlin source correspondence when SOURCE ON is enabled.

## When one answer cannot be established

KMP Lens keeps multiple candidates visible rather than selecting one by name.
If an applicable answer is still not established, the report says so. A missing
answer is not a build failure, and an unverified toolchain remains allowed to
run on a best-effort basis.

Kotlin/Native runtime support, Kotlin standard-library Origin and application
Origin are different concepts. See [Generated symbols]({{
'/generated-symbols/' | relative_url }}) and [Understanding the report]({{
'/understanding-the-report/' | relative_url }}).
