(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[93],{

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 服务层\n\n服务层（Service）是从控制器抽象出来的一层特定逻辑层，该层主要用于定义从第三方服务获取数据的方法。\n\n---\n\n## 服务定义\n\n`Service` 是一种特殊的组件，通过使用 `@Service` 来表示这是一个服务类\n\n```ts\nimport { Service } from '@dazejs/framework';\n\n@Service()\nexport default class User {\n  async getItemById() {\n    const data = await ajax.get(/* ... */)\n    return data\n  }\n}\n\n```\n\n---\n\n## 服务调用\n\n\n### 注入\n\n使用 `@Autowired` 装饰器注入到类属性或者方法中进行使用。\n\n```ts\nimport { BaseController, controller, http, Autowired } from '@dazejs/frameowrk'\nimport UserService from '../service/user'\n\n@controller('users')\nexport default class User {\n\n  @Autowired\n  userService: UserService; \n\n  @Get(':id')\n  async show(id) {\n    const user = await this.userService.getItemById(id);\n    return user;\n  }\n}\n\n```\n\n---\n\n\n");

/***/ })

}]);