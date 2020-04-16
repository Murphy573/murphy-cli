const inquirer = require('inquirer');

exports.showTemplatePromt = async () => {
  try {
    let answers = await inquirer.prompt([
      {
        type: 'list',
        message: '请选择你要生成的模板类型？',
        choices: [{ name: 'B端', value: 'B' }, { name: 'C端(H5)', value: 'C' }],
        name: 'tempType',
      },
    ]);
    return answers.tempType;
  } catch (error) {
    return Promise.reject(error);
  }
};
