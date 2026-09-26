---
layout: default
title: Release lifecycle
description: Publication and recommendation status of KMP Lens releases.
eyebrow: Version policy
permalink: /release-lifecycle/
---

# Release lifecycle

KMP Lens is publicly available. The current recommended release is
**0.1.0-rc.5**.

Published artifacts remain immutable and available so existing builds can
resolve their exact versions. KMP Lens does not expire or disable old releases.

- **PLANNED** — not yet published; no installation recommendation.
- **RECOMMENDED** — the published version preferred for new installations.
- **SUPERSEDED / HISTORICAL** — an older published release remains available,
  but a newer release is recommended for new usage.

`SUPERSEDED` does not mean deleted, revoked, incompatible, scientifically
invalid, or unusable. It changes the recommendation, not the artifact.

The public product documentation describes the current release only. Complete
public release history belongs in release tags, release records and Maven
Central. Functional pages are product guides, not release diaries.

The [release summary]({{ '/changelog/' | relative_url }}) and installation guide
must not announce a release as available before publication is verified.
