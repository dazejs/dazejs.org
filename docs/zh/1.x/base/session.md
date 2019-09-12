# Session

因为HTTP协议本身是无状态的，`session` 提供了一种保存用户请求信息的途径。

## 配置
`session` 的配置位于 `src/config/session.js`

- `store`: `session` 的存储介质，默认 `cookie`, 可选 `cookie`、`redis`
- `key`: 当 `store` 为 `cookie` 时，`session` 保存的 `key`
- `maxAge`: `session` 的最大过期时间，默认 `8640000`
- `httpOnly`: 是否 `httponly`，默认 `true`
- `signed`: 是否加签，默认 `true`
- `autoCommit`: 是否自动提交，默认 `true`
- `connection`: 当 `store` 为 `redis` 的时候，使用哪个连接配置(`src/config/database.js`)

## 操作 Session

获取 `Session` 变量
```js
request.session().get('key')
```

获取 `Session` 变量，不存在时返回默认值
```js
request.session().get('key', 'default')
```

存储 `Session` 变量
```js
request.session().set('key', 'value')
```

判断 `Session` 变量是否存在
```js
request.session().has('key')
```

删除一个 `Session` 变量
```js
request.session().remove('key')
```

删除所有 `Session` 变量
```js
request.session().flush()
```

## Session 闪存

`Session` 闪存功能可以将部分 `Session` 保存到下次请求为止

```js
request.session().flash('key', 'value')
```

## 使用 Redis

将配置文件的 `store` 设置为 `redis` 并且配置对应的 `connection` 即可
```js
module.exports = {
  // ...
  store: 'redis'
  // ...
  connection: 'session'
  //...
}
```
::: tip
`connection` 为 `src/config/database.js` 中的 `redis` 的属性
:::
