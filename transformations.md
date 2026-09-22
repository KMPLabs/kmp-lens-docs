---
layout: default
title: Transformation compilers
description: See how supported integrations report downstream changes without changing native declaration knowledge.
eyebrow: Observable downstream impact
permalink: /transformations/
---

# Transformation compilers

KMP Lens separates detailed Kotlin/Native declaration analysis from downstream transformation reporting.

<div class="flow">Kotlin/Native Objective-C surface
      ↓
Downstream transformation
      ↓
Published Objective-C surface + generated files</div>

## What the report shows

A supported integration can report:

- transformer detection and version;
- supported or unsupported status;
- affected build scope;
- relevant input and output artifacts;
- before/after sizes when directly comparable;
- generated artifact inventory and measured footprint.

## Native knowledge remains intact

A transformation does not change information already established about the
native Kotlin/Native surface. Its section explains what changed afterward.

If the integration cannot observe a detected transformer version, the report
identifies that limitation and keeps its footprint unknown.
