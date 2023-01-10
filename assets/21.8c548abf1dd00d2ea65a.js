(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 视图\n框架内置了 [nunjucks](https://mozilla.github.io/nunjucks/) 作为框架模板引擎\n\n模板引擎的使用请参考 [Nunjucks 文档（中文）](https://mozilla.github.io/nunjucks/cn/templating.html)\n\n## 渲染模板\n使用 `render` 方法返回\n\n```ts\nimport { Controller, Route, Http, View } from '@dazejs/framework'\n\n@Route('examples')\nexport default class Example extends Controller {\n  @Http.Get('create')\n  create() {\n    return this.render('hello.njk', {\n      name: 'Zewail'\n    })\n  }\n}\n\n\n```\n\n我们的模板文件存放于根目录下的 `views` 文件夹中，上例使用了 `views/hello.njk` 模板文件，`View` 的构造函数共接受 2 个参数，第一个为模板路径，第二个参数为需要传递给模板文件的数据，类型为一个对象\n\n路径也支持子目录传递\n\n```ts\nreturn this.render('path/to/hello.njk', {\n  name: 'Zewail'\n})\n```\n这样就调用了 `views/path/to/hello.njk` 模板文件\n\n## 传递数据\n\n可以使用 `render` 方法的第二个参数进行传递\n```text\nthis.render([template] [, vars])\n```\n\n或者使用 `assign` 方法传递数据给模板\n```text\nthis.assign([key], [value])\n```\n\n### 示例\n```ts\nimport { Controller, Route, Http } from '@dazejs/framework'\n\n@Route('examples')\nexport default class Example extends Controller {\n  // 示例一\n  @Http.Get('create')\n  create() {\n    this.assign('name', 'Dazejs')\n    return this.render('hello.njk')\n  }\n\n  // 示例二\n  @Http.Get('edit')\n  edit() {\n    return this.render('hello.njk', {\n      name: 'Dazejs',\n    })\n  }\n}\n\n```\n");

/***/ })

}]);