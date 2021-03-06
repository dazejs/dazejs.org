# 加载机制

`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载，我们可以通过继承不同类型的基类，来进行功能分类

## 文件分类
### 控制器类

继承 `Controller` 基础类

```ts
import { Route, Controller } from '@daze/framework'

@Route('example')
export default class Example extends Controller {
  // ...
}

```

### 中间件类
继承 `Middleware` 基础类

```ts
import { Middleware, Component } from '@daze/framework'

@Component('example')
export default class Example extends Middleware {
  resolve(request, next) {
    // ...
    return next()
  }
}

```


### 服务类

继承 `Service` 基础类

```ts
import { Service, Component } from '@daze/framework'

@Component('example')
export default class Example extends Service {
  // ...
}

module.exports = Example;
```

### 验证器类

继承 `Validator` 基础类

```ts
import { Validator, Component } from '@daze/framework'

@Component('example')
export default class Example extends Validator {
  resolve(data) {
    return data;
  }
}
```

### 资源类

继承 `Resource` 基础类

```ts
import { Resource, Component } from '@daze/framework'

@Component('example')
export default class Example extends Resource {
  // ...
}

```

### 通用类

```ts
import { Component } from '@daze/framework'

@Component('example')
export default class Example {
  // ...
}

```

## 忽略加载

有时候我们不希望自动加载机制加载某个模块，可以使用 `@Ignore()` 标识

```ts
import { Component, Ignore } from '@daze/framework'

@Ignore()
@Component('example')
export default class Example {
  // ...
}
```