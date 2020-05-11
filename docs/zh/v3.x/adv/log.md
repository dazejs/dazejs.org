# 日志

框架集成了 `winston` 日志模块，提供了各种功能强大的日志处理模块，你可以通过它们来定制自己的日志处理功能。

---

## 日志配置

日志配置文件位于 `src/config/logger.js`

```ts
export default {
  default: 'console',
  channels: {
    console: {
      driver: 'console',
    }
  }
}
```

- `default`: 默认通道，使用日志模块的时候，输出的日志默认会走该通道
- `channels`: 当前激活的通道，可以使用 `channel` 方法来切换的通道
- `levels`: 日志级别优先级， 默认 `{ error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }`
- `level`: 只有小于或者等于该级别的日志才会被输出，默认 `info`
- `format`: 日志格式化，默认输出`[timestap] [level] - message`, 配置属性可以参考 [winston formats](https://github.com/winstonjs/winston#formats)

> 每个通道必须配置一个 `driver` 参数，来表示该通道使用哪个驱动运行

---

## 日志驱动

所有驱动都可以配置：

- `level`: 输出级别，默认全局设置
- `format`: 日志格式化，默认全局设置

### `console`

将日志在控制台打印输出

- `stderrLevels`: 表示哪些 `levels` 使用 `stderr` 输出而不是 `stdout`, 默认 `[]`
- `eol`: 打印的结束行字符串，默认 `os.EOL`

### `file`

日志以文件的形式保存

- `eol`: 打印的结束行字符串，默认 `os.EOL`
- `filename`: 输出文件的文件名, 默认位于项目根目录下的 `logs` 文件夹 
- `maxsize`: 单个文件的最大大小，超过该大小会创建新的文件，文件名会加上文件数作为后缀
- `maxFiles`: 限制文件数量
- `tailable`: 当设置该属性为 `true` 时，根据 `maxsize` 和  `maxFiles` 参数升序滚动记录日志，数字越大文件越旧，只有设置了 `maxFiles` 参数后才有效果
- `maxRetries`: 失败重试次数，默认 `2`
- `zippedArchive`: 如果设置为 `true`, 保存的日志将被压缩
- `options`: 传递给 `fs.createWriteStream` 的参数，默认 `{flags: 'a'}`


### `stream`

以 `Stream` 的方式输出日志

- `eol`: 打印的结束行字符串，默认 `os.EOL`
- `stream`: 支持任何 `Node.js Stream`，当流是`对象模式`, 写入 `info` 对象，否则写入 `info[MESSAGE]`

<!-- ### `mongodb`

将日志写入 `Mongodb`

- `db`:
- `options`:
- `collection`: 
- `storeHost`:
- `username`:
- `password`:
- `label`:
- `name`:
- `capped`:
- `cappedSize`:
- `cappedMax`:
- `tryReconnect`:
- `expireAfterSeconds`: -->
