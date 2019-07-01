# CSRF 保护
跨站请求伪造（CSRF）是一种通过伪装授权用户的请求来攻击授信网站的恶意漏洞。

## CSRF 中间件
框架通过内置的中间件来保护应用免受跨站请求伪造攻击，框架会为需要保护的请求创建 CSRF 令牌，令牌用于验证授权用户和发起请求者是否是同一个人。

我们在需要验证 CSRF 令牌的模块或者全局引入内置 `csrf` 中间件即可对请求进行验证：

##### 模块引入
```js
const ExampleController = require('./example.controller')

class ExampleModule {
  middlewares = [
    'csrf'
  ];
}

module.exports = ExampleModule

```

##### 全局引入
编辑全局中间件配置文件(位于 `src/app/config/middleware.js` ):
```js
module.exports = [
  // ...
  'csrf'
]
```

## 令牌
我们在创建请求表单的时候，**强烈建议**引入 CSRF 令牌字段，我们可以通过 `token()` 模板函数创建表单隐藏字段:
```html
<form>
  {{ token() }}
  <input name="username" value="">
  <input name="password" value="">
</form>
```

`token()` 会自动创建一个 `name="_token"` 的隐藏字段，当引入了 csrf 中间件后，框架就会对所有非读操作进行 CSRF 令牌校验

## 排除 URL
csrf 中间件提供了 `except` 属性，用于排除不需要验证的 URL，中间件位于 `src/middleware/csrf.js`：
```js
const { Middlewares } = require('@dazejs/framework')

class CSRF extends Middlewares.VerifyCsrfToken {
  /**
   * The URIs that should be excluded from CSRF verification.
   *
   * @type {array}
   */
  get except() {
    return [
      '/api/*',
      '/alipay/*'
    ]
  }
}

module.exports = CSRF
```

## TOKEN 请求头

除了上面提到的 `_token` 字段，框架还支持请求头附带 `token` 令牌的校验：
- `CSRF-Token`
- `XSRF-Token`
- `X-CSRF-Token`
- `X-XSRF-Token`