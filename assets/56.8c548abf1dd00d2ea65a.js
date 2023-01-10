(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 应用配置\n\n框架提供了强大的配置管理功能，可以根据运行环境的不同使用指定的配置\n\n配置文件位于 `src/config` 目录下，框架提供了一些默认配置，也可以自行定义任何配置\n\n---\n\n## 配置实例\n\n我们可以简单的获取配置实例来操作配置，在控制器中我可以直接通过控制器属性获取：\n\n```ts {7}\nimport { controller, http, BaseController } from '@daze/framework';\n\n@controller('users')\nexport class User extends BaseController {\n  @http.get()\n  index() {\n    console.log(this.config.get('app.port'))\n  }\n}\n```\n\n---\n\n## 读取配置\n\n### `config.get([name [, default]])`\n- `name`: 配置名称，使用 `文件名.属性名.属性名...` 的方式获取\n- `default`: 默认值，当未获取到配置属性时，返回 `default` 的值\n\n```js\nthis.config.get('app.name', 'dazejs')\n```\n\n---\n\n## 修改配置\n\n### `config.set(name, value)`\n\n在框架运行期间，我们可以使用该方法动态的修改配置或者添加配置：\n```js\nthis.config.set('app.custom_config', 'haha')\n```\n\n> 如果开启了多进程，修改的配置只会在当前进程生效\n\n--- \n\n## 自定义配置\n\n框架支持自定义配置文件：\n\n首先我们需要在 `src/config/` 目录下创建一个新的文件，例如 `custom.js`\n\n然后我们在该文件中填充以下内容：\n\n```ts\nexport default {\n  prop1: 1,\n  prop2: 2,\n}\n```\n\n> 我们也可以直接定义函数或者数组等数据类型\n\n然后我们就可以使用 `get` 方法获取配置内容了：\n\n```js\nthis.config.get('custom.prop1')\n```\n\n---\n\n## 多环境配置\n\n框架拥有根据不同运行环境来读取不同配置的能力:\n\n```text\nsrc\n|- config\n| |- app.ts  \n| |- app.prod.ts\n| |- app.dev.ts\n```\n\n`app.ts` 为框架默认加载的配置文件，`app.dev.ts` 为框架在开发环境加载的配置文件，`app.prod.ts` 为框架在生产环境加载的配置文件，也就是说，当运行环境为生产环境时，框架会使用 `app.prod.ts` 覆盖 `app.ts` 中的同名属性（如果为对象）\n\n> 对象同名属性直接替换，不会再进行二次比较\n\n> `app.xxx.ts` 环境命名使用 `DAZE_ENV` 环境变量, 具体参考环境变量章节");

/***/ })

}]);