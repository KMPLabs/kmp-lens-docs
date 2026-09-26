---
layout: default
title: Architecture insight for Kotlin Multiplatform
description: Understand the Apple API produced by a Kotlin Multiplatform build and where its declarations come from.
eyebrow: KMP Lens documentation
permalink: /
---

<section class="hero">
  <h1>See what reaches your Apple framework—and why.</h1>
  <p class="lede">KMP Lens is a Gradle build analysis tool for Kotlin Multiplatform projects targeting Apple platforms.</p>
  <div class="actions">
    <a class="button" href="{{ '/getting-started/' | relative_url }}">Get started</a>
    <a class="button secondary" href="{{ '/understanding-the-report/' | relative_url }}">Understand the report</a>
  </div>
</section>

KMP Lens 0.1 observes a normal Kotlin Multiplatform build and explains its final Apple
API. For each symbol, the report shows the strongest answer the build can
establish: why it is visible, who owns it, what generated it, how its dependency
is reached, and—when enabled—its Kotlin source correspondence.

<div class="grid">
  <article class="card">
    <h2>What is this?</h2>
    <p>A passive Gradle analyzer for the Apple API produced by your normal KMP build.</p>
  </article>
  <article class="card">
    <h2>Where did it come from?</h2>
    <p>The report distinguishes an established Origin from useful context and from an answer the run could not establish.</p>
  </article>
  <article class="card">
    <h2>What changed?</h2>
    <p>Qualified generators such as Kotlin/Native and SKIE are shown separately from the declaration's Origin.</p>
  </article>
</div>

## A normal build is the workflow

Install the plugin, run your project’s normal Gradle build, then open the generated HTML report. SOURCE observation is off by default and can be enabled explicitly.

## Availability

The current public release is **0.1.0-rc.5**, available from Maven Central.

| Release status | Version |
|---|---:|
| Recommended public release / Released | `0.1.0-rc.5` |

See [Getting started]({{ '/getting-started/' | relative_url }}) for the normal
workflow and [Release lifecycle]({{ '/release-lifecycle/' |
relative_url }}) for the publication policy.

## Read the result, not KMP Lens internals

The developer report has four parts: Overview, Run Summary, Dependencies and
Investigate. Start with [Understanding the report]({{
'/understanding-the-report/' | relative_url }}) to learn what Origin, Generated
by, Context, Kotlin Source and Dependency paths mean.

## Discover without knowing a symbol name

Start with **Exact origin**, **Generated support**, **Context only**, or
**Not established**. Drill into an owner, generator or observed context, then
open an individual symbol. Groups organize answers; they do not assign an
Origin to a symbol. Search remains global to the framework.
