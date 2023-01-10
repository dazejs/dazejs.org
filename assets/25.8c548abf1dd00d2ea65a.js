(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 依赖注入\n\n依赖注入（`Dependency Injection`）简称 `DI`, 它是实现控制反转（`Inversion of Control – IoC`）的一个模式, `DI `的本质目的是为了解耦，保持组件之间的松散耦合，为设计开发带来灵活性。\n\n## 认识 `Component`\n\n在 `Daze.js` 中，容器中注册的所有模块我们都称之为 `组件（Component）`, 组件之间可以相互依赖， 我们通过 `@Component` 装饰器来声明组件\n\n```ts {3}\nimport { Component } from '@dazejs/framework'\n\n@Component('example')\nexport default class Example {\n  // ...\n}\n```\n\n## 注入\n\n使用 `@userComponent` 来注入组件\n\n- 注入到类属性中\n\n```ts {5}\nimport { Route, Http, Controller, useComponent } from '@dazejs/framework'\n\n@Route('/examples')\nexport default class Example extends Controller {\n  @useComponent('example') exampleComponent;\n\n  @Http.Get()\n  index() {\n    // ...\n  }\n}\n\nmodule.exports = Example;\n```\n\n- 注入到类方法中\n\n```ts {6}\nimport { Route, Http, Controller, useComponent } from '@dazejs/framework'\n\n@Route('/examples')\nexport default class Example extends Controller {\n  @Http.Get()\n  @useComponent('example')\n  index(exampleComponent) {\n    // ...\n  }\n}\n```\n\n- 注入到类构造函数中\n\n```ts {4}\nimport { Route, Http, Controller, useComponent } from '@dazejs/framework'\n\n@Route('/examples')\n@useComponent('example')\nexport default class Example extends Controller {\n  constructor(exampleComponent) {\n    this.exampleComponent = exampleComponent;\n  }\n  @Http.Get()\n  index(exampleComponent) {\n    // ...\n  }\n}\n```");

/***/ })

}]);