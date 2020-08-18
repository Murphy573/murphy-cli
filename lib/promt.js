const inquirer = require("inquirer");

exports.showTemplatePromt = async () => {
  try {
    let answers = await inquirer.prompt([
      {
        type: "list",
        message: "请选择您要生成的项目模板类型？",
        choices: [
          { name: "B端(PC)", value: "B" },
          { name: "C端(H5)", value: "C" },
          { name: "组件开发模版", value: "P" },
        ],
        name: "tempType",
      },
    ]);
    return answers.tempType;
  } catch (error) {
    return Promise.reject(error);
  }
};
