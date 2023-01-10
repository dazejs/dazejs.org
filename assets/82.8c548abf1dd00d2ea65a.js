(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[82],{

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 多进程\n\n框架使用 node 提供的 `cluster` 内置模块来创建多进程模型，这样可以避免单一进程挂了导致服务异常的情况。\n\n框架默认关闭多进程功能，使用单一进程运行，可以在配置文件中设置开启\n\n---\n\n## 开启多进程\n在 `src/app/config/app.js` 配置 `cluster.enable` 的值 为 `true` 即可开启多进程模型:\n\n```ts\n// app.js\nexport default {\n  // ...\n  cluster: true,\n  // ...\n}\n```\n\n---\n\n## 多进程模型\n\n多进程模型下，Master 进程会根据 `workers` 的大小 `fork` 对应数量的 Worker 进程，由 Woker 进程来处理用户的请求。当 Worker 进程异常时会通知 Master 进程 Fork 一个新的 Worker 进程，并让当前 Worker 不再接收用户的请求。如需自定义 Worker 进程数量，可以配置`workers`的值：\n\n```ts\n// app.js\nexport default {\n  // ...\n  workers: 4,\n  // ...\n}\n```\n\n> workers 的值为子进程的数量，默认为0（当前 cpu 的个数）\n\n<!-- \n## 进程间通信（IPC）\n\n在多进程模型下，可能需要在业务模块中发送消息给其他工作进程，框架提供了Messenger对象来实现该功能\n\n> 由于工作进程之间无法直接通信，框架会借助Master进程进行转发\n\nmessenger事件接收可以在框架的`src/config/messenger.js`中进行定义：\n\n```ts\n// src/config/messenger.js\nexport default messenger => {\n    // 监听 test 事件\n    // 广播后所有工作进程都会触发该事件\n    messenger.on('test', data => {\n        // data\n        console.log(data)\n    })\n}\n\n// PostController.js\nexport default class PostController {\n    index() {\n        // 使用daze全局对象\n        // 调用 broadcast 广播数据到所有工作进程\n        daze.messenger.broadcast('test', 'data')\n    }\n}\n```\n\n- `Messenger#broadcast` ：广播事件，所有工作进程（包括当前进程）都会接收到该事件\n\n   -->");

/***/ })

}]);