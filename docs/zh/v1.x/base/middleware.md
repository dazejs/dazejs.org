# 中间件

中间件可以在请求到控制器之间的逻辑层，可以在控制器之前做一些逻辑处理。

![](./assets/middleware-1.png)

## 定义

`Middleware` 是一种特殊的组件，通过继承 `Middleware` 基础类来表示这是一个中间件类

```ts
import { Middleware, Component }from '@dazejs/framework'

@Component('version-supported')
export default class ExampleMiddleware extends Middleware {
  resolve(request, next) {
    return next()
  }
}

```

::: warning
`next()` 的结果必须使用 `return` 返回, `next()` 总是返回一个 `Response` 对象
:::



例子：创建一个中间件，在参数 `version` 的值为 `v1` 的时候返回一个 `Does not support v1` 的响应信息

```ts
import { Middleware, Component }from '@dazejs/framework'

@Component('version-supported')
export default class ExampleMiddleware extends Middleware {
  resolve(request, next) {
    if (request.param('version') === 'v1') {
      return this.response().BadRequest('Does not support v1');
    }
    return next()
  }
}

```


## 使用

框架提供了 `@useMiddleware(name)` 装饰器来使用中间件

### 在控制器中使用中间件

- 对控制器类使用：

```ts {5}
import { Controller, Route, Http, useMiddleware }from '@dazejs/framework'

@Route('/books')
@useMiddleware('version-supported')
export default class BookController extends Controller {
  // ...
}

```

::: tip
`version-supported` 中间件将会对该控制器的所有方法生效
:::

- 对控制器方法使用：

```ts {7}
import { Controller, Route, Http, useMiddleware }from '@dazejs/framework'

@Route('/books')
export default class BookController extends Controller {
  @Http.Get()
  @useMiddleware('version-supported')
  index() {
    // ...
  }
}

```

::: tip
`version-supported` 中间件只会对该控制器的 `index` 方法生效
:::

## 前置

```ts
import { Middleware, Component }from '@dazejs/framework'

@Component('example')
export default class ExampleMiddleware extends Middleware {
  resolve(request, next) {
    // todo
    return next()
  }
}

```

## 后置

```ts
import { Middleware, Component }from '@dazejs/framework'

@Component('example')
export default class ExampleMiddleware extends Middleware {
  async resolve(request, next) {
    const response = await next()
    // todo
    return response
  }
}

```

::: tip
`next()` 函数总是返回 `Response` 对象，详见 [Response](/zh/document/base/response.html) 小节
:::

