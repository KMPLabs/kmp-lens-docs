---
layout: default
title: Privacy
description: What KMP Lens reads, writes, and does not transmit during a Gradle build.
eyebrow: Runtime behavior
permalink: /privacy/
---

# Privacy

The local HTML report can show explicitly enabled, redacted source excerpts;
treat archived reports with the same access controls as the repository they
describe.

KMP Lens runs locally as part of the Gradle build. It does not send project source code, build artifacts, analysis reports, or telemetry to the publisher.

## Local inputs and outputs

KMP Lens observes local Gradle model data and build artifacts required for analysis. With SOURCE OFF, it does not scan project source roots for source correlation. With SOURCE ON, it reads authorized local Kotlin source roots to establish qualified source correspondence.

The HTML report is written to the configured local report directory. It can
include project identifiers, dependency information, artifact identities,
paths and—when SOURCE ON is enabled—local source locations. Treat it as a
project build artifact and apply your organization’s retention and sharing
policy.

## Scope of this statement

Gradle may access repositories configured by the project to resolve plugins and dependencies. Compilers, plugins, and other build tools may have their own behavior and policies. This statement concerns KMP Lens’s runtime behavior.
