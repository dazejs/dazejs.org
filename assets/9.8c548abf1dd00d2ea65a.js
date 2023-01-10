(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 多环境\n\n框架支持根据不同环境加载配置\n\n## 设置环境\n\n使用环境变量 `DAZE_ENV` 来指定运行环境：\n\n```bash\n$ DAZE_ENV=dev npm run dev\n```\n\n## 环境变量\n\n当 `NODE_ENV` 未配置的时候，框架会根据 `DAZE_ENV` 的值自动配置 `NODE_ENV`：\n\n| DAZE_ENV | NODE_ENV    |\n| -------- | ----------- |\n| dev      | development |\n| test     | test        |\n| prod     | production  |\n\n除了以上对应关系，任何 `DAZE_ENV` 的值都会使 `NODE_ENV` 的值为 `production`\n\n`DAZE_ENV` 还可以被用来加载多环境配置文件\n\n所以我们只需要（强烈建议）配置 `DAZE_ENV` 的值即可\n\n\n\n## 自定义环境\n例如我们需要增加一个模拟生产环境，我们只需要将 `DAZE_ENV` 设置为 `sim`，应用启动时就会加载以 `.sim.js` 为后缀的配置文件\n");

/***/ })

}]);