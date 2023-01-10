(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 依赖注入\n\n依赖注入（`Dependency Injection`）简称 `DI`, 它是实现控制反转（`Inversion of Control – IoC`）的一个模式, `DI` 的本质目的是为了解耦，保持组件之间的松散耦合，为设计开发带来灵活性。\n\n---\n\n## 类属性注入\n\n使用 `@inject` 来注入依赖对象\n\n```ts {5}\nimport { route, http, Controller, inject } from '@dazejs/framework';\nimport UserService from '../serv/user'\n\n@route('/examples')\nexport default class Example extends Controller {\n\n  @inject(UserService) userService: UserService;\n\n  @http.get()\n  index() {\n    // this.userService.foo()\n  }\n}\n```\n---\n\n## 类方法注入\n\n使用 `@inject` 来注入依赖对象\n\n```ts {6}\nimport { route, http, Controller, inject } from '@dazejs/framework'\nimport UserService from '../service/user'\n\n@route('/examples')\nexport default class Example extends Controller {\n  @http.get()\n  index(@inject(UserService) userService: UserService) {\n    // ...\n  }\n}\n```\n\n---\n\n## 类构造函数注入\n\n```ts {4}\nimport { route, http, Controller, inject } from '@dazejs/framework'\nimport UserService from '../service/user'\n\n@route('/examples')\n@inject(UserService)\nexport default class Example extends Controller {\n  exampleComponent: UserService;\n\n  constructor(userService: UserService) {\n    this.userService = userService;\n  }\n  @http.get()\n  index() {\n    // ...\n  }\n}\n```");

/***/ })

}]);