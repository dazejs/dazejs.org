(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 日志\n\n框架集成了 `winston` 日志模块，提供了各种功能强大的日志处理模块，你可以通过它们来定制自己的日志处理功能。\n\n## 日志配置\n\n日志配置文件位于 `src/config/logger.js`\n\n```ts\nexport default {\n  default: 'console',\n  channels: {\n    console: {\n      driver: 'console',\n    }\n  }\n}\n```\n\n- `default`: 默认通道，使用日志模块的时候，输出的日志默认会走该通道\n- `channels`: 当前激活的通道，可以使用 `channel` 方法来切换的通道\n- `levels`: 日志级别优先级， 默认 `{ error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }`\n- `level`: 只有小于或者等于该级别的日志才会被输出，默认 `info`\n- `format`: 日志格式化，默认输出`[timestap] [level] - message`, 配置属性可以参考 [winston formats](https://github.com/winstonjs/winston#formats)\n\n::: warning\n每个通道必须配置一个 `driver` 参数，来表示该通道使用哪个驱动运行\n:::\n\n## 日志驱动\n\n所有驱动都可以配置：\n\n- `level`: \b\b输出级别，默认全局设置\n- `format`: 日志格式化，默认全局设置\n\n### `console`\n\n将日志在控制台打印输出\n\n- `stderrLevels`: 表示哪些 `levels` 使用 `stderr` 输出而不是 `stdout`, 默认 `[]`\n- `eol`: 打印的结束行字符串，默认 `os.EOL`\n\n### `file`\n\n日志以文件的形式保存\n\n- `eol`: 打印的结束行字符串，默认 `os.EOL`\n- `filename`: 输出文件的文件名, 默认位于项目根目录下的 `logs` 文件夹 \n- `maxsize`: 单个文件的最大大小，超过该大小会创建新的文件，文件名会加上文件数作为后缀\n- `maxFiles`: 限制文件数量\n- `tailable`: 当设置该属性为 `true` 时，根据 `maxsize` 和  `maxFiles` 参数升序滚动记录日志，数字越大文件越旧，只有设置了 `maxFiles` 参数后才有效果\n- `maxRetries`: 失败重试次数，默认 `2`\n- `zippedArchive`: 如果设置为 `true`, 保存的日志将被压缩\n- `options`: 传递给 `fs.createWriteStream` 的参数，默认 `{flags: 'a'}`\n\n\n### `stream`\n\n以 `Stream` 的方式输出日志\n\n- `eol`: 打印的结束行字符串，默认 `os.EOL`\n- `stream`: 支持任何 `Node.js Stream`，当流是`对象模式`, 写入 `info` 对象，否则写入 `info[MESSAGE]`\n\n<!-- ### `mongodb`\n\n将日志写入 `Mongodb`\n\n- `db`:\n- `options`:\n- `collection`: \n- `storeHost`:\n- `username`:\n- `password`:\n- `label`:\n- `name`:\n- `capped`:\n- `cappedSize`:\n- `cappedMax`:\n- `tryReconnect`:\n- `expireAfterSeconds`: -->\n");

/***/ })

}]);