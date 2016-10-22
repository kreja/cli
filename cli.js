#!/usr/bin/env node

require('yargs')
  .commandDir('cmds')
  .demand(1)
  .help()
  .alias('h', 'help')
  .argv;