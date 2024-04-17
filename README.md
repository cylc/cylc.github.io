# Source for the Cylc web site.

Small tweak for testing deployment to GitHub Pages in developer forks:

```console
$ git grep -A 3 -B 1 "DEVELOPER FORK"
_config.yml-
_config.yml:# DEVELOPER FORK (GH user "bob") for testing changes:
_config.yml-# baseurl: "/cylc.github.io"
_config.yml-# url: "https://bob.github.io/cylc.github.io"
_config.yml-
```
