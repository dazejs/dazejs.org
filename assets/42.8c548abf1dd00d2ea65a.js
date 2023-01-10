(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# Session\n\n因为HTTP协议本身是无状态的，`session` 提供了一种保存用户请求信息的途径。\n\n---\n\n## 配置\n`session` 的配置位于 `src/config/session.js`\n\n- `store`: `session` 的存储介质，默认 `cookie`, 可选 `cookie`、`redis`\n- `key`: 当 `store` 为 `cookie` 时，`session` 保存的 `key`\n- `maxAge`: `session` 的最大过期时间，默认 `8640000`\n- `httpOnly`: 是否 `httponly`，默认 `true`\n- `signed`: 是否加签，默认 `true`\n- `autoCommit`: 是否自动提交，默认 `true`\n- `connection`: 当 `store` 为 `redis` 的时候，使用哪个连接配置(`src/config/database.js`)\n\n---\n\n## 操作 Session\n\n获取 `Session` 变量\n```js\nrequest.session().get('key')\n```\n\n获取 `Session` 变量，不存在时返回默认值\n```js\nrequest.session().get('key', 'default')\n```\n\n存储 `Session` 变量\n```js\nrequest.session().set('key', 'value')\n```\n\n判断 `Session` 变量是否存在\n```js\nrequest.session().has('key')\n```\n\n删除一个 `Session` 变量\n```js\nrequest.session().remove('key')\n```\n\n删除所有 `Session` 变量\n```js\nrequest.session().flush()\n```\n\n## Session 闪存\n\n`Session` 闪存功能可以将部分 `Session` 保存到下次请求为止\n\n```js\nrequest.session().flash('key', 'value')\n```\n\n---\n\n## 使用 Redis\n\n将配置文件的 `store` 设置为 `redis` 并且配置对应的 `connection` 即可\n```ts\nexport default {\n  // ...\n  store: 'redis'\n  // ...\n  connection: 'session'\n  //...\n}\n```\n\n> `connection` 为 `src/config/database.js` 中的 `redis` 的属性\n");

/***/ })

}]);