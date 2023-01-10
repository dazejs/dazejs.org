(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[99],{

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 依赖注入\n\n依赖注入（`Dependency Injection`）简称 `DI`, 它是实现控制反转（`Inversion of Control – IoC`）的一个模式, `DI` 的本质目的是为了解耦，保持组件之间的松散耦合，为设计开发带来灵活性。\n\n---\n\n## 自动注入\n\n使用 `@Autowried` 来进行自动识别注入\n\n```ts {6}\nimport { Get, Controller, Autowired } from '@dazejs/framework'\nimport UserService from '../service/user'\n\n@controller('/examples')\nexport class Example {\n\n  @Autowired\n  userService: UserService;\n\n  @Get()\n  index() {\n    // this.userService.foo()\n  }\n}\n```");

/***/ })

}]);