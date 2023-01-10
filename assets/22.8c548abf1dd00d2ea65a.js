(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 加载机制\n\n`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载，我们可以通过继承不同类型的基类，来进行功能分类\n\n## 文件分类\n### 控制器类\n\n继承 `Controller` 基础类\n\n```ts\nimport { Route, Controller } from '@daze/framework'\n\n@Route('example')\nexport default class Example extends Controller {\n  // ...\n}\n\n```\n\n### 中间件类\n继承 `Middleware` 基础类\n\n```ts\nimport { Middleware, Component } from '@daze/framework'\n\n@Component('example')\nexport default class Example extends Middleware {\n  resolve(request, next) {\n    // ...\n    return next()\n  }\n}\n\n```\n\n\n### 服务类\n\n继承 `Service` 基础类\n\n```ts\nimport { Service, Component } from '@daze/framework'\n\n@Component('example')\nexport default class Example extends Service {\n  // ...\n}\n\nmodule.exports = Example;\n```\n\n### 验证器类\n\n继承 `Validator` 基础类\n\n```ts\nimport { Validator, Component } from '@daze/framework'\n\n@Component('example')\nexport default class Example extends Validator {\n  resolve(data) {\n    return data;\n  }\n}\n```\n\n### 资源类\n\n继承 `Resource` 基础类\n\n```ts\nimport { Resource, Component } from '@daze/framework'\n\n@Component('example')\nexport default class Example extends Resource {\n  // ...\n}\n\n```\n\n### 通用类\n\n```ts\nimport { Component } from '@daze/framework'\n\n@Component('example')\nexport default class Example {\n  // ...\n}\n\n```\n\n## 忽略加载\n\n有时候我们不希望自动加载机制加载某个模块，可以使用 `@Ignore()` 标识\n\n```ts\nimport { Component, Ignore } from '@daze/framework'\n\n@Ignore()\n@Component('example')\nexport default class Example {\n  // ...\n}\n```");

/***/ })

}]);