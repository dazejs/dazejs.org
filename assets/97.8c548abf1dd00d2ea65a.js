(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[97],{

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 自动加载\n\n`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载，我们可以通过不用的类型装饰器来表示\n\n---\n\n## 模块分类\n### 控制器类\n\n使用 `@Controller()` 装饰器\n\n```ts\nimport { Controller } from '@dazejs/framework'\n\n@Controller('/example')\nexport class Example{\n  // ...\n}\n\n```\n\n> 同时提供了大写的别名 `@Controller()`\n\n### 中间件类\n使用 `@Middleware()` 装饰器\n\n```ts\nimport { Middleware, MiddlewareInterface } from '@dazejs/framework'\n\n@Middleware()\nexport class Example implements MiddlewareInterface {\n  resolve(request, next) {\n    // ...\n    return next()\n  }\n}\n\n```\n> 中间件类需要实现 `MiddlewareInterface` 接口\n> 同时提供了大写的别名 `@Middleware()`\n\n### 服务类\n\n使用 `@Service()` 装饰器\n\n```ts\nimport { Service } from '@dazejs/framework'\n\n@Service()\nexport class Example {\n  // ...\n}\n```\n\n> 同时提供了大写的别名 `@Service()`\n\n### 验证器类\n\n使用 `@Validator()` 装饰器\n\n```ts\nimport { Validator, IsEmail } from '@dazejs/framework'\n\n@Validator()\nexport default class Example {\n  @IsEmail()\n  email: string;\n}\n```\n\n> 同时提供了大写的别名 `@Validator()`\n\n### 资源类\n\n使用 `@Resource()` 装饰器\n\n```ts\nimport { Resource, ResourceInterface } from '@dazejs/framework'\n\n@Resource()\nexport class Example implements ResourceInterface {\n  // ...\n}\n\n```\n\n> 资源类需要实现 `ResourceInterface` 接口\n> 同时提供了大写的别名 `@Resource()`\n\n### 通用类\n\n```ts\nimport { Component } from '@dazejs/framework'\n\n@Component()\nexport class Example {\n  // ...\n}\n\n```\n\n> 同时提供了大写的别名 `@Component()`\n\n---\n\n## 忽略加载\n\n有时候我们不希望自动加载机制加载某个模块，可以使用 `@ignore` 标识\n\n```ts\nimport { Ignore } from '@dazejs/framework'\n\n@Ignore\nexport class Example {\n  // ...\n}\n```\n\n> 同时提供了大写的别名 `@Ignore`\n\n---\n\n> 依赖注入详见 [依赖注入](#/docs/core/di) 章节");

/***/ })

}]);