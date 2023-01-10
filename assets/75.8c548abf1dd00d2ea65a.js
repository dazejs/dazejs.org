(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[75],{

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 快速上手\n我们从这里开始创建一个 `Daze.js` 应用。\n\n---\n\n## 环境\n为了更好的性能与稳定性，我们推荐使用 `LTS` 版本的 `Node.js`\n\n> Node.js > 10.15.x\n \n## 构建\n使用我们提供的 `Daze CLI` 工具，可以快速建立应用，使用 `npm` 安装命令行工具：\n\n```bash\n# 安装 CLI 工具\n$ npm install -g @dazejs/cli\n\n# 创建 Daze.js 工程\n$ daze create daze-example\n```\n\n> 支持选择 typescript 和 javascript 开发环境\n\n## 运行\n安装成功之后，执行以下命令来启动应用服务：\n```bash\n# 进入工程 目录\n$ cd daze-example\n\n# 开启服务，默认 8080 端口\n$ npm start\n```\n\n打开浏览器并访问 `http://localhost:8080` 即可看到默认展示信息。\n\n## 目录\n\n```text\n.\n├── dist                        // \b\b打包目标目录\n├── logs                        // 日志目录\n├── package.json\n├── public                      // 静态资源目录\n├── src                         // 源码目录\n│   ├── app                     // 应用目录\n│   │   ├── controllers          // 控制器目录（推荐）\n│   │   ├── middlewares          // 中间件目录（推荐）\n│   │   ├── services             // 服务类目录（推荐）\n│   │   ├── resources            // API 资源目录（推荐）\n│   │   ├── components           // 通用组件目录（推荐）\n│   │   ├── validators           // 验证器目录（推荐）\n│   ├── config                  // 应用配置目录\n│   │   ├── app.js\n│   │   ├── cookie.js\n│   │   ├── database.js\n│   │   ├── logger.js\n│   │   ├── messenger.js\n│   │   ├── middleware.js\n│   │   └── session.js\n│   └── index.js                // 应用入口文件\n└── views                       // 视图文件目录\n    └── hello.html\n```\n\n> 框架约定了默认的目录结构，但是可以通过获取 `Application` 实例的时候指定目录结构");

/***/ })

}]);