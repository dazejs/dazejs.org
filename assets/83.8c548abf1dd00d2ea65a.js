(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[83],{

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# Http 代理\n\n通过 Http 代理，可以把请求转发到其他服务\n\n## 如何使用\n\n框架提供了 `HttpProxy` 类，来声明返回的结果为一个代理器\n\n```ts\nimport { Controller, Get, HttpProxy } from '@dazejs/framework'\n\n@Controller()\nexport class ExampleController {\n  @Get('/xhr/path-to-request/*')\n  index() {\n    return new HttpProxy().target('http://100.10.10.10:8080')\n  }\n}\n```\n\n上述例子将会把请求 `/xhr/path-to-request/any-path` 转发到 `http://100.10.10.10:8080/xhr/path-to-request/any-path`\n\n## 路径重写\n\n`HttpProxy` 实例提供了 `rewrite` 路径重写功能\n\n```ts\nimport { Controller, Get, HttpProxy } from '@dazejs/framework'\n\n@Controller()\nexport class ExampleController {\n  @Get('/xhr/path-to-request/*')\n  index() {\n    return new HttpProxy()\n      .target('http://100.10.10.10:8080')\n      .rewrite((path) => {\n        return path.replace(/^/my_xhr/i, '/xhr')\n      })\n  }\n}\n```\n\n## 修改请求头\n\n```ts\nhttpProxy.headers({ Host: 'my.example.com' })\n```\n\n## 修改 Origin\n\n```ts\nhttpProxy.changeOrigin()\n```\n\n## 代理配置化\n\n框架支持配置化的代理方式\n\n在 `src/config` 目录下，新建一个 `proxy.ts` 文件\n\n```ts\nexport default {\n  '/xhr/example/*': {\n    target: 'http://example/com',\n    rewrite: (p: string) => {\n      return p.replace('/xhr/example', '')\n    }\n  }\n}\n```");

/***/ })

}]);