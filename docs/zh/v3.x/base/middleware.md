# 中间件

中间件可以在请求到控制器之间的逻辑层，可以在控制器之前做一些逻辑处理。

---

<!-- ![](./assets/middleware-1.png) -->

## 定义

`Middleware` 是一种特殊的组件，通过使用 `@middleware` 装饰器来表示这是一个中间件类

`Middleware` 组件需要实现 `MiddlewareInterface` 接口

```ts
import { middleware, MiddlewareInterface, Request, Next }from '@dazejs/framework'

@middleware()
export class ExampleMiddleware implements MiddlewareInterface {
  resolve(request: Request, next: Next) {
    return next()
  }
}

```

> `next()` 的结果必须使用 `return` 返回， `next()` 总是返回一个包裹 `Response` 的 `Promise` 对象


例子：创建一个中间件，在参数 `version` 的值为 `v1` 的时候返回一个 `Does not support v1` 的响应信息

```ts
import { middleware, BaseMiddleware }from '@dazejs/framework'

@middleware()
export class ExampleMiddleware extends BaseMiddleware {
  resolve(request, next) {
    if (request.param('version') === 'v1') {
      return this.response().BadRequest('Does not support v1');
    }
    return next()
  }
}

```

> `BaseMiddleware` 基类提供了许多便捷方法

---


## 使用

框架提供了 `@useMiddleware(name)` 装饰器来使用中间件

### 在控制器中使用中间件

**对控制器类使用**

```ts {5}
import { controller, http, useMiddleware }from '@dazejs/framework'
import ExampleMiddleware from '../middlewares/example'

@controller('/books')
@useMiddleware(ExampleMiddleware)
export class BookController {
  // ...
}

```

> 中间件将会对该控制器的所有方法生效

**对控制器方法使用**

```ts {7}
import { controller, http, useMiddleware }from '@dazejs/framework'
import ExampleMiddleware from '../middlewares/example'

@controller('/books')
export class BookController {
  @http.get()
  @useMiddleware(ExampleMiddleware)
  index() {
    // ...
  }
}

```

> 中间件只会对该控制器的 `index` 方法生效

**使用别名进行加载**

使用 `@middleware(name: string)` 参数设置中间件别名

```ts
import { middleware, BaseMiddleware }from '@dazejs/framework'

@middleware('exampleMiddleware')
export class ExampleMiddleware {
  resolve(request, next) {
    return next()
  }
}

```

使用中间件

```ts {7}
import { controller, http, useMiddleware }from '@dazejs/framework'

@controller('/books')
export class BookController {
  @http.get()
  @useMiddleware('exampleMiddleware')
  index() {
    // ...
  }
}

```

---

## 前置执行

```ts
import { Middleware }from '@dazejs/framework'

export default class ExampleMiddleware extends Middleware {
  resolve(request, next) {
    // todo
    return next()
  }
}

```

---

## 后置执行

```ts
import { Middleware }from '@dazejs/framework'

export default class ExampleMiddleware extends Middleware {
  async resolve(request, next) {
    const response = await next()
    // todo
    return response
  }
}

```

> `next()` 函数总是返回 `Response` 对象，详见 `Response` 小节

