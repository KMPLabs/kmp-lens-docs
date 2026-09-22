# KMP Lens documentation

This repository contains the public product documentation for KMP Lens. KMP Lens is proprietary software; its implementation source is not part of this repository.

Documentation site: <https://kmplabs.github.io/kmp-lens-docs/>

This checkout contains the prepared RC4 documentation. It must not be pushed or
deployed until the exact Maven Central release has passed fresh-consumer
resolution and publication has been explicitly authorized.

## Local preview

Requirements: Ruby, Bundler, and a local network connection for the first dependency installation.

```shell
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --baseurl /kmp-lens-docs
```

Open <http://127.0.0.1:4000/kmp-lens-docs/>.

## Contents

The site covers installation and placement, public configuration, CI automation, report
interpretation, source observation, generated symbols, exact qualified
compatibility points, privacy, known limitations, release lifecycle, licensing,
support, third-party notices, and the current publication status.

KMP Lens is proprietary software. All rights reserved.
