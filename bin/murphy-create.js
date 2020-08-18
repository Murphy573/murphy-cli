#!/usr/bin/env node

const program = require('commander');
const exists = require('fs').existsSync;
const path = require('path');
const chalk = require('chalk');
const logger = require('../lib/logger');
const inquirer = require('inquirer');
const promt = require('../lib/promt');
const repo = require('../lib/repo');
const ora = require('ora');
const download = require('download-git-repo');

/**
 * 定义命令行使用提示
 */
program.usage('<project-name>');

/**
 * Help.
 */

program.on('--help', () => {
  console.log('  示例:');
  console.log();
  console.log(chalk.gray('    # 创建一个新项目'));
  console.log('    $ murphy create my-project');
  console.log();
});

/**
 * Help.
 */

function help() {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();

/**
 * 模板设置
 */
const rawName = program.args[0];
const inPlace = !rawName || rawName === '.';
const to = path.resolve(rawName || '.');

/**
 * Padding.
 */
console.log();
process.on('exit', () => {
  console.log();
});

if (inPlace || exists(to)) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: inPlace
          ? `是否在 '${chalk.greenBright(rawName)}' 文件夹中生成项目?`
          : `已存在 '${chalk.greenBright(rawName)}' 文件夹，是否继续?`,
        name: 'ok',
      },
    ])
    .then(answers => {
      if (answers.ok) {
        run();
      }
    })
    .catch(logger.fatal);
} else {
  run();
}

async function run() {
  try {
    // 展示模板类型选择
    let tempType = await promt.showTemplatePromt();
    // 获取模板类型对应的仓库地址
    let repoUrl = repo.getRepo(tempType);
    // 开启loading
    const spinner = ora('正在下载模板').start();
    // 从仓库拉取
    download(repoUrl, rawName, err => {
      spinner.stop();
      spinner.fail();
      if (err) {
        logger.fatal(
          'Failed to download repo ' +
            JSON.stringify(err) +
            ': ' +
            err.message.trim(),
        );
        spinner.fail(`拉取远程仓库失败！`);
      } else {
        spinner.succeed(chalk.green('项目模板初始化完成'));
        friendlyPromt(rawName);
      }
    });
  } catch (error) {
    spinner.fail(`拉取远程仓库失败！`);
    logger.fatal(
      'Error: ' + JSON.stringify(error) + ': ' + error.message.trim(),
    );
  }
}

/**
 * 友情提示
 */
function friendlyPromt(projectName) {
  console.log();
  console.log();

  console.log(
    `  您可能需要进入 ${chalk.yellowBright(projectName)} 目录，做以下操作：`,
  );
  console.log(
    `    1. 打开 ${chalk.greenBright(
      'package.json',
    )}，按需修改name、version、description 等字段`,
  );
  console.log(`    2. 按需修改 ${chalk.greenBright('.env.*')} 环境配置文件`);
  console.log(`    3. 按需修改 ${chalk.greenBright('vue.config.js')} 配置文件`);
  console.log(`    4. 执行 ${chalk.greenBright('npm i ')}`);
}
