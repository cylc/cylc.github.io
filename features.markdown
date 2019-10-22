---
layout: home
title: Features
---
### Features

* *Distributed suites* - run tasks on remote hosts.
* *Distributed architecture* - Cylc has no central server - each workflow gets
  its own ad hoc server program.
* Powerful web-based *job log viewer*.
* *Validation* - catch many errors prior to run time.
* Comprehensive *command line* and *graphical* user interfaces.
* Submit jobs to common HPC *resource managers* (PBS, slurm, etc.).
* Remote *job poll* and *job kill*. 
* *Edit Run* - edit job scripts on the fly just before submission.
* ISO 8601 compliant *date-time cycling* workflows.
* Integer cycling workflows.
* *Broadcast* task runtime settings (including environment variables) to
  tasks or groups of tasks, at runtime.
* Implement special behaviour at start-up, shut-down, and anywhere between.
* *Inter-suite dependence* - robust triggering off tasks in other suites.
* *Restart* from previous state - even recovers orphaned remote jobs.
* *Reload* modified suite configurations at run time.
* Group tasks into *families* for inheritance of shared settings, and mass
  triggering.
* *Failure recovery* by automatic task retries or alternate workflows.
* Flexible *event handling* - task and suite event hooks and timeouts.
* *Simulation mode* and *dummy mode* with proportional run length.
* Use the *Jinja2* and *EmPy* Template Processors for programmatic generation
  of workflow definitions.
* *Internal Queues* to limit the number of simultaneously active tasks.
* *Conditional triggering*.
* Generate many similar tasks efficiently by *parameter expansion*.
* *Clock-triggers* - trigger off the clock as well as off other tasks.
* *Event triggers* - trigger off external events as well as other tasks - via
  user-defined Python plug-in functions.
* *Expiring tasks* - optionally skip tasks that are too far behind the clock.
* Easily handles *several thousand tasks per cycle* in a single infinite
  cycling workflow.
* Run many workflows on a pool of hosts (with a shared filesystem):
  - automatic host selection at start-up
  - automatic on-demand migration of suite server programs to other available
    hosts (e.g. for server maintenance)
* Written in [Python](https://www.python.org).