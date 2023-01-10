(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[96],{

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 视图\n框架内置了 [nunjucks](https://mozilla.github.io/nunjucks/) 作为框架模板引擎\n\n模板引擎的使用请参考 [Nunjucks 文档（中文）](https://mozilla.github.io/nunjucks/cn/templating.html)\n\n---\n\n## 渲染模板\n使用 `view` 助手函数返回\n\n```ts\nimport { Controller, Get, view } from '@dazejs/framework'\n\n@Controller('examples')\nexport default class Example {\n  @Get('create')\n  create() {\n    return view('hello.html', {\n      name: 'Zewail'\n    })\n  }\n}\n\n\n```\n\n我们的模板文件存放于根目录下的 `views` 文件夹中，上例使用了 `views/hello.njk` 模板文件，`View` 的构造函数共接受 2 个参数，第一个为模板路径，第二个参数为需要传递给模板文件的数据，类型为一个对象\n\n路径也支持子目录传递\n\n```ts\nreturn view('path/to/hello.njk', {\n  name: 'Zewail'\n})\n```\n这样就调用了 `views/path/to/hello.njk` 模板文件\n\n---\n\n## 传递数据\n\n可以使用 `view` 方法的第二个参数进行传递\n```text\nview([template] [, vars])\n```\n\n\n### 示例\n```ts\nimport { Controller, Get, view } from '@dazejs/framework'\n\n@Controller('examples')\nexport default class Example {\n\n  @Get('edit')\n  edit() {\n    return view('hello.njk', {\n      name: 'Dazejs',\n    })\n  }\n}\n\n```\n");

/***/ })

}]);