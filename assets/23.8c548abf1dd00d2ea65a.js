(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 组件模式\n\n在 `Daze.js` 中，以特定方式在容器中注册的模块我们都叫做 `组件`，例如 `Service`、`Middleware`、`Validator` 等等都是组件\n\n## 注册到容器\n\n组件就是一个普通的类，借助于框架的自动加载机制，我们使用 `@Component(name)` 装饰器来进行组件的注册：\n\n```ts {3}\nimport { Component } from '@dazejs/framework'\n\n@Component('example')\nexport default class Example {\n  // ...\n}\n```\n\n::: tip\n如果组件继承了系统组件的基类(`Service`、`Middleware`、`Validator` 等等), 框架还会对这些组件进行进一步分类\n:::\n\n## 使用组件\n\n对于普通组件，我能可以通过 `@useComponent(name)` 装饰器进行注入来进行使用\n\n```ts\nimport { Controller, Route, Http, useComponent } from '@dazejs/framework'\n\n@Route('/example')\nexport default class Example extends Controller {\n  @useComponent('example') exampleComponent;\n\n  @Http.Get('/:id')\n  show() {\n    // use this.exampleComponent\n  }\n}\n\n```\n\n对于系统内置组件，框架封装了对应的获取装饰器从指定分类中获取（防止命名冲突）,使用 `@useService(name)` 类似的装饰器进行注入\n\n");

/***/ })

}]);