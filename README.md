## murphy-cli代码模版生成工具

### 背景

在项目初期，往往需要初始化项目内的一些配置，这个过程过于繁琐且容易出现配置不统一的情况；并且对于管理端和C端，其对应的项目基础配置一般不会有太大变动，经过一些积累，我们抽取了管理端和C端的通用模版，并参考`vue-cli2`实现基本的模版生成工具，开发者即可通过简单几行命令初始化一个项目，继续专注于业务代码开发。


### 模版主要目录说明

- build                 -- webpack相关配置
- public                -- index.html
- src
  - apis                -- 后台接口
  - assets              -- 静态资源（图片、字体、video、audio等）
  - components -- 全局组件目录
  - configs -- 常量、枚举等
  - directives -- 全局vue指令
  - filters -- 全局过滤器
  - libs   -- 第三方api库
  - mixins -- 全局混入
  - router -- 路由配置
    - interceptors -- 路由拦截
    - modules -- 路由页面模块配置
  - store  -- vuex全局数据中心
  - styles -- 全局样式
  - utils  -- 工具类
  - views  -- 具体页面
  - main.js -- 项目入口
- .env.*  -- webpack环境变量配置
- .eslintrc.js -- 项目代码格式化lint配置
- commitlint.config.js -- git提交信息校验
- vue.config.js -- vue工程相关配置



### 如何使用

#### 流程图

```
graph TD
A(create project)-->B{选择模版}
B-->|管理端| C[下载模版]
B-->|H5|C[下载模版]
C-->D[下载完成]
```

#### 使用命令

```bash
# 全局安装
$ npm install -g murphy-cli
# 创建项目
$ murphy create <project-name>
# cli界面选择模版类型
# 等待下载完成后，做一些项目名修改，安装依赖，npm start启动项目即可
```

**该命令将在 my-project 目录下生成对应项目模板**

### 您可能需要修改

- 打开 `package.json`，按需修改 `name`、`version`、`description` 等字段

- 按需修改 `.env.*` 环境配置文件

- 按需修改 `vue.config.js` 配置文件

- 执行 `npm i`
