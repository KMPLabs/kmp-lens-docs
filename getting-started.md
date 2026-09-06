---
layout: default
title: Getting Started
description: Install KMP Lens, run an Apple framework build and open the report.
eyebrow: Three steps
permalink: /getting-started/
---

# Getting Started

KMP Lens runs as part of a normal Gradle build. It does not replace your build
task or change the framework it observes.

## 1. Make the plugin available

In `settings.gradle.kts`:

```kotlin
pluginManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}
```

## 2. Apply KMP Lens

Apply the plugin to the KMP module that produces the Apple framework. If you do
not yet know the producer, you can apply it to the root project and let the
report identify the observed producer.

```kotlin
plugins {
    id("io.github.kmplabs.kmp-lens") version "0.1.0-rc.3"
}
```

This release candidate is available from Maven Central.

## 3. Build and open the report

Run the Apple framework task your project already uses, for example:

```shell
./gradlew linkDebugFrameworkIosSimulatorArm64
```

Open:

```text
build/reports/kmp-lens/kmp-lens-report.html
```

The path is relative to the Gradle project where KMP Lens is applied.
