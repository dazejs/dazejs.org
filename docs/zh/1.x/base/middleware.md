# 中间件

## 注册中间件

框架提供了 `@useMiddleware` 装饰器来注册中间件

### 在控制器中注册中间件

对控制器类使用：

```js {5}
const { Controller, Http, useMiddleware } = require('@dazejs/framework')
const bookMiddleware = require('path/to/middleware')

@Controller('/books')
@useMiddleware(bookMiddleware)
class BookController {
  // ...
}

module.exports = BookController
```

::: tip
`bookMiddleware` 中间件将会对该控制器的所有方法生效
:::

对控制器方法使用：

```js {7}
const { Controller, Http, useMiddleware } = require('@dazejs/framework')
const bookMiddleware = require('path/to/middleware')

@Controller('/books')
class BookController {
  @Http.Get()
  @useMiddleware(bookMiddleware)
  index() {
    // ...
  }
}

module.exports = BookController
```

::: tip
`bookMiddleware` 中间件只会对该控制器的 `index` 方法生效
:::

## 定义中间件

我们创建一个中间件，在参数 `version` 的值为 `v1` 的时候返回一个 `Does not support v1` 的响应信息:

```js
const { Middleware } = require('@dazejs/framework')

@Middleware()
class ExampleMiddleware {
  resolve(request, next) {
    if (request.param('version') === 'v1') {
      return 'Does not support v1'
    }
    return next()
  }
}

module.exports = ExampleMiddleware
```

### 前置中间件

```js
const { Middleware } = require('@dazejs/framework')

@Middleware()
class ExampleMiddleware {
  resolve(request, next) {
    // todo
    return next()
  }
}

module.exports = ExampleMiddleware
```

### 后置中间件

```js
const { Middleware } = require('@dazejs/framework')

@Middleware()
class ExampleMiddleware {
  resolve(request, next) {
    const response = next()
    // todo
    return response
  }
}

module.exports = ExampleMiddleware
```

::: tip
`next()` 函数总是返回 `Response` 对象，详见 [Response](/zh/document/base/response.html) 小节
:::
·