# 自动加载

`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载，我们可以通过继承不同类型的基类，来进行功能分类

---

## 模块分类
### 控制器类

继承 `Controller` 基础类

```ts
import { route, Controller } from '@daze/framework'

@route('/example')
export default class Example extends Controller {
  // ...
}

```

### 中间件类
继承 `Middleware` 基础类

```ts
import { Middleware } from '@daze/framework'

export default class Example extends Middleware {
  resolve(request, next) {
    // ...
    return next()
  }
}

```
> 中间件类必须实现 resolve 方法

### 服务类

继承 `Service` 基础类

```ts
import { Service } from '@daze/framework'

export default class Example extends Service {
  // ...
}
```

### 验证器类

继承 `Validator` 基础类

```ts
import { Validator } from '@daze/framework'

export default class Example extends Validator {
  resolve(data) {
    return data;
  }
}
```

### 资源类

继承 `Resource` 基础类

```ts
import { Resource } from '@daze/framework'

export default class Example extends Resource {
  // ...
}

```

### 通用类

```ts
export default class Example {
  // ...
}

```

---

## 忽略加载

有时候我们不希望自动加载机制加载某个模块，可以使用 `@Ignore()` 标识

```ts
import { ignore } from '@daze/framework'

@ignore()
export default class Example {
  // ...
}
```

---

## 模块重命名

框架提供了 `@component()` 装饰器来为模块进行重命名操作（实际上增加了绑定到容器的 `key`）。

```ts
import { Service, component } from '@daze/framework'

@component('exampleService')
export default class Example extends Service {
  // ...
}
```

自动识别变量名进行注入 (根据注入的变量名找到自定义的模块名称进行注入)

```ts {5}
import { route, http, Controller, inject } from '@dazejs/framework';
import ExampleService from '../service/example'

@route('/examples')
export default class Example extends Controller {
  @inject() exampleService: ExampleService;

  @http.get()
  index() {
    // this.exampleService.foo()
  }
}
```

> `@inject()` 的使用方法和依赖注入详见 [依赖注入](#/docs/core/di) 章节