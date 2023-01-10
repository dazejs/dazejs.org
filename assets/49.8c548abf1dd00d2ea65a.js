(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# Apache Dubbo\n\n这是一套基于 Daze.js 的 Dubbo 的扩展，提供了服务端和客户端的一整套解决方案。\n\n---\n\n## 开始\n\n### 安装\n\n```bash\n$ npm install --save @dazejs/dubbo-provider\n```\n\n### 加载服务提供者\n\n添加 `DubboServiceProvider` 到 `src/config/app.ts` 配置中\n\n```ts\nimport { DubboServiceProvider } from '@dazejs/dubbo-provider';\n\nexport default {\n  // ...\n  providers: [\n    // ...\n    DubboServiceProvider\n  ]\n  // ...\n}\n```\n\n### 添加/修改配置中心设置\n\n`src/config/` 目录下创建 `dubbo.ts` 配置文件:\n\n```ts\nexport default {\n  default: {\n    type: 'zookeeper',\n    host: '127.0.0.1:2181',\n  }\n}\n```\n\n---\n\n## 使用\n\n### 服务端 (Provider)\n\n##### 定义提供者\n\n```ts\nimport { DubboProvider, dubbo } from '@dazejs/dubbo-provider';\n\n@dubbo.registry('default')\n@dubbo.interfaceName('com.daze.dubbo.service.Demo')\nexport default class extends DubboProvider {\n  @dubbo.method()\n  sayHello(name: string) {\n    return `Hello ${name}`;\n  }\n}\n```\n\n### 客户端 (Consumer)\n\n##### 定义消费者\n\n```ts\nimport { DubboConsumer, dubbo } from '@dazejs/dubbo-provider';\n\n@dubbo.registry('default')\n@dubbo.interfaceName('com.daze.dubbo.service.Demo')\nexport default class extends DubboConsumer {\n}\n```\n\n##### 注入并使用\n\n```ts\nimport { Controller, route, http, inject } from '@dazejs/framework';\nimport { java } from '@dazejs/dubbo-provider';\nimport DemoConsumer from '../dubbo/consumers/demo';\n\n@route()\nexport default class extends Controller {\n\n  @inject(DemoConsumer) demoConsumer: DemoConsumer;\n\n  @http.get()\n  async index() {\n    const res = await this.demoConsumer.invoke('sayHello', [java.String('dazejs')]);\n    return res;\n  }\n}\n```");

/***/ })

}]);