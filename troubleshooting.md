---
layout: default
title: Troubleshooting
description: Essential checks for reaching a KMP Lens report.
eyebrow: Essential checks
permalink: /troubleshooting/
---

# Troubleshooting

## No report was created

Confirm that the plugin is applied and that the executed task actually builds
an Apple framework. A configuration-only Gradle command does not produce an
Apple framework for KMP Lens to observe.

## The report shows an unverified compatibility family

The analysis still completes on a best-effort basis. Open the report's
Compatibility block to see which observed family has not been qualified for
that exact profile.

## Source observation is on but no source appears

Source observation permits correlation; it does not guarantee that every Apple
symbol has one exact Kotlin declaration. KMP Lens leaves uncertain attachments
out of the report.

## The report belongs to a different directory than expected

Look under the build directory of the Gradle project where the plugin is
applied. That project can differ from the framework producer when KMP Lens is
applied at the root.
