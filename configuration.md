---
layout: default
title: Configuration
description: The minimal optional KMP Lens configuration.
eyebrow: Optional settings
permalink: /configuration/
---

# Configuration

No configuration block is required. Applying the plugin enables analysis and
keeps source observation off by default.

Enable local Kotlin source observation only when you want it:

```kotlin
kmpArchitectureAnalysis {
    sourceObservation {
        enabled.set(true)
    }
}
```

KMP Lens reads authorized local Kotlin source during the build and does not
upload it. The report only displays source when an exact attachment is
established.

Without this option, the report remains fully usable and simply omits source
sections.
