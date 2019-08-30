---
layout: frontpage
title: a workflow engine
scripts:
  - assets/js/progress.js
---

## Cylc ("silk") is a workflow engine for cycling systems

Use cases include:

 * Running successive cycles of an environmental forecasting system.

 * Splitting long model integrations into many smaller chunks, with associated
   processing tasks for each chunk.

 * Running successive steps in some multi-task iterative process, such as for
   optimizing model parameters.

 * Processing a series of datasets (potentially concurrently, to the extent
   possible) as they are generated or received.

Cylc was originally developed for operational environmental forecasting at
[NIWA](http://www.niwa.co.nz) by [Dr Hilary
Oliver](mailto:hilary.oliver@niwa.co.nz) - however it is not specialized to
forecasting in any way. It is now an Open Source collaboration involving NIWA,
[Met Office](http://www.metoffice.gov.uk), and
[others](https://github.com/cylc/cylc/blob/master/CONTRIBUTING.md#code-contributors).
It is [available under the GPL v3 license](./license.html).

{% include feature.html content="Workflows are configured in a human-readable
text format, with programmatic templating - so you can use software development
power tools for workflow development." %}

{% include feature.html content="Scheduling is configured with an efficient
cycling graph notation, and task runtime properties with an efficient
inheritance hierarchy." %}

{% include feature.html content="Cylc respects inter-cycle dependence and
is not constrained by a traditional global cycle loop, so cycles can interleave
naturally for fast scheduling after delays, and for 'off the clock' operation." %}

{% include feature.html content="Cylc has low admin overhead and a small
security footprint, because there is no central server process to manage
workflows for all users." %}

{% include feature.html content="Plus <a href='features.html'>many other
features</a> to support both clock-triggered real time and free-flow
scheduling in research and operational environments." %}

If you use Cylc to automate your workflows, [please cite Cylc in your
publications](./documentation.html#publications-citations-and-references).

[Let us know](mailto:hilary.oliver@niwa.co.nz) if your organization
should be listed on this site with [Cylc Users](./users.html).
