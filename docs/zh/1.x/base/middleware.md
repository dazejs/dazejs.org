# 中间件

中间件可以在请求到控制器之间的逻辑层，可以在控制器之前做一些逻辑处理。

![](./assets/middleware-1.png)

## 定义

使用 `@Middleware(name)` 来定义一个中间件

```js
const { Middleware } = require('@dazejs/framework')

@Middleware('version-supported')
class ExampleMiddleware {
  resolve(request, next) {
    return next()
  }
}

module.exports = ExampleMiddleware
```

::: warning
`next()` 的结果必须使用 `return` 返回, `next()` 总是返回一个 `Response` 对象
:::



例子：创建一个中间件，在参数 `version` 的值为 `v1` 的时候返回一个 `Does not support v1` 的响应信息

```js
const { Middleware } = require('@dazejs/framework')

@Middleware('version-supported')
class ExampleMiddleware {
  resolve(request, next) {
    if (request.param('version') === 'v1') {
      return this.response().BadRequest('Does not support v1');
    }
    return next()
  }
}

module.exports = ExampleMiddleware
```


## 使用

框架提供了 `@useMiddleware(name)` 装饰器来使用中间件

### 在控制器中使用中间件

- 对控制器类使用：

```js {5}
const { Controller, Http, useMiddleware } = require('@dazejs/framework')

@Controller('/books')
@useMiddleware('version-supported')
class BookController {
  // ...
}

module.exports = BookController
```

::: tip
`version-supported` 中间件将会对该控制器的所有方法生效
:::

- 对控制器方法使用：

```js {7}
const { Controller, Http, useMiddleware } = require('@dazejs/framework')

@Controller('/books')
class BookController {
  @Http.Get()
  @useMiddleware('version-supported')
  index() {
    // ...
  }
}

module.exports = BookController
```

::: tip
`version-supported` 中间件只会对该控制器的 `index` 方法生效
:::

## 前置

```js
const { Middleware } = require('@dazejs/framework')

@Middleware('example')
class ExampleMiddleware {
  resolve(request, next) {
    // todo
    return next()
  }
}

module.exports = ExampleMiddleware
```

## 后置

```js
const { Middleware } = require('@dazejs/framework')

@Middleware('example')
class ExampleMiddleware {
  async resolve(request, next) {
    const response = await next()
    // todo
    return response
  }
}

module.exports = ExampleMiddleware
```

::: tip
`next()` 函数总是返回 `Response` 对象，详见 [Response](/zh/document/base/response.html) 小节
:::

