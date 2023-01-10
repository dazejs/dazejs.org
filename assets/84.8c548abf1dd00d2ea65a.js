(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[84],{

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# Redis\n\nRedis 是一个开源的、高级的键值对存储系统，经常被用作数据结构服务器，因为其支持字符串、Hash、列表、集合和有序集合等数据结构。\n\n## 配置\n\n应用的 `Redis` 配置位于配置文件 `config/redis.ts`：\n\n```ts\n\nexport default {\n    default: {\n        host: 'localhost',\n        port: 6379\n    }\n}\n\n```\n\n默认服务器配置可以满足开发需要, 如果你需要指定其他场景的配置，例如 `cahce`, `schedule` 等，你可以为它们指定特殊的连接或者自定义一个连接:\n\n```ts\n\nexport default {\n    default: {\n        host: 'localhost',\n        port: 6379\n    },\n    /**\n     * 缓存专用默认 reids 连接\n     * 未定义的情况下，默认使用 default 连接\n     */\n    cache: {\n        host: 'localhost',\n        port: 6379\n    },\n\n    /**\n     * 任务调度专用默认 reids 连接\n     * 未定义的情况下，默认使用 default 连接\n     */\n    schedule: {\n        host: 'localhost',\n        port: 6379\n    },\n    // 自己指定一个连接名称\n    myConnectionName: {\n        host: 'localhost',\n        port: 6379\n    },\n}\n\n```\n\n#### 配置集群\n\n```ts\n\nexport default {\n    default: {\n        cluster: true,\n        nodes: [\n            { host: 'localhost', port: 6377 },\n            { host: 'localhost', port: 6378 },\n            { host: 'localhost', port: 6379 },\n        ]\n    }\n}\n\n```\n\n## 与 Redis 交互\n\n使用便捷函数或者依赖注入来获取 redis 实例\n\n**便捷函数**\n\n```ts\nimport { redis } from '@dazejs/framework'\n\n\nredis() // 直接获取默认连接\nredis('myConnectionName') // 获取自定义连接\n```\n\n**依赖注入**\n\n```ts\nimport { Redis, Controller, Get, Autowired } from '@dazejs/framework'\n\n@Controller()\nexport class Example {\n\n    @Autowired\n    redis: Redis\n\n    @Get()\n    index() {\n        // 直接使用\n        this.redis.setex('example', true, 100)\n        // 使用自定义连接\n        this.redis.connection('myConnectionName').setex('example', true, 100)\n    }\n}\n\n```\n> 我们底层基于 [ioredis](https://github.com/luin/ioredis) 所以，我们可以通过连接调用 ioredis 的所有 api\n> 如果要使用 Redis 作为缓存驱动，可以参考[缓存文档](/docs/adv/cache), 如果要使用 Redis 作为任务调度驱动，可以参考[任务调度文档](/document/adv/schedule)。");

/***/ })

}]);