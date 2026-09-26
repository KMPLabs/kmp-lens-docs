---
layout: default
title: Automation and CI
description: Generate and retain the KMP Lens developer report in a normal CI build.
eyebrow: Automation
permalink: /ci/
---

# Automation and CI

KMP Lens `0.1.0` is available from Maven Central. Apply the plugin as
shown in [Getting started]({{ '/getting-started/' | relative_url }}).

Run the normal Apple framework build. KMP Lens performs one passive analysis;
there is no separate CI task:

```bash
./gradlew <your-framework-task>
```

KMP Lens reuses the same analysis and writes `kmp-lens-report.html` for
developers. Archive the HTML file together with its adjacent
`kmp-lens-report/` support directory if the report must remain browsable after
the CI job ends.

## Privacy by default

Apply your repository's usual artifact-access policy to an archived report:
explicitly enabled SOURCE observation can include redacted project source
excerpts, project identifiers and dependency information.

KMP Lens does not fail builds by default and does not invent architecture
scoring. A family marked Unverified means best-effort for that family; it is
not a global failure.

## Reading the summary

The total shown in the report is a canonical Apple-symbol count, not a count of
header lines or result cards. Origin, Generated support, Context only and Not
established describe distinct developer-facing outcomes. Source attachment and
dependency routes are separate facts, not alternative ownership categories.
