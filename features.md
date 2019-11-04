---
layout: home
title: Cylc Features
permalink: /features/
---
# Cylc Features
{:.no_toc}

* replace-me
{:toc}

## Production Ready

Cylc is not just a research tool. It has been used 24/7 for production weather
forecasting since 2010.

## Cylc Does Cycling Properly

For repetitive processing Cylc "unwinds the loop" to create a single
non-cycling workflow composed of individual cycling tasks, with explicit
cross-cycle dependence. Consequently it can run cycling systems very
efficiently, as explained on the [front page of this website]({{'' |
relative_url}}).

If there is no cross-cycle dependence Cylc will run multiple cycles
concurrently, limited only by external resource and configurable internal
queues and cycle "runahead" constraints.

General ISO 8601 compliant date-time cycling supports all weather and climate
type worklows, and integer-based cycling supports arbitrary repetitive
workflows.

## Architecture

Cylc is a distributed system - each workflow gets its own ad hoc server
program that runs as the user, and only relies on the filesystem (e.g. no
database servers to manage). Consequently it has low admin overheads and a
small security footprint. Cross-workflow triggering is supported.

Each workflow is also a distributed in that task jobs can execute on remote
hosts.

## Workflow Configuration 

Cylc workflows are defined with a straightforward human-readable config file,
which makes small to modest workflows easy to write and understand, even by
non-programmers.

This is **not** "just a static config file": efficient programmatic
generation of large and complex workflows is supported by task inheritance and
parameterization, and Python-like general template processing (Jinja2 and
EmPy).

(However a Python API is also planned for Cylc 9).

## Performance and Scaling

Single workflows scale to thousands of tasks <i>per cycle</i> (however,
Cylc is a distributed system so several smaller workflows may be preferable).

In term of number of workflows, Cylc scales arbitrarily well with the number of
host VMs. It is built to transparently use a pool of host VMs, with start-time
load balancing. Running workflows can be told to self-migrate to another host
when system maintenance is needed.

## Flexibility and Generality

Cylc can feasibly be used for:
- every kind of workflow common to climate, weather, and weather-driving
  forecasting, in research and production
- portable workflows that can run "out of the box" in development, test, and
  production environments; and even at different sites.
  
This can lead to massive savings of time and effort, when large, complex
workflows are involved (transitioning workflows between research and operations,
for instance, is notoriously difficult if conversion is required - and it
is much worse again if conversion to a different workflow engine is required).

## User Interfaces

Cylc has a powerful CLI that can operate on many tasks at once (e.g. to
re-trigger all failed tasks in one cycle point without touching others)

It also has [powerful GUIs]({{'/screenshots' | relative_url}}) for
visualization and runtime monitoring and control
- Cylc 7.8.x (in production): Python 2 and GTK desktop GUIs
- Cylc 8.x (coming next year): Python 3 and a web UI

## HPC and Remote Host Support


Cylc has great support for HPC batch workload managers. It can also manage
plain background jobs on any Linux host or VM.

If you need to use ssh to reach a remote job host, Cylc supports that as well.
Remote platform support including file installation, filesystem configuration
and job log file retrieval. (Some of this via Rose but soon to be built in to Cylc).

## Clyc Workflows Are Resilient 

Cylc contains many features to help mitigate system problems, e.g.:
- configurable retries for both job submission and job execution
- polling checks that jobs are queued or running as expected, and updates job
  status if not
- failure triggering - define tasks that only run if another task failing
- safely restart from prior workflow state, even in the event of a power outage
- at restart Cylc even determines what happened to jobs that were orphaned
    when the system went down
- manual job control as a last resort: poll, kill, or retrigger jobs, 
- flexible event handling
  - connect arbitrary handler scripts to workflow- or task-level events
  - built-in aggregate email alerts (e.g. on failure of important tasks)

## Other Features in Brief

* Powerful web-based viewer for thousands of *job logs*
* *Validation* - catch many errors prior to run time.
* *Edit Run* - edit job scripts on the fly just before submission.
* *Broadcast* task runtime settings (including environment variables) to
  tasks or groups of tasks, at runtime.
* Easy to have special jobs at workflow start-up, shut-down, or any cycle between.
* *Simulation modes* with proportional job run length.
* *Internal Queues* to limit the number of simultaneously active tasks.
* *Conditional triggering*.
* *Clock-triggers* - trigger off the clock as well as off other tasks.
* *External triggers* - trigger off external events as well as other tasks - via
  user-defined Python plug-in functions.
* *Expiring tasks* - optionally skip tasks that are too far behind the clock.

## Data Modeling?

For maximum flexibility and generality, Cylc is a pure orchestration engine
that manages task execution according to *abstract dependencies*. It is left to
the workflow designer to make sure that the tasks use shared data areas or move
data around as needed, by whatever means is appropriate to your data types and
platforms. (Cylc does provide easy access to a self-contained shared data area
for each workflow). This is easy to do, and it avoids the risk of restrictive
assumptions or unnecessary data movement.

We do note however that there are good use cases for a "data modeling" approach
whereby the workflow structure self-assembles from explicit *data
dependencies*, and the workflow engine may automatically manage the data too.
Cylc actually uses a self-assembling workflow model internally, and we are
considering exposing this again as an option in the future.

## Cloud and Container Support?

Cylc doesn't have built-in support for cloud platforms or containers yet
because our traditional home base is production weather forecasting on HPC.
These technologies are definitely coming soon to HPC near you, but for the
moment you'll have to "roll your own" use of Cylc with them. That's easy enough
to do because Cylc runs on any Linux VM and the jobs that it manages can do
anything you want.
