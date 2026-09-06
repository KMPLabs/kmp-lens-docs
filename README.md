# KMP Lens documentation staging

Minimal public documentation for KMP Lens 0.1.0-RC.3.

## Local preview

```shell
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll build --destination _site --baseurl /kmp-lens-docs
bundle exec ruby scripts/serve-local.rb _site 4173 /kmp-lens-docs
```

Open <http://127.0.0.1:4173/kmp-lens-docs/>.
