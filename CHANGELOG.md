---
layout: default
title: Release status
description: Publication status of KMP Lens.
eyebrow: Releases
permalink: /changelog/
---

# Release status

## 0.1.0-rc.5

**Status: RECOMMENDED.** Available from Maven Central.

RC5 improves symbol-level provenance for redeclared members, qualified
Kotlin/Native support, and exact source correspondence. It also retains the
RC4 report contract while reducing repeated Evidence and Apple-occurrence
work in large reports. These improvements do not establish dependency
replacement compatibility or eliminate every explicit coverage limit.

## 0.1.0-rc.4

**Status: SUPERSEDED / HISTORICAL.** Available from Maven Central.

KMP Lens 0.1 helps investigate Apple APIs, declaration ownership, dependency
routes, generated support and optional local source, with compatibility reported
by knowledge family. See [Understanding the report]({{
'/understanding-the-report/' | relative_url }}) for the current product model.

RC4 keeps exact symbol-level evidence while improving large-report execution,
including indexed exact joins, report-scoped identity reuse and streamed SOURCE
ON DWARF parsing. SOURCE ON still performs the debug-evidence work required for
exact source attachment.

It also introduces the canonical `kmpLens` DSL and `generateKmpLensReports`
task, one-product/one-slice selection, slice-scoped report directories,
Configuration Cache support, automatic generated-source observation and
transactional publication after successful build completion. Build provenance
is followed through Gradle producer relationships; users do not need to add
manual `dependsOn` wiring.

Kotlin/Native evidence acquisition and generated-support classification were
expanded with conservative authority checks, including qualified 2.4.20
families. Unverified evidence remains explicitly unestablished rather than
being inferred from names or shapes.
