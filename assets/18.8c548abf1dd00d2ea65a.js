(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 服务\n\n服务（Service）是从控制器抽象出来的一层特定逻辑层，该层主要用于定义从第三方服务获取数据的方法。\n\n## 服务定义\n\n`Service` 是一种特殊的组件，通过继承 `Service` 基础类来表示这是一个服务类\n\n```ts\nimport { Service, Component } from '@dazejs/framework';\n\n@Component('user')\nexport default class User extends Service {\n  async getItemById() {\n    const data = await ajax.get(/* ... */)\n    return data\n  }\n}\n\n```\n\n\n## 服务调用\n\n### 方法获取\n\n在控制器中，使用 `this.service(name)` 的方式来获取 `service` 实例\n\n```ts\nimport { Controller, Route, Http } from '@dazejs/frameowrk'\n\n@Route('users')\nexport default class User extends Controller {\n  @Http.Get(':id')\n  async show(id) {\n    const userService = this.service('user');\n    const user = await userService.getItemById(id);\n    return user;\n  }\n}\n\n\n```\n\n### 注入\n\n使用 `@userService(user)` 装饰器注入到类属性或者方法中进行使用。\n\n```ts\nimport { Controller, Route, Http, useService } from '@dazejs/frameowrk'\n\n@Route('users')\nexport default class User extends Controller {\n\n  @useService('user') userService;\n\n  @Http.Get(':id')\n  async show(id) {\n    const user = await this.userService.getItemById(id);\n    return user;\n  }\n}\n\n```");

/***/ })

}]);