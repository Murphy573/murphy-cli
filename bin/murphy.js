#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('create', '生成一个项目模板');

program.parse(process.argv);
